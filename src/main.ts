import {createApp} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import App from './App.vue'
import Chat from './components/Chat.vue'
import Home from './components/Home.vue'

const routes = [
    {
        path: '/chat',
        component: Chat
    },
    {
        path: '/',
        component: Home
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

const app = createApp(App);

app.use(router);

app.mount('#app');
