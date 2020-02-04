import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import FormularioTrabajador from './views/FormularioTrabajador'
import RegistrarVacuna from './views/RegistrarVacuna'
import Trabajadores from './views/Trabajadores'
import VerTrabajador from './views/VerTrabajador'
import Home from './views/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("authenticated")) {
        next(Home)
      } else {
        next()
      }
    },
    meta: {
      requiresAuth: false,
      areasTrabajoRestringidas: []
    }
  },
  {
    path: '/vacunas/registrar',
    name: 'RegistrarVacuna',
    component: RegistrarVacuna,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal", "Empleado salud"]
    }
  },
  {
    path: '/trabajadores/registrar',
    name: 'RegistrarTrabajador',
    component: FormularioTrabajador,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal"]
    }
  },
  {
    path: '/trabajadores/editar/:idTrabajador',
    name: 'EditarTrabajador',
    component: FormularioTrabajador,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal"]
    }
  },
  {
    path: '/trabajadores',
    name: 'Trabajadores',
    component: Trabajadores,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal"]
    }
  },
  {
    path: '/trabajadores/ver/:idTrabajador',
    name: 'VerTrabajador',
    component: VerTrabajador,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal"]
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: []
    }
  },
  {
    path: "*",
    beforeEnter: (to, from, next) => {
      next(Home)
    }
  }
]
})

router.beforeEach((to, from, next) => {
  // ¿La página requiere autenticarse?
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // ¿El usuario está autenticado?
    if (localStorage.getItem("authenticated")) {
      // ¿El usuario está en la lista de restricción?
      if (to.matched.some(record => record.meta.areasTrabajoRestringidas.includes(localStorage.getItem("areaTrabajo")))) {
        next(Home)
      } else { // Puede entrar
        next()
      }
    } else { // Debe logearse
      next(Login)
    }
  } else { // Puede entrar
    next()
  }
})

export default router