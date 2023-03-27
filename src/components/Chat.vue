<script setup lang="ts">

</script>

<template>
    <div id="chat">
        <div id="message-box" ref="message-box">
            <p v-for="message in messageList">{{ message.toString() }}</p>
        </div>
        <form id="chat-form" @submit.prevent="submit">
            <div id="text-box">
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
        return (this.sender === 1 ? '' : '> ') + this.text;
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
            websocket: null as WebSocket | null
        };
    },
    mounted: function () {
        this.config = useStore().state.config;
        this.messageBox = this.$refs["message-box"] as HTMLElement;

        this.history = this.config.chat.history;
        if (this.config.chat.api) {
            if (this.config.chat.greeting && this.history.length > 0) {
                this.updateMessage(this.history[this.history.length - 1][1], 0);
            }
            this.websocket = new WebSocket(this.config.chat.api);
            this.websocket.onmessage = this.onMessage;
        }
    },
    watch: {
        messageList: {
            handler: function (messageList: Array<Message>) {
                // this.messageBox.scrollTop = this.messageBox.scrollHeight;
            },
            flush: 'post',
            deep: true
        }
    },
    methods: {
        submit: function (event: Event) {
            if (this.text && this.lastMessage === null) { // 有输入且机器人不处于说话状态
                let text = this.text;
                if (this.websocket !== null) {
                    let body = {"query": text, "history": this.history}
                    this.websocket.send(JSON.stringify(body));
                }
                this.updateMessage(text, 1);
                this.text = '';
            }
            event.preventDefault();
        },

        onKeyDown: function (event: any) {
            if (event.ctrlKey == true) {
                this.text += '\n';
            } else {
                this.submit(event);
            }
        },

        clear: function () {
            this.history = this.config.chat.history;
            this.messageList = []
        },

        onMessage: function (event: any) {
            let body = JSON.parse(event.data);
            let status = body['status']
            if (status === 200) {  // 如果回答结束了
                this.lastMessage = null;
            } else {
                this.history = body['history']
                this.lastMessage = this.updateMessage(body['response'], 0, this.lastMessage);
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

#text-box {
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

</style>