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
          :items="trabajadores"
          :fields="campostrabajadores"
          :filter="filtroTrabajador"
          :filterIncludedFields="filterOn"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          sort-icon-center
        >
          <template v-slot:cell(vacunas)="data">
            <span v-html="data.value"></span>
          </template>
        </b-table>
        <!-- End Tabla -->

        <!-- Start Pagination -->
        <div>
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="mt-4">
            <template v-slot:first-text>
              <span class="text-success">Primero</span>
            </template>
            <template v-slot:prev-text>
              <span class="text-danger">Atras</span>
            </template>
            <template v-slot:next-text>
              <span class="text-warning">Siguiente</span>
            </template>
            <template v-slot:last-text>
              <span class="text-info">Ultimo</span>
            </template>
            <template v-slot:ellipsis-text>
              <b-spinner small type="grow"></b-spinner>
              <b-spinner small type="grow"></b-spinner>
              <b-spinner small type="grow"></b-spinner>
            </template>
            <template v-slot:page="{ page, active }">
              <b v-if="active">{{ page }}</b>
              <i v-else>{{ page }}</i>
            </template>
          </b-pagination>
        </div>
        <!-- End Pagination -->
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
        { key: "nombres", sortable: true },
        { key: "identificacion", sortable: true },
        { key: "vacunas", sortable: false }
      ],
      trabajadores: [],
      filterOn: ["nombres", "identificacion"],
      // ----- Datos del pagination
      rows: 1,
      perPage: 50,
      currentPage: 1,
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

          this.rows = Object.keys(this.trabajadores).length;
          for (let index = 0; index < this.rows; index++) {
            var id_emp = this.trabajadores[index]._id;
            this.trabajadores[index]["vacunas"] =
              '<a href="trabajador/' +
              id_emp +
              '" class="btn btn-info"> <i class="fas fa-eye"></i></a>';
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
    },
  }
};
</script>