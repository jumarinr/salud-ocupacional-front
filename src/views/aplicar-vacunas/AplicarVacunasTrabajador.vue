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
                <button @click="setFechaUltimaAplicacion(''); $bvModal.show(data.item.id + 'aplicar')" class="btn btn-success" :disabled="data.item.cantidadAplicar == data.item.aplicacionesHechas">
                  <i class="fas fa-syringe"></i>
                </button>

                <b-modal :id="data.item.id + 'aplicar'" hide-footer>
                  <template v-slot:modal-title>Ingresar fecha de la última aplicación:</template>

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
                    @click="$bvModal.hide(data.item.id + 'aplicar')"
                  >Guardar</b-button>
                </b-modal>
              </template>

              <!-- Funcionalidad de ver vacuna -->
              <template v-slot:cell(ver)="data">
                <button 
                class="btn btn-primary" 
                v-on:click="verVacuna(data)">
                  <i class="fas fa-eye"></i>
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
        { key: "ver", sortable: false }
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
            var proximaFechaDeAplicacion = "--"

            if (detalleVacunacion.aplicaciones.length > 0) {
              var ultimaFechaDeAplicacion = String(detalleVacunacion.aplicaciones[detalleVacunacion.aplicaciones.length - 1].fecha).split("T")[0].split("-")
              proximaFechaDeAplicacion = new Date()
              proximaFechaDeAplicacion.setFullYear(ultimaFechaDeAplicacion[0])
              // En Date() los meses cuentan desde 0 hasta 11, siendo 0 el mes de enero
              proximaFechaDeAplicacion.setMonth(ultimaFechaDeAplicacion[1] - 1)
              proximaFechaDeAplicacion.setDate((parseInt(ultimaFechaDeAplicacion[2]) + parseInt(detalleVacunacion.vacuna.periodicidad)))
              proximaFechaDeAplicacion = proximaFechaDeAplicacion.getDate() + "/" + (proximaFechaDeAplicacion.getMonth() + 1) + "/" + proximaFechaDeAplicacion.getFullYear()
            }

            vacunas.push({
              id: detalleVacunacion.vacuna._id,
              nombre: detalleVacunacion.vacuna.nombre,
              cantidadAplicada:
                detalleVacunacion.aplicaciones.length +
                " de " +
                detalleVacunacion.vacuna.cantidadAplicar,
              proximaFechaDeAplicacion: proximaFechaDeAplicacion,
              fechaUltimaAplicacion: String(detalleVacunacion.aplicaciones[detalleVacunacion.aplicaciones.length - 1]).split("T")[0],
              aplicacionesHechas: detalleVacunacion.aplicaciones.length,
              cantidadAplicar: detalleVacunacion.vacuna.cantidadAplicar
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
    aplicarVacuna(vacuna) {
      axios({
        method: "POST",
        url: this.baseUrl + "/empleados/" + this.idTrabajador + "/vacunas/" + vacuna.item.id,
        withCredentials: true,
        data: {
          fechaAplicacion: this.fechaUltimaAplicacion
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
    },
    verVacuna(vacuna){
      this.$router.push("/vacunas/aplicar/" + this.idTrabajador + "/editar/" + vacuna.item.id);
    },
    setFechaUltimaAplicacion(fechaUltimaAplicacion) {
      this.fechaUltimaAplicacion = fechaUltimaAplicacion
    }
  }
};
</script>
