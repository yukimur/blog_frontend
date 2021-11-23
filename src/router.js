
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Blog from './views/Blog'
import Essaye from './views/Essaye'
import Note from './views/Note'
import Fund from './views/Fund'
import Data from './views/Data'
import BlogDetail from './views/BlogDetail'

Vue.use(VueRouter);


export default new VueRouter({
    mode: 'history',
    // base: "http://127.0.0.1:8080",
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/blog',
            name: 'blog',
            component: Blog
        },
        {
            path: '/essaye',
            name: 'essaye',
            component: Essaye
        },
        {
            path: '/note',
            name: 'note',
            component: Note
        },
        {
            path: '/fund',
            name: 'fund',
            component: Fund
        },
        {
            path: '/data',
            name: 'data',
            component: Data
        },
        {
            path: '/blogdetail/:id',
            component: BlogDetail
        },
    ]
})