<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">
        <div class="w-100">
          <!-- Datos trabajador -->
          <b-button to="/vacunas" class="my-3 float-right" variant="primary">Volver</b-button>
          <h4 class="my-3 float-left">Ebola</h4>
        </div>
        <div class="w-100">
          <b-table-simple stacked class="rounded shadow">
            <b-tbody>
              <b-tr class="text-center">
                <b-td stacked-heading="Cantidad de veces a aplicar:">3 veces</b-td>
                <b-td stacked-heading="Periodicidad:">128 dias</b-td>
                <b-td stacked-heading="Entidad que presta el servicio:">SURA</b-td>
                <b-td class="p-3" stacked-heading="Descripción:">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit enim cumque fugiat, asperiores cum fuga saepe dicta quos repellat! Nam neque voluptatem delectus libero, amet pariatur vel saepe debitis laudantium!
                  Molestias harum incidunt laboriosam? Eligendi non facilis ipsam impedit voluptatibus aliquam dolores est veritatis maxime deserunt. Fuga hic harum magnam. Eveniet, rerum nam doloremque delectus soluta corrupti facilis commodi minima!
                  Ullam vero impedit, laboriosam blanditiis corrupti aut earum ratione, repudiandae excepturi nulla fugiat quisquam iste, quas ipsum! Dolorum illum laboriosam dolor iste minus? Rem unde quae corrupti enim nobis aliquid.
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
      </div>
    </Container>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "VerVacuna",
  components: {
    Header,
    Container,
    Footer
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      idVacuna: this.$route.params.idVacuna,
      vacuna: {}
    };
  },
  created() {
    this.obtenerDatosVacuna();
  },
  methods: {
    obtenerDatosVacuna() {}
  }
};
</script>
