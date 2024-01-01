<script setup lang="ts">

</script>

<template>
    <div id="chat">
        <div id="message-box" ref="message-box">
            <div v-for="(message, index) in messageList" class="chat-message">
                <hr class="message-line" v-if="message.sender === sender.user && index > 0">
                <p>{{ message.toString() }}</p>
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

    static fromJSON(json: Message): Message {
        return new Message(json.text, json.sender, json.createTime);
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
            history: [] as Array<Array<string>>,
            openai: null as OpenAI | null,
            sender: senderEnum
        };
    },
    mounted: function () {
        this.config = useStore().state.config;
        this.messageBox = this.$refs["message-box"] as HTMLElement;

        this.clear()

        if (this.config.chat.greeting && this.history.length > 0) {
            this.updateMessage(this.history[this.history.length - 1][1], 0);
        }
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
                this.history = this.history || [];
                let messages: Array<OpenAI.Chat.ChatCompletionMessageParam> = []
                for (let i = 0; i < this.history.length; i++) {
                    messages.push({role: 'user', content: this.history[i][0]})
                    messages.push({role: 'assistant', content: this.history[i][1]})
                }
                messages.push({role: 'user', content: this.text})

                this.history.push([this.text])
                this.updateMessage(this.text, this.sender.user);
                this.text = '';

                let body: OpenAI.Chat.ChatCompletionCreateParams = {model: this.config.chat.model, messages: messages, stream: true};
                let stream = await this.openai.chat.completions.create(body);
                let response = '';

                for await (let chunk of stream) {
                    let delta = chunk.choices[0]?.delta?.content || ''
                    response += delta;
                    this.lastMessage = this.updateMessage(response, this.sender.bot, this.lastMessage);
                }

                this.history[this.history.length - 1].push(response)
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
                this.history = this.config.chat.history.slice();
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
    font-size: 12.5px;
}

.chat-input > span {
    background-color: #DBDBDB;
    color: #000;
}

#message-box {
    /*height: 93.75px; !* 12.5px (font-size) x 1.5 (line-height) x 5 (line-number) *!*/
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

/*
.chat-message {
    margin-top: .5em;
    margin-bottom: .5em;
}
 */

.message-line {
    border-top: dashed 1px rgba(219, 219, 219, 0.9);
    border-bottom: none;
    color: #DBDBDB;
    /*width: 30%;*/
    /*margin-inline-start: 0;*/
}
</style>