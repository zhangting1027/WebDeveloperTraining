import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home'
import Answer from '../views/answer'
import Score from '../views/score'
import Takephoto from '../views/takephoto'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/answer',
    name: 'answer',
    component: Answer,
  },
  {
    path: '/score/:score',
    name: 'score',
    component: Score,
  },
  {
    path: '/takephoto/:score',
    name: 'takephoto',
    component: Takephoto,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
