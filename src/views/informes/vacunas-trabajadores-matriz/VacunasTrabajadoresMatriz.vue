<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">
        <div class="my-3 align-self-end">
          <!-- Start Buscador de trabajador por nombre o identificacion -->
          <div class="d-inline-block">
            <input
              class="form-control"
              type="text"
              placeholder="Buscar Trabajador"
              aria-label="Buscar Trabajador"
              v-model="filtroTrabajador"
            />
          </div>
          <!-- End Buscador -->
        </div>

        <!-- Start Tabla donde se muestran los datos de los trabajadores -->
        <b-table
          class="align-self-stretch shadow border text-center"
          responsive
          :items="trabajadores"
          :fields="campostrabajadores"
          :filter="filtroTrabajador"
          :sort-by.sync="sortBy"
          sort-icon-center
        >
          <template v-slot:cell(vacunas)="data">
            <span v-html="data.value"></span>
          </template>
        </b-table>
        <!-- End Tabla -->
      </div>
    </Container>

    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "VacunasTrabajadores",
  components: {
    Header,
    Container,
    Footer
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      filtroTrabajador: "",
      // ----- Datos de la tabla
      campostrabajadores: [
        { key: "identificacion", sortable: true },
        { key: "nombres", sortable: true },
        { key: "vacuna1", sortable: false },
        { key: "vacuna2", sortable: false },
        { key: "vacuna3", sortable: false },
        { key: "vacuna4", sortable: false },
        { key: "vacuna5", sortable: false },
        { key: "vacuna6", sortable: false },
        { key: "vacuna7", sortable: false },
        { key: "vacuna8", sortable: false },
        { key: "vacuna9", sortable: false },
        { key: "vacuna10", sortable: false },
        { key: "vacuna11", sortable: false },
        { key: "vacuna12", sortable: false },
        { key: "vacuna13", sortable: false },
        { key: "vacuna14", sortable: false }
      ],
      trabajadores: [],
      filterOn: ["identificacion", "nombres"],
      sortBy: "nombres"
    };
  },
  created() {
    this.obtenertrabajadores();
  },
  methods: {
    obtenertrabajadores() {
      axios({
        method: "GET",
        url: this.baseUrl + "/empleados",
        withCredentials: true
      })
        .then(res => {
          this.trabajadores = res.data.datos;
          // Se filtran los directores y al usuario ya que no tiene sentido
          // que este puede eliminar a algún director, a sí mismo o a otro trabajador de salud (a excepción
          // de que el usuario sea un director).
          this.trabajadores = this.trabajadores.filter(trabajador => {
            return (
              (trabajador._id != localStorage.getItem("id") &&
                trabajador.areaTrabajo != "Direccion" &&
                trabajador.areaTrabajo == "Empleado salud" &&
                localStorage.getItem("areaTrabajo") == "Direccion") ||
              trabajador.areaTrabajo == "Empleado normal"
            );
          });

          /*
           *  Los diferentes colores que se pueden utilizar:
           *  primary
           *  secondary
           *  success
           *  warning
           *  danger
           *  info
           *  light
           *  dark
           *
           *  Los colores pueden ser aplicados a una celda con _cellVariants
           *
           *  En el siguiente for se pueden realizar los filtros necesarios para aplicar los colores en las celdas
           */
          for (let trabajador of this.trabajadores) {
            if (trabajador.identificacion == "666") {
              trabajador._cellVariants = {
                identificacion: "info",
                nombres: "warning"
              };
            } else if (trabajador.identificacion == "999") {
              trabajador._rowVariant = "danger";
            }
          }
        })
        .catch(error => {
          // Ya no existe la sesión en el servidor
          if (error.response.status == 405) {
            localStorage.removeItem("usertoken");
            localStorage.removeItem("authenticated");
            localStorage.removeItem("areaTrabajo");
            localStorage.removeItem("id");
            this.$router.push("/");
          }
        });
    }
  }
};
</script>