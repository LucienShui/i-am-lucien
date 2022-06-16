import {createApp} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import {createStore} from 'vuex'
import axios from 'axios'
import VueAxios from "vue-axios";
import {Config, key, State} from './store'
import App from './App.vue'
import Chat from './components/Chat.vue'
import DynamicPage from './components/DynamicPage.vue'
import NotFound from "./components/NotFound.vue";

axios.get('/page/config.json').then(response => {
    let config: Config = response.data;

    const store = createStore<State>({
        state: function () {
            return {
                config: config,
                cache: {}
            }
        },
        mutations: {
            put: function (state: State, payload) {
                let namespace: string = payload.namespace;
                let key: string = payload.key;
                let value: any = payload.value;
                if (!(namespace in store.state.cache)) {
                    store.state.cache[namespace] = {};
                }
                store.state.cache[namespace][key] = value;
            }
        }
    });

    let pattern = config.header.map(page => page.url.substring(1)).join('|');

    const routes = [
        {
            path: '/chat',
            name: 'Chat',
            component: Chat
        },
        {
            path: `/:page(${pattern === '' ? '|' : pattern})`,
            name: 'DynamicPage',
            component: DynamicPage
        },
        {
            path: '/:notFoundPath(.*)*',
            name: 'NotFound',
            component: NotFound
        }
    ]

    const router = createRouter({
        history: createWebHashHistory(),
        routes: routes
    });

    const app = createApp(App);

    app.use(router);
    app.use(store, key);
    app.use(VueAxios, axios);

    app.mount('#app');
})


