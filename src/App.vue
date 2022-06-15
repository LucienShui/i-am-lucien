<script setup lang="ts">

</script>

<template>
    <div class="container">
        <header id="container-header" class="menu">
            <ul>
                <li v-for="page in config.header">
                    <router-link v-bind:to="page.url">{{ page.url }}</router-link>
                </li>
                <li><router-link to="/chat" v-show="config.chat.api !== ''">/chat</router-link></li>
            </ul>
        </header>
        <router-view id="container-view"></router-view>
        <footer id="container-footer">
            Powered by <a href="https://github.com/LucienShui" target="_blank">GitHub</a>
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

</style>
