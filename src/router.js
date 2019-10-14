import Vue from 'vue'
import Router from 'vue-router'

import Vacunas from './views/Vacunas'
import Login from './views/Login'
import Trabajadores from './views/Trabajadores'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/vacunas',
    name: 'Vacunas',
    component: Vacunas
  },
  {
    path: '/trabajadores',
    name: 'Trabajadores',
    component: Trabajadores
  }
]
})
