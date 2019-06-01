import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Contact from '@/views/Contact'
import Intro from '@/views/Intro'
import Friends from '@/views/Friends'
import Blog from '@/views/Blog'
import PasteMe from '@/views/PasteMe'
import Guitar from '@/views/Guitar'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        },
        {
            path: '/blog',
            name: 'blog',
            component: Blog
        },
        {
            path: '/intro',
            name: 'intro',
            component: Intro
        },
        {
            path: '/friends',
            name: 'friends',
            component: Friends
        },
        {
            path: '/pasteme',
            name: 'pasteme',
            component: PasteMe
        },
        {
            path: '/guitar',
            name: 'guitar',
            component: Guitar
        }
    ]
})
