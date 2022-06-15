<script setup lang="ts">

</script>

<template>
    <div id="chat">
        <div id="message-box" ref="message-box">
            <p v-for="message in messageList">{{ message.toString() }}</p>
        </div>
        <form id="chat-form" @submit.prevent="submit">
            <label for="chat-text" style="margin-right: .75em">$</label>
            <input id="chat-text" ref="chat-text" class="chat-input" spellcheck="false" v-model="text"
                   onblur="this.focus()"
                   autofocus>
        </form>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

class Message {
    public text: string;
    public sender: number;
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
        return (this.sender === 1 ? '> ' : '') + this.text;
    }
}

const messageStorage = {
    keepCount: 16,
    storage_key: 'i-am-lucien-aGRj',
    fetch: function () {
        const messageList: Array<Message> = JSON.parse(localStorage.getItem(this.storage_key) || "[]").map(Message.fromJSON);
        return messageList;
    },
    save(messageList: Array<Message>) {
        let rawKeepCount: number = messageList.length;
        let userCount: number = 0;
        for (let i = messageList.length - 1; i >= 0; i--) {
            let message: Message = messageList[i];
            if (message.sender === 1 && ++userCount === this.keepCount) {
                rawKeepCount = messageList.length - i;
                break;
            }
        }
        localStorage.setItem(this.storage_key, JSON.stringify(messageList.slice(-rawKeepCount)));
    }
};

export default defineComponent({
    name: "chat",
    data: function () {
        return {
            text: '' as string,
            messageList: new Array<Message>(),
            helloWorld: '如果一个机器人知我所知，想我所想，那他是否可以成为我。' as string,
            messageBox: document.createElement('div') as HTMLElement
        };
    },
    mounted: function () {
        this.messageBox = this.$refs["message-box"] as HTMLElement
        this.messageList = messageStorage.fetch();
        if (this.messageList.length === 0 || this.messageList[this.messageList.length - 1].text !== this.helloWorld) {
            this.appendMessage(this.helloWorld, 0);
        }
    },
    watch: {
        messageList: {
            handler: function (messageList: Array<Message>) {
                messageStorage.save(messageList);
                this.messageBox.scrollTop = this.messageBox.scrollHeight;
            },
            flush: 'post',
            deep: true
        }
    },
    methods: {
        submit: function (event: Event) {
            if (this.text !== '') {
                this.appendMessage(this.text, 1);
                this.text = '';
            }
            event.preventDefault();
        },

        appendMessage: function (text: string, sender: number) {
            this.messageList.push(new Message(text, sender));
        },
    }
})
</script>

<style scoped>
.chat-input {
    background-color: black;
    color: #DBDBDB;
    caret-color: #DBDBDB;
}

.chat-input > span {
    background-color: #DBDBDB;
    color: #000;
}

#message-box {
    height: 93.75px; /* 12.5px (font-size) x 1.5 (line-height) x 5 (line-number) */
    overflow: scroll;
    position: relative;
}

#message-box::-webkit-scrollbar {
    display: none;
}
</style>