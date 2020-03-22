<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">
        <div class="w-100">
          <!-- Datos trabajador -->
          <!-- TODO: ESTABLECER RUTA PARA EL BOTÓN DE VOLVER -->
          <b-button @click="volver()" class="my-3 float-right" variant="primary">Volver</b-button>

          <h5 class>Nombres Apellidos</h5>
          <h5 class>Identificacion: No de identificación</h5>
          <!-- TODO: ESTABLECER NOMBRE DE LA VACUNA -->
          <h5 class>Vacuna: Nombre de la vacuna</h5>
        </div>
        <div class="w-100 mt-5">
          <!-- Titulo de la tabla -->
          <h5>Aplicaciones de la vacuna</h5>

          <!-- Tabla de aplicaciones de la vacuna -->
          <div class="overflow-auto">
            <b-table
              class="align-self-stretch shadow border text-center"
              id="my-table"
              :items="aplicaciones"
              :fields="camposAplicaciones"
              :per-page="perPage"
              :current-page="currentPage"
              small
            >

              <!-- Funcionalidad de editar la aplicación de la vacuna -->
              <template v-slot:cell(editar)="data">
                <button
                  @click="editarAplicacion(data); $bvModal.show(data.item.dosis + 'editar')"
                  class="btn btn-info"
                >
                  <i class="fas fa-edit"></i>
                </button>

                <b-modal :id="data.item.dosis + 'editar'" hide-footer>
                  <template v-slot:modal-title>Editar fecha de la aplicación:</template>

                  <div class="d-block text-center">
                    <input
                      type="date"
                      v-model="data.item.fechaDeAplicacion"
                      class="form-control"
                      required
                    />
                  </div>

                  <b-button
                    class="mt-3 btn-info"
                    block
                    v-on:click="editarAplicacion(data)"
                    @click="$bvModal.hide(data.item.dosis + 'editar')"
                  >Editar</b-button>
                </b-modal>
              </template>

              <!-- Funcionalidad de eliminar vacuna -->
              <template v-slot:cell(eliminar)="data">
                <button
                  v-on:click="eliminarAplicacion(data)"
                  class="btn btn-danger"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </template>
            </b-table>

            <!-- Paginacion -->
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
              align="right"
            ></b-pagination>
          </div>
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
  name: "EditarVacunaTrabajador",
  components: {
    Header,
    Container,
    Footer
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      idVacuna: this.$route.params.idVacuna,
      idTrabajador: this.$route.params.idTrabajador,
      // ----- Datos de la tabla
      camposAplicaciones: [
        { key: "dosis", sortable: true },
        { key: "fechaDeAplicacion", sortable: false },
        { key: "editar", sortable: false },
        { key: "eliminar", sortable: false }
      ],
      vacuna: {},
      aplicaciones: [
        {"dosis": "1", "fechaDeAplicacion": "12/12/2020"}, 
        {"dosis": "2", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "3", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "4", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "5", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "6", "fechaDeAplicacion": "12/12/2020"}, 
        {"dosis": "7", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "8", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "9", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "10", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "11", "fechaDeAplicacion": "12/12/2020"}, 
        {"dosis": "12", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "13", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "14", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "15", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "16", "fechaDeAplicacion": "12/12/2020"}, 
        {"dosis": "17", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "18", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "19", "fechaDeAplicacion": "12/12/2020"},
        {"dosis": "20", "fechaDeAplicacion": "12/12/2020"}
        ],
      // ----- Datos de la paginacion
      perPage: 10,
      currentPage: 1
    };
  },
  computed: {
    rows() {
      return this.aplicaciones.length;
    }
  },
  methods: {
    volver() {
      window.location.href="/vacunas/aplicar/"+this.idTrabajador
    },
    editarAplicacion(aplicacion) {
      
    },
    eliminarAplicacion(aplicacion) {
      
    }
  }
};
</script>
