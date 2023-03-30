<script setup lang="ts">

</script>

<template>
    <div class="container">
        <header id="container-header" class="menu">
            <ul>
                <li v-for="page in config.header">
                    <router-link v-bind:to="page.url">{{ page.url }}</router-link>
                </li>
                <li>
                    <router-link to="/chat" v-show="config.chat.api !== ''">/chat</router-link>
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
    font-size: 12.5px;
    color: #DBDBDB;
    text-align: left;
    line-height: 1.5 !important
}

h1, h2, h3, h4, h5, h6 {
    font-size: 12.5px;
    margin: 0px;
    margin-top: 22px;
    font-weight: bold;
    color: #DBDBDB
}

p, ul, ol {
    margin: 0px;
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

.primary-text {
    color: #a1fc8f
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
    padding-left: 0px;
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
    font-size: 12.5px;
    font-family: "Source Code Pro", monospace;
    line-height: 1.5
}

input, select, textarea, textarea::-webkit-input-placeholder {
    text-indent: 0px
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
    font-size: 12.5px;
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
    padding: 0px;
    overflow: auto;
    font-size: 12.5px;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.7 !important
}

.highlight .c {
    color: #999988;
    font-style: italic
}

.highlight .err {
    color: #a61717;
    background-color: #e3d2d2
}

.highlight .k {
    font-weight: bold
}

.highlight .o {
    font-weight: bold
}

.highlight .cm {
    color: #999988;
    font-style: italic
}

.highlight .cp {
    color: #999999;
    font-weight: bold
}

.highlight .c1 {
    color: #999988;
    font-style: italic
}

.highlight .cs {
    color: #999999;
    font-weight: bold;
    font-style: italic
}

.highlight .gd {
    color: #000000;
    background-color: #fdd
}

.highlight .gd .x {
    color: #000000;
    background-color: #faa
}

.highlight .ge {
    font-style: italic
}

.highlight .gr {
    color: #a00
}

.highlight .gh {
    color: #999
}

.highlight .gi {
    color: #000000;
    background-color: #dfd
}

.highlight .gi .x {
    color: #000000;
    background-color: #afa
}

.highlight .go {
    color: #888
}

.highlight .gp {
    color: #555
}

.highlight .gs {
    font-weight: bold
}

.highlight .gu {
    color: #aaa
}

.highlight .gt {
    color: #a00
}

.highlight .kc {
    font-weight: bold
}

.highlight .kd {
    font-weight: bold
}

.highlight .kp {
    font-weight: bold
}

.highlight .kr {
    font-weight: bold
}

.highlight .kt {
    color: #445588;
    font-weight: bold
}

.highlight .m {
    color: #099
}

.highlight .s {
    color: #d14
}

.highlight .na {
    color: teal
}

.highlight .nb {
    color: #0086B3
}

.highlight .nc {
    color: #445588;
    font-weight: bold
}

.highlight .no {
    color: teal
}

.highlight .ni {
    color: purple
}

.highlight .ne {
    color: #990000;
    font-weight: bold
}

.highlight .nf {
    color: #990000;
    font-weight: bold
}

.highlight .nn {
    color: #555
}

.highlight .nt {
    color: navy
}

.highlight .nv {
    color: teal
}

.highlight .ow {
    font-weight: bold
}

.highlight .w {
    color: #bbb
}

.highlight .mf {
    color: #099
}

.highlight .mh {
    color: #099
}

.highlight .mi {
    color: #099
}

.highlight .mo {
    color: #099
}

.highlight .sb {
    color: #d14
}

.highlight .sc {
    color: #d14
}

.highlight .sd {
    color: #d14
}

.highlight .s2 {
    color: #d14
}

.highlight .se {
    color: #d14
}

.highlight .sh {
    color: #d14
}

.highlight .si {
    color: #d14
}

.highlight .sx {
    color: #d14
}

.highlight .sr {
    color: #009926
}

.highlight .s1 {
    color: #d14
}

.highlight .ss {
    color: #990073
}

.highlight .bp {
    color: #999
}

.highlight .vc {
    color: teal
}

.highlight .vg {
    color: teal
}

.highlight .vi {
    color: teal
}

.highlight .il {
    color: #099
}
</style>
