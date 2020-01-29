<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">
        <div class="w-100">
          <!-- Datos trabajador -->
          <b-button to="/vacunas/aplicar" class="my-3 float-right" variant="primary">Volver</b-button>

          <h5 class>{{this.trabajador.nombres}} {{this.trabajador.apellidos}}</h5>
          <h5 class>Identificacion: {{this.trabajador.identificacion}}</h5>
        </div>
        <div class="w-100">
          <!-- Titulo de vacunas -->
          <h5>Aplicación de vacunas</h5>

          <!-- Tabla vacunas trabajador -->
          <div class="overflow-auto">
            <b-table
              class="align-self-stretch shadow border text-center"
              id="my-table"
              :items="vacunas"
              :fields="camposVacunas"
              :per-page="perPage"
              :current-page="currentPage"
              small
            >
              <!-- Funcionalidad de aplicar vacuna -->
              <template v-slot:cell(aplicar)="data">
                <button @click="$bvModal.show('bv-modal-aplicar-vacuna')" class="btn btn-success">
                  <i class="fas fa-syringe"></i>
                </button>

                <b-modal id="bv-modal-aplicar-vacuna" hide-footer>
                  <template v-slot:modal-title>Ingresar fecha de la última aplicación</template>

                  <div class="d-block text-center">
                    <input
                      type="date"
                      v-model="fechaUltimaAplicacion"
                      class="form-control"
                      required
                    />
                  </div>

                  <b-button
                    class="mt-3 btn-success"
                    block
                    v-on:click="aplicarVacuna(data)"
                    @click="$bvModal.hide('bv-modal-aplicar-vacuna')"
                  >Guardar</b-button>
                </b-modal>
              </template>

              <!-- Funcionalidad de editar vacuna -->
              <template v-slot:cell(editar)="data">
                <button @click="$bvModal.show('bv-modal-editar-vacuna')" class="btn btn-info">
                  <i class="fas fa-edit"></i>
                </button>

                <b-modal id="bv-modal-editar-vacuna" hide-footer>
                  <template v-slot:modal-title>Editar fecha de la última aplicación</template>

                  <div class="d-block text-center">
                    <input
                      type="date"
                      v-model="fechaUltimaAplicacion"
                      class="form-control"
                      required
                    />
                  </div>

                  <b-button
                    class="mt-3 btn-info"
                    block
                    v-on:click="editarVacuna(data)"
                    @click="$bvModal.hide('bv-modal-editar-vacuna')"
                  >Editar</b-button>
                </b-modal>
              </template>

              <!-- Funcionalidad de eliminar vacuna -->
              <template v-slot:cell(eliminar)="data">
                <button v-on:click="eliminarVacuna(data)" class="btn btn-danger">
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
  name: "AplicarVacunasTrabajador",
  components: {
    Header,
    Container,
    Footer
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      idTrabajador: this.$route.params.idTrabajador,
      trabajador: {},

      fechaUltimaAplicacion: "",

      // ----- Datos de la tabla
      camposVacunas: [
        { key: "nombre", sortable: true },
        { key: "cantidadAplicada", sortable: false },
        { key: "proximaFechaDeAplicacion", sortable: false },
        { key: "aplicar", sortable: false },
        { key: "editar", sortable: false },
        { key: "eliminar", sortable: false }
      ],
      vacunas: [],
      // ----- Datos del paginacion
      perPage: 10,
      currentPage: 1
    };
  },
  computed: {
    rows() {
      return this.vacunas.length;
    }
  },
  created() {
    this.obtenerDatosEmpleado();
  },
  methods: {
    obtenerDatosEmpleado() {
      axios({
        method: "GET",
        url: this.baseUrl + "/empleados/" + this.idTrabajador,
        withCredentials: true
      })
        .then(res => {
          this.trabajador = res.data.datos;
          if (this.trabajador.celular == null) {
            this.trabajador.celular = "N/A";
          }
          var vacunas = [];
          this.trabajador.detallesVacunacion.forEach(function(
            detalleVacunacion
          ) {
            vacunas.push({
              nombre: detalleVacunacion.vacuna.nombre,
              cantidadAplicada:
                detalleVacunacion.cantidadAplicada +
                " de " +
                detalleVacunacion.vacuna.cantidadAplicar,
              proximaFechaDeAplicacion: 0 //TODO: conectar con lo que falta
            });
          });
          this.vacunas = vacunas;
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
    aplicarVacuna(vacuna) {},
    editarVacuna(vacuna) {},
    eliminarVacuna(vacuna) {
      this.$bvModal
        .msgBoxConfirm("Deseas eliminar la última fecha de aplicación?", {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Elíminar!",
          cancelTitle: "Cancelar!",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            // AQUI VA EL CODIGO PARA ELIMINAR LA ULTIMA FECHA DE APLICACION
          } else {
            console.log("Cancelado");
          }
        })
        .catch(err => {
          // An error occurred
        });
    }
  }
};
</script>
