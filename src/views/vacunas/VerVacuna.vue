<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">
        <div class="w-100">
          <!-- Datos trabajador -->
          <b-button to="/vacunas" class="my-3 float-right" variant="primary">Volver</b-button>
          <h4 class="my-3 float-left">{{this.vacuna.nombre}}</h4>
        </div>
        <div class="w-100">
          <b-table-simple stacked class="rounded shadow">
            <b-tbody>
              <b-tr class="text-center">
                <b-td stacked-heading="Cantidad de veces a aplicar:">{{this.vacuna.cantidadAplicar}}</b-td>
                <b-td stacked-heading="Periodicidad:">{{this.vacuna.periodicidad}}</b-td>
                <b-td stacked-heading="Entidad que presta el servicio:">{{this.vacuna.prestadorServicio}}</b-td>
                <b-td class="p-3" stacked-heading="Descripción:">{{this.vacuna.descripcion}}</b-td>
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
import axios from "axios";
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
    obtenerDatosVacuna() {
      axios({
        method: "GET",
        url: this.baseUrl + "/vacunas/" + this.idVacuna,
        withCredentials: true
      }).then(res => {
        this.vacuna = res.data.datos;
      }).catch((error) =>{
        // Ya no existe la sesión en el servidor
        if (error.response.status == 405) {
          localStorage.removeItem('usertoken')
          localStorage.removeItem("authenticated")
          localStorage.removeItem("areaTrabajo")
          localStorage.removeItem("id")
          this.$router.push("/")
        }  
      })
    }
  }
};
</script>
