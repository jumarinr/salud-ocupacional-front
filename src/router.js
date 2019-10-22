import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import FormularioTrabajador from './views/FormularioTrabajador'
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
    path: '/vacunas/registrar',
    name: 'RegistrarVacuna',
    component: RegistrarVacuna
  },
  {
    path: '/trabajadores/registrar',
    name: 'RegistrarTrabajador',
    component: FormularioTrabajador
  },
  {
    path: '/trabajadores/editar/:idTrabajador',
    name: 'EditarTrabajador',
    component: FormularioTrabajador
  },
  {
    path: '/trabajadores',
    name: 'Trabajadores',
    component: Trabajadores
  },
  {
    path: '/trabajadores/ver/:idTrabajador',
    name: 'VerTrabajador',
    component: VerTrabajador
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]
})
