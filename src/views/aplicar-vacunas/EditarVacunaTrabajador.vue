<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">
        <div class="w-100">
          <!-- Datos trabajador -->
          <b-button :to='"/vacunas/aplicar/" + this.idTrabajador' class="my-3 float-right" variant="primary">Volver</b-button>
          <h5 class>{{this.trabajador.nombres}} {{this.trabajador.apellidos}}</h5>
          <h5 class>Identificacion: {{this.trabajador.identificacion}}</h5>
          <h5 class>Vacuna: {{this.nombreVacuna}}</h5>
        </div>
        <div class="w-100 mt-2">
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
      idTrabajador: this.$route.params.idTrabajador,
      idVacuna: this.$route.params.idVacuna,
      // ----- Datos de la tabla
      camposAplicaciones: [
        { key: "dosis", sortable: true },
        { key: "fechaDeAplicacion", sortable: false },
        { key: "editar", sortable: false },
        { key: "eliminar", sortable: false }
      ],
      trabajador: {},
      detalleVacunacionTrabajador: {},
      nombreVacuna: "",
      aplicaciones: [],
      // ----- Datos de la paginacion
      perPage: 10,
      currentPage: 1
    };
  },
  created() {
    this.obtenerDatosEmpleado();
  },
  computed: {
    rows() {
      return this.aplicaciones.length;
    }
  },
  methods: {
    obtenerDatosEmpleado() {
      axios({
        method: "GET", 
        url: this.baseUrl + "/empleados/" + this.idTrabajador, 
        withCredentials: true
      }).then(res => {
        this.trabajador = res.data.datos;

        this.detalleVacunacionTrabajador = this.trabajador.detallesVacunacion.filter(detalleVacunacion => {
          return detalleVacunacion.vacuna._id.toString() == this.idVacuna.toString()
        })[0]

        this.nombreVacuna = this.detalleVacunacionTrabajador.vacuna.nombre

        // Se llena el arreglo "aplicaciones"
        var dosis = 1
        this.detalleVacunacionTrabajador.aplicaciones.forEach(fechaDeAplicacion => {
          var fechaDeAplicacion = String(fechaDeAplicacion).split("T")[0].split("-")
          var fechaDeAplicacionFormateada = fechaDeAplicacion[2] + "/" + fechaDeAplicacion[1] + "/" + fechaDeAplicacion[0]
          var aplicacion = {"dosis": dosis, "fechaDeAplicacion": fechaDeAplicacionFormateada}
          this.aplicaciones.push(aplicacion)
          dosis += 1
        })
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
    },
    editarAplicacion(aplicacion) {
      
    },
    eliminarAplicacion(aplicacion) {
      this.$bvModal.msgBoxConfirm("¿Desea eliminar la aplicación " + aplicacion.item.dosis + " de la vacuna?", {
        size: "sm",
        buttonSize: "sm",
        okVariant: "danger",
        okTitle: "Eliminar",
        cancelTitle: "Cancelar",
        footerClass: "p-2",
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        if (value) {
          axios({
            method: "DELETE", 
            url: this.baseUrl + "/empleados/" + this.idTrabajador + "/vacunas/" + this.idVacuna, 
            withCredentials: true,
            data: {
              numAplicacion: aplicacion.item.dosis
            }
          }).then(res => {
            this.$bvModal.msgBoxOk(res.data.mensaje, {
              buttonSize: 'sm',
              okVariant: res.data.error == false ? "success" : "danger"
            }).then(value => {
              if (res.data.error == false) {
                // Refrescar la página para mostrar los cambios
                this.$router.go()
              }
            })
          }).catch(error => {
            // Ya no existe la sesión en el servidor
            if (error.response.status == 405) {
              localStorage.removeItem("usertoken");
              localStorage.removeItem("authenticated");
              localStorage.removeItem("areaTrabajo");
              localStorage.removeItem("id");
              this.$router.push("/");
            }
          })
        }
      })
    }
  }
};
</script>
