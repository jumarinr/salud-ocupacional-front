<template>
  <header>
    <b-navbar toggleable="lg" class="fixed-top bg-white">
      <!-- LOGO + NOMBRE DE LA EMPRESA -->
      <b-navbar-brand to="/home">
        <img src="@/assets/logo.png" height="30" alt="Logo"/>
        Salud ocupacional
      </b-navbar-brand>

      <!-- BOTÓN PARA DESPLEGAR EL MENU -->
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- MENU -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav pills class="ml-auto">
          <!-- INICIO ITEMS DEL MENU -->
          <b-nav-item v-if="areaTrabajo() == 'Direccion' || areaTrabajo() == 'Empleado salud'"
            to="/trabajadores" exact exact-active-class="active">
            <i class="fas fa-users"></i>
            Ver trabajadores
          </b-nav-item>
          <b-nav-item v-if="areaTrabajo() == 'Direccion'"
            to="/vacunas/registrar" exact exact-active-class="active">
            <i class="fas fa-medkit"></i>
            Registrar vacunas
          </b-nav-item>
          <b-nav-item @click="logout" exact exact-active-class="active">
            <i class="fas fa-sign-out-alt"></i>
            Cerrar sesión
          </b-nav-item>
          <!-- FIN ITEMS DEL MENU -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Header',
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  methods: {
    logout () {
      axios({
        method: "DELETE",
        url: this.baseUrl + '/login', 
        withCredentials: true
      }).then(res => {
        if (!res.data.error){
          localStorage.removeItem('usertoken')
          localStorage.removeItem("authenticated")
          localStorage.removeItem("areaTrabajo")
          localStorage.removeItem("id")
          this.$router.push("/")
        }
      })
    },
    areaTrabajo () {
      return localStorage.getItem('areaTrabajo')
    }
  }
}
</script>
