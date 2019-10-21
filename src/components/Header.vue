<template>
  <header>
    <b-navbar toggleable="lg" sticky>
      <b-navbar-brand href="#">
        <img src="@/assets/logo.png" height="30" alt="Logo"/>
        Salud ocupacional
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav pills class="ml-auto">
          <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
          <b-nav-item to="/trabajadores" exact exact-active-class="active">
            <i class="fas fa-user-friends"></i>
            Registrar trabajadores
          </b-nav-item>
          <b-nav-item to="/vacunas" exact exact-active-class="active">
            <i class="fas fa-medkit"></i>
            Registrar vacunas
          </b-nav-item>
          <b-nav-item to="/logout" exact exact-active-class="active">
            <i class="fas fa-icon-exit"></i>
            Cerrar sesión
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  background-color: #fff;
}
</style>
