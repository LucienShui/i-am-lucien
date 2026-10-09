<script setup lang="ts">

</script>

<template>
    <div id="chat">
        <div id="message-box" ref="message-box">
            <div v-for="(message, index) in messageList">
                <hr class="message-line" v-if="message.sender === sender.user && index > 0">
                <p :class="{'user-message': message.sender === sender.user}">{{ message.toString() }}</p>
            </div>
        </div>
        <p v-if="status" id="model-status">&gt; {{ status }}</p>
        <form id="chat-form" @submit.prevent="submit">
            <div :class="messageList.length > 0 ? 'text-box' : ''">
                <textarea id="chat-text" ref="chat-text" class="chat-input" spellcheck="false"
                          v-model="text" onblur="this.focus()" autofocus @keydown.enter.prevent="onKeyDown"></textarea>
            </div>
            <div style="text-align: right">
                <a class="text-button" @click="clear">清空</a>
                <a class="text-button" :class="{ 'text-button-disabled': !ready || lastMessage !== null }" @click="submit">提交</a>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ChatMessage, Config, useStore} from "../store";

const senderEnum = {
    bot: 0 as number,
    user: 1 as number
}

const MODEL_F16 = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";
const MODEL_F32 = "Qwen2.5-0.5B-Instruct-q4f32_1-MLC";
const HUGGING_FACE = "https://huggingface.co/";
const HF_MIRROR = "https://hf-mirror.com/";

// Keep the engine out of Vue state. A reactive Proxy breaks the wasm Tokenizer check.
let engine: any = null;

class Message {
    public text: string;
    public sender: number; // 1 是用户，0 是机器人
    public createTime: number;

    constructor(text: string, sender: number, createTime: number = -1) {
        this.text = text;
        this.sender = sender;
        this.createTime = createTime === -1 ? Date.now() : createTime;
    }

    public toString() {
        return (this.sender === senderEnum.user ? '' : '> ') + this.text;
    }
}


export default defineComponent({
    name: "chat",
    data: function () {
        return {
            text: '' as string,
            messageList: new Array<Message>(),
            messageBox: document.createElement('div') as HTMLElement,
            lastMessage: null as Message | null,
            config: {} as Config,
            messages: [] as Array<ChatMessage>,
            ready: false,
            status: "正在准备本地模型",
            alive: true,
            sender: senderEnum
        };
    },
    mounted: function () {
        this.config = useStore().state.config;
        this.messageBox = this.$refs["message-box"] as HTMLElement;

        this.clear();
        this.loadModel();
    },
    beforeUnmount: function () {
        this.alive = false;
        const current = engine;
        engine = null;
        this.ready = false;
        if (current) {
            current.unload();
        }
    },
    watch: {
        messageList: {
            handler: function (messageList: Array<Message>) {
                this.messageBox.scrollTop = this.messageBox.scrollHeight;
            },
            flush: 'post',
            deep: true
        }
    },
    methods: {
        loadModel: async function () {
            if (!navigator.gpu) {
                this.status = "当前浏览器没有 WebGPU，本地模型跑不了";
                return;
            }
            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) {
                this.status = "没有可用的 GPU，本地模型跑不了";
                return;
            }
            const modelId = adapter.features.has("shader-f16") ? MODEL_F16 : MODEL_F32;
            const useMirror = await this.mirrorWorks(modelId);
            if (!this.alive) {
                return;
            }
            this.status = "正在加载 " + modelId;
            try {
                // Vite duplicates this package's wasm binding, so Tokenizer instanceof checks fail.
                // Load the published ESM graph without bundling it.
                const loadWebLlm = new Function(
                    "return import('https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.85/+esm')"
                ) as () => Promise<any>;
                const webllm = await loadWebLlm();
                const appConfig = {
                    ...webllm.prebuiltAppConfig,
                    model_list: webllm.prebuiltAppConfig.model_list.map((record: { model_id: string, model: string }) => {
                        if (record.model_id !== modelId || !useMirror) {
                            return record;
                        }
                        return {
                            ...record,
                            model: record.model.replace(HUGGING_FACE, HF_MIRROR),
                        };
                    }),
                };
                const created = await webllm.CreateMLCEngine(modelId, {
                    appConfig: appConfig,
                    initProgressCallback: (report: { text: string }) => {
                        if (this.alive) {
                            this.status = report.text;
                        }
                    },
                });
                if (!this.alive) {
                    await created.unload();
                    return;
                }
                engine = created;
                this.ready = true;
                this.status = "";
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                this.status = "模型加载失败：" + message;
            }
        },

        mirrorWorks: async function (modelId: string) {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 4000);
            try {
                const response = await fetch(
                    HF_MIRROR + "mlc-ai/" + modelId + "/resolve/main/mlc-chat-config.json",
                    {signal: controller.signal},
                );
                return response.ok;
            } catch {
                // The mirror 308s without a CORS header outside China. Use Hugging Face.
                return false;
            } finally {
                clearTimeout(timer);
            }
        },

        submit: async function (event: Event) {
            if (event && event.preventDefault) {
                event.preventDefault();
            }
            if (this.text && this.lastMessage === null && engine !== null) {
                this.messages = this.messages || [];
                this.messages.push({role: "user", content: this.text});

                this.updateMessage(this.text, this.sender.user);
                this.text = '';

                let response = '';
                try {
                    const completion = await engine.chat.completions.create({
                        messages: this.messages,
                        stream: false,
                        max_tokens: 256,
                    });
                    response = completion.choices[0]?.message?.content || "";
                    if (response) {
                        this.lastMessage = this.updateMessage(response, this.sender.bot);
                    }
                    if (response) {
                        this.messages.push({role: "assistant", content: response});
                    }
                } catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    this.lastMessage = this.updateMessage(message, this.sender.bot, this.lastMessage);
                }
                this.lastMessage = null;
            }
        },

        onKeyDown: function (event: any) {
            if (event.ctrlKey == true || event.shiftKey == true) {
                this.text += '\n';
            } else {
                this.submit(event);
            }
        },

        clear: function () {
            if (this.lastMessage === null) {
                this.messages = (this.config.chat.messages || []).slice();
                this.messageList = [];
            }
        },

        updateMessage: function (text: string, sender: number, message: Message | null = null): Message {
            if (message === null) {
                message = new Message(text, sender);
                this.messageList.push(message);
            } else {
                message.text = text;
            }
            return message;
        },
    }
})
</script>

<style scoped>
.chat-input {
    background-color: black;
    color: #DBDBDB;
    caret-color: #DBDBDB;
    font-family: "Source Code Pro", monospace;
    font-size: 13px;
}

.chat-input > span {
    background-color: #DBDBDB;
    color: #000;
}

#message-box {
    overflow: scroll;
    position: relative;
    max-height: 60vh;
}

#message-box::-webkit-scrollbar {
    display: none;
}

#chat-text::-webkit-scrollbar {
    display: none;
}

#chat-text {
    margin-top: 1.5em;
}

.text-box {
    color: #DBDBDB;
    border-top: dashed 1px rgba(219, 219, 219, 0.9);
    margin-top: 1em;
    /*margin: 20px auto 15px;*/
    /*padding-top: 10px;*/
    /*text-align: right*/
}

.text-button {
    margin-left: 1em;
}

.text-button:hover {
    cursor: pointer;
}

.text-button-disabled {
    opacity: 0.4;
    pointer-events: none;
}

#model-status {
    color: #A9A9A9;
}

.message-line {
    border-top: dashed 1px rgba(219, 219, 219, 0.9);
    border-bottom: none;
    color: #DBDBDB;
}

.user-message {
    color: #A9A9A9;
}
</style>