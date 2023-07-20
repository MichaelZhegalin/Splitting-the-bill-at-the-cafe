import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage'
import BillMain from '@/pages/billsPage/BillMain'
import Persons from '@/pages/billsPage/Persons'
import Food from '@/pages/billsPage/Food'
import SplitCheck from '@/pages/billsPage/SplitCheck'

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/bill/:id',
    component: BillMain
  },
  {
    path: '/bill/:id/persons',
    component: Persons
  },
  {
    path: '/bill/:id/food',
    component: Food
  },
  {
    path: '/bill/:id/splitCheck',
    component: SplitCheck
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
