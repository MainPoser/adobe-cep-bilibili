import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/home'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/materials',
        name: 'materials',
        component: () => import(/* webpackChunkName: "about" */ '../views/materials')
    },
    {
        path: '/memes',
        name: 'memes',
        component: () => import(/* webpackChunkName: "about" */ '../views/memes')
    },
    {
        path: '/musics',
        name: 'musics',
        component: () => import(/* webpackChunkName: "about" */ '../views/musics')
    },
    {
        path: '/texts',
        name: 'texts',
        component: () => import(/* webpackChunkName: "about" */ '../views/texts')
    },
    {
        path: '/stickers',
        name: 'stickers',
        component: () => import(/* webpackChunkName: "about" */ '../views/stickers')
    },
    {
        path: '/articles',
        name: 'articles',
        component: () => import(/* webpackChunkName: "about" */ '../views/articles')
    },
    {
        path: '/demos',
        name: 'demos',
        component: () => import(/* webpackChunkName: "about" */ '../views/demos')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
