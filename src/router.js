import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import RegistrarTrabajador from './views/RegistrarTrabajador'
import RegistrarVacuna from './views/RegistrarVacuna'

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
    path: '/registrarVacuna',
    name: 'RegistrarVacuna',
    component: RegistrarVacuna
  },
  {
    path: '/registrarTrabajador',
    name: 'RegistrarTrabajador',
    component: RegistrarTrabajador
  }
]
})
