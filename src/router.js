import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/nucleo/Login'
import Home from './views/nucleo/Home'
import MiPerfil from './views/mi-perfil/MiPerfil'

import Vacunas from './views/vacunas/Vacunas'
import VerVacuna from './views/vacunas/VerVacuna'
import FormularioVacuna from './views/vacunas/FormularioVacuna'

import AplicarVacunas from './views/aplicar-vacunas/AplicarVacunas'
import AplicarVacunasTrabajador from './views/aplicar-vacunas/AplicarVacunasTrabajador'

import Trabajadores from './views/trabajadores/Trabajadores'
import VerTrabajador from './views/trabajadores/VerTrabajador'
import FormularioTrabajador from './views/trabajadores/FormularioTrabajador'

import VacunasTrabajadores from './views/informes/vacunas-trabajadores/VacunasTrabajadores'
import VacunasTrabajador from './views/informes/vacunas-trabajadores/VacunasTrabajador'
import VacunasTrabajadoresMatriz from './views/informes/vacunas-trabajadores-matriz/VacunasTrabajadoresMatriz'

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
      areasTrabajoRestringidas: ["Empleado normal", "Empleado salud"]
    }
  },
  {
    path: '/vacunas/ver/:idVacuna',
    name: 'VerVacuna',
    component: VerVacuna,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal", "Empleado salud"]
    }
  },
  {
    path: '/vacunas/editar/:idVacuna',
    name: 'EditarVacuna',
    component: FormularioVacuna,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal", "Empleado salud"]
    }
  },
  {
    path: '/vacunas',
    name: 'Vacunas',
    component: Vacunas,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal", "Empleado salud"]
    }
  },
  {
    path: '/vacunas/aplicar',
    name: 'AplicarVacunas',
    component: AplicarVacunas,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal"]
    }
  },
  {
    path: '/vacunas/aplicar/:idTrabajador',
    name: 'AplicarVacunasTrabajador',
    component: AplicarVacunasTrabajador,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal"]
    }
  },
  {
    path: '/informes/vacunas/trabajadores',
    name: 'VacunasTrabajadores',
    component: VacunasTrabajadores,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal", "Empleado salud"]
    }
  },
  {
    path: '/informes/vacunas/trabajador/:idTrabajador',
    name: 'VacunasTrabajador',
    component: VacunasTrabajador,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal", "Empleado salud"]
    }
  },
  {
    path: '/informes/vacunas/trabajadores/matriz',
    name: 'VacunasTrabajadoresMatriz',
    component: VacunasTrabajadoresMatriz,
    meta: {
      requiresAuth: true,
      areasTrabajoRestringidas: ["Empleado normal", "Empleado salud"]
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