<script setup lang="ts">

</script>

<template>
    <div v-html="html"></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useStore, Config} from "../store";

export default defineComponent({
    name: "DynamicPage",
    data: function () {
        return {
            store: useStore(),
            config: {} as Config,
            page: {} as { [key: string]: string },
            html: ''
        }
    },
    methods: {
        hasCache: function (namespace: string, key: string): boolean {
            return namespace in this.store.state.cache && key in this.store.state.cache[namespace];
        },
        loadPage: function (page: string, callback?: (html: string) => void) {
            if (!(page in this.page)) {
                return
            }
            let url = this.page[page];
            let namespace: string = 'page';
            if (this.hasCache(namespace, url)) {
                callback?.(this.store.state.cache[namespace][url]);
            } else {
                this.axios.get(url).then(response => response.data).then(html => {
                    this.store.commit({
                        type: 'put',
                        namespace: namespace,
                        key: url,
                        value: html
                    });
                    callback?.(html);
                }).catch(error => {
                    if (error.response.status === 404) {
                        callback?.(`请求的页面 ${url} 不存在`)
                    }
                })
            }
        },
        updatePageCallback: function (html: string) {
            if (this.html !== html) {
                this.html = html;
            }
        }
    },
    watch: {
        '$route.params.page': function () {
            this.loadPage(`/${this.$route.params.page}`, this.updatePageCallback);
        }
    },
    mounted: function () {
        this.config = this.store.state.config;
        for (let page of this.config.header) {
            if (!page.path.startsWith('redirect:')) {
                this.page[page.url] = page.path;
            }
        }
        this.loadPage(`/${this.$route.params.page}`, this.updatePageCallback);
        Array.from(Object.values(this.page)).forEach(each => this.loadPage(each))
    }
});
</script>

<style scoped>

</style>