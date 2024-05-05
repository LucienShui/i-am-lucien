<script setup lang="ts">

</script>

<template>
    <div class="container">
        <header id="container-header" class="menu">
            <ul>
                <li v-for="page in config.header">
                    <a
                        v-if="page.path.startsWith('redirect:')"
                        :href="page.path.replace('redirect:', '')"
                        target="_blank"
                    >{{ page.url }}</a>
                    <router-link v-else v-bind:to="page.url">{{ page.url }}</router-link>
                </li>
                <li v-show="config.chat.api_key !== ''">
                    <router-link to="/chat">/chat</router-link>
                </li>
            </ul>
        </header>
        <router-view id="container-view"></router-view>
        <footer id="container-footer">
            Powered by <a href="https://github.com/LucienShui/i-am-lucien" target="_blank">I am Lucien</a>
        </footer>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useStore, Config} from "./store";

export default defineComponent({
    name: 'App',
    data: function () {
        return {
            config: useStore().state.config as Config
        }
    }
})
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:400,700");

body {
    background-color: #000;
    margin: 0 auto;
    padding: 0;
    font-family: "Source Code Pro", monospace;
    font-size: 13px;
    color: #DBDBDB;
    text-align: left;
    line-height: 1.5 !important
}

h1, h2, h3, h4, h5, h6 {
    font-size: 13px;
    margin: 22px 0 0;
    font-weight: bold;
    color: #DBDBDB
}

p, ul, ol {
    margin: 0;
    color: #DBDBDB
}

a {
    text-decoration: underline;
    color: #DBDBDB
}

a:hover {
    color: #000;
    background-color: #DBDBDB
}

@media only screen and (max-device-width: 500px) {
    * {
        font-size: 12px !important
    }
}

.container {
    width: 90%;
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
}

p {
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap
}

footer {
    color: #DBDBDB;
    border-top: dashed 1px rgba(219, 219, 219, 0.9);
    margin: 20px auto 15px;
    padding-top: 10px;
    text-align: right
}

header {
    margin-top: 25px;
    margin-bottom: 10px
}

header p {
    text-align: left;
    margin: 0
}

footer {
    margin-bottom: 20px
}

::selection {
    background: rgba(219, 219, 219, 0.99);
    color: #000
}

::-moz-selection {
    background: rgba(219, 219, 219, 0.99);
    color: #000
}

:not(.menu) > ul {
    list-style: none;
    padding-left: 0
}

:not(.menu) > ul {
    list-style-type: none
}

:not(.menu) > ul > li:before {
    content: "-";
    margin-right: 9px
}

.menu {
    border-top: dashed 1px rgba(219, 219, 219, 0.9);
    border-bottom: dashed 1px rgba(219, 219, 219, 0.9);
    margin-bottom: 25px
}

.menu ul {
    margin-top: 12px;
    margin-bottom: 12px;
    padding-left: 0;
    list-style-type: none;
    text-align: right
}

.menu ul li {
    display: inline;
    margin-left: 10px
}

.menu ul li a {
    text-decoration: none;
    color: #DBDBDB
}

.menu ul li a:hover {
    text-decoration: none;
    color: #000;
    background-color: #DBDBDB
}

input, select, textarea {
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    border: none
}

input[type=text], input[type=email], input[type=url], select, textarea {
    width: 100%;
    resize: none;
    background-color: #000;
    color: #DBDBDB;
    caret-color: #DBDBDB;
    font-size: 13px;
    font-family: "Source Code Pro", monospace;
    line-height: 1.5
}

input, select, textarea, textarea::-webkit-input-placeholder {
    text-indent: 0
}

::placeholder {
    color: #DBDBDB;
    opacity: 1
}

:-ms-input-placeholder {
    color: #DBDBDB
}

::-ms-input-placeholder {
    color: #DBDBDB
}

input[type=submit] {
    font-size: 13px;
    font-family: "Source Code Pro", monospace;
    line-height: 1.5;
    cursor: pointer;
    color: #DBDBDB;
    background-color: #000
}

input[type=submit]:hover {
    color: #000;
    background-color: #DBDBDB
}

*:focus {
    outline: none
}

textarea {
    vertical-align: top
}

pre {
    background-color: #000;
    border: none;
    padding: 0;
    overflow: auto;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.7 !important
}
</style>
