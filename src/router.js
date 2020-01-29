import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import Home from './views/Home'
import MiPerfil from './views/MiPerfil'

import Vacunas from './views/Vacunas'
import VerVacuna from './views/VerVacuna'
import FormularioVacuna from './views/FormularioVacuna'

import Trabajadores from './views/Trabajadores'
import VerTrabajador from './views/VerTrabajador'
import FormularioTrabajador from './views/FormularioTrabajador'

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
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: []
    }
  },
  {
    path: '/miPerfil',
    name: 'MiPerfil',
    component: MiPerfil,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: []
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
    path: '/trabajadores/ver/:idTrabajador',
    name: 'VerTrabajador',
    component: VerTrabajador,
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
    path: '/vacunas/registrar',
    name: 'RegistrarVacuna',
    component: FormularioVacuna,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Direccion"]
    }
  },
  {
    path: '/vacunas/ver/:idVacuna',
    name: 'VerVacuna',
    component: VerVacuna,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Direccion"]
    }
  },
  {
    path: '/vacunas/editar/:idVacuna',
    name: 'EditarVacuna',
    component: FormularioVacuna,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Direccion"]
    }
  },
  {
    path: '/vacunas',
    name: 'Vacunas',
    component: Vacunas,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Direccion"]
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