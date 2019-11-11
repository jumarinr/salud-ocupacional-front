<template>
  <div>
    <!-- HEADER -->
    <Header />
    <div
      id="logo"
      class="align-self-center d-flex align-items-center justify-content-center rounded-circle bg-white shadow"
      >
      <!-- Logo de la empresa -->
      <b-media>
        <img src="@/assets/logo.png" alt="Logo de la empresa" width="140px" />
      </b-media>
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
  }
};
</script>

<style>
#logo {
  width: 190px;
  height: 190px;
}
</style>
