import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import RegistrarTrabajador from './views/RegistrarTrabajador'
import EditarTrabajador from './views/EditarTrabajador'
import RegistrarVacuna from './views/RegistrarVacuna'
import Trabajadores from './views/Trabajadores'
import VerTrabajador from './views/VerTrabajador'
import Home from './views/Home'

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
  },
  {
    path: '/trabajadores',
    name: 'Trabajadores',
    component: Trabajadores
  },
  {
    path: '/verTrabajador',
    name: 'VerTrabajador',
    component: VerTrabajador
  },
  {
    path: '/editarTrabajador',
    name: 'EditarTrabajador',
    component: EditarTrabajador
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]
})
