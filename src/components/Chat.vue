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
        <form id="chat-form" @submit.prevent="submit">
            <div :class="messageList.length > 0 ? 'text-box' : ''">
                <textarea id="chat-text" ref="chat-text" class="chat-input" spellcheck="false"
                          v-model="text" onblur="this.focus()" autofocus @keydown.enter.prevent="onKeyDown"></textarea>
            </div>
            <div style="text-align: right">
                <a class="text-button" @click="clear">清空</a>
                <a class="text-button" @click="submit">提交</a>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Config, useStore} from "../store";
import OpenAI from "openai";

const senderEnum = {
    bot: 0 as number,
    user: 1 as number
}

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
            messages: [] as Array<OpenAI.Chat.ChatCompletionMessageParam>,
            openai: null as OpenAI | null,
            sender: senderEnum
        };
    },
    mounted: function () {
        this.config = useStore().state.config;
        this.messageBox = this.$refs["message-box"] as HTMLElement;

        this.clear();

        this.openai = new OpenAI({
            apiKey: this.config.chat.api_key,
            baseURL: this.config.chat.base_url,
            dangerouslyAllowBrowser: true
        });
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
        submit: async function (event: Event) {
            if (this.text && this.lastMessage === null && this.openai !== null) { // 有输入且机器人不处于说话状态
                this.messages = this.messages || [];
                this.messages.push({role: "user", content: this.text});

                this.updateMessage(this.text, this.sender.user);
                this.text = '';

                let body: OpenAI.Chat.ChatCompletionCreateParams = {
                    model: this.config.chat.model,
                    messages: this.messages,
                    stream: true
                };
                let stream = await this.openai.chat.completions.create(body);
                let response = '';

                for await (let chunk of stream) {
                    let delta = chunk.choices[0]?.delta?.content || '';
                    response += delta;
                    this.lastMessage = this.updateMessage(response, this.sender.bot, this.lastMessage);
                }

                this.messages.push({role: "assistant", content: response});
                this.lastMessage = null;
            }
            event.preventDefault();
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
                this.messages = this.config.chat.messages.slice();
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

.message-line {
    border-top: dashed 1px rgba(219, 219, 219, 0.9);
    border-bottom: none;
    color: #DBDBDB;
}

.user-message {
    color: #A9A9A9;
}
</style>