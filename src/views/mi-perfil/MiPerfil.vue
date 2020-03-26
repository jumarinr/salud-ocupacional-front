<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">
        <div class="w-100">

          <!-- ========== TODO: Organizar la direccion del to del boton volver ========== -->
          <b-button to="/" class="my-3 float-right" variant="primary">
            Volver
          </b-button>
          <h4 class="my-3 float-left">{{this.trabajador.nombres}} {{this.trabajador.apellidos}}</h4>
        </div>
        <div class="w-100">
          <b-table-simple stacked class="rounded shadow">
            <b-tbody>
              <b-tr class="text-center">
                <b-td stacked-heading="Tipo de identificación:">{{this.trabajador.tipoIdentificacion}}</b-td>
                <b-td stacked-heading="Identificación:">{{this.trabajador.identificacion}}</b-td>
                <b-td stacked-heading="Correo:">{{this.trabajador.correo}}</b-td>
                <b-td stacked-heading="Fecha de nacimiento:">{{String(this.trabajador.fechaNacimiento).substring(0, 10)}}</b-td>
                <b-td stacked-heading="Dirección:">{{this.trabajador.direccion}}</b-td>
                <b-td stacked-heading="Teléfono:">{{this.trabajador.telefono}}</b-td>
                <b-td stacked-heading="Celular:">{{this.trabajador.celular}}</b-td>
                <b-td stacked-heading="Contacto de allegado:">{{this.trabajador.contactoAllegado}}</b-td>
                <b-td stacked-heading="Nivel de riesgo laboral:">{{this.trabajador.nivelRiesgoLaboral}}</b-td>
                <b-td stacked-heading="Área de trabajo:">{{this.trabajador.areaTrabajo}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <!-- Titulo de vacunas -->
          <h4 class="p-2">Vacunas</h4>
          
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
            ></b-table>
            
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
  name: "MiPerfil",
  components: {
    Header,
    Container,
    Footer
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      trabajador: JSON.parse(localStorage.getItem("usertoken")).datos,
       // ----- Datos de la tabla
      camposVacunas: [
        {key:"nombre", sortable: true}, 
        {key:"cantidadAplicada", sortable: false},
        {key:"proximaFechaDeAplicacion",sortable: false}
        ],
      vacunas: [

      ],
      // ----- Datos del paginacion
      perPage: 10,
      currentPage: 1
    };
  },
  created() {
    this.obtenerVacunas();
  },
  methods: {
    obtenerVacunas() {
      axios({
        method: "GET", 
        url: this.baseUrl + "/empleados/" + this.trabajador._id, 
        withCredentials: true
      }).then(res => {
        this.trabajador = res.data.datos;
        if (this.trabajador.celular == null) {
          this.trabajador.celular = "N/A";
        }
        var vacunas = [];
        this.trabajador.detallesVacunacion.forEach(function(detalleVacunacion) {
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
            nombre: detalleVacunacion.vacuna.nombre,
            cantidadAplicada: detalleVacunacion.aplicaciones.length +" de " + detalleVacunacion.vacuna.cantidadAplicar,
            proximaFechaDeAplicacion: detalleVacunacion.aplicaciones.length == detalleVacunacion.vacuna.cantidadAplicar ? '✔' : proximaFechaDeAplicacion, //TODO: conectar con lo que falta
            _rowVariant:detalleVacunacion.aplicaciones.length == 0 ? 'danger' : detalleVacunacion.aplicaciones.length == detalleVacunacion.vacuna.cantidadAplicar ? 'success' : ''
          });
        });
        this.vacunas = vacunas;
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
  },
  computed: {
      rows() {
        return this.vacunas.length
      }
  }
};
</script>