import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import(/* webpackChunkName: "about" */ '../views/articles')
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
    path: '/stickers',
    name: 'stickers',
    component: () => import(/* webpackChunkName: "about" */ '../views/stickers')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
