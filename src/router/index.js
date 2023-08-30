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
    path: '/bill/:billId',
    component: BillMain
  },
  {
    path: '/bill/:billId/persons',
    component: Persons
  },
  {
    path: '/bill/:billId/food',
    component: Food
  },
  {
    path: '/bill/:billId/splitCheck',
    component: SplitCheck
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
