<template>
  <div>
    <!-- HEADER -->
    <Header />

    <div class="align-self-center d-flex align-items-center flex-column">
      <div
        id="logo"
        class="d-flex align-items-center justify-content-center rounded-circle bg-white shadow"
      >
        <!-- Logo de la empresa -->
        <b-media>
          <img src="@/assets/logo.png" alt="Logo de la empresa" width="140px" />
        </b-media>
      </div>

      <h5 class="mt-2 text-white">{{usuario.nombres}} {{usuario.apellidos}}</h5> 
      <h6 class="d-inline text-white">Rol: {{usuario.areaTrabajo}}</h6>
    </div>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer
  },
  data(){
    return{
      usuario: JSON.parse(localStorage.getItem("usertoken")).datos
    }
  }
};
</script>

<style>
#logo {
  width: 190px;
  height: 190px;
}
</style>
