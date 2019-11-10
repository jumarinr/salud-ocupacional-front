<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">
        <div class="w-100">
          <!-- Datos trabajador -->
          <h4 class="p-2">{{this.trabajador.nombres}} {{this.trabajador.apellidos}}</h4>
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
  name: "VerTrabajador",
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
       // ----- Datos de la tabla
      camposVacunas: [
        {key:"nombre", sortable: true}, 
        {key:"cantidadAplicada", sortable: false}
        ],
      vacunas: [

      ],
      // ----- Datos del paginacion
      perPage: 10,
      currentPage: 1
    }
  },
  computed: {
      rows() {
        return this.vacunas.length
      }
  },
  created() {
    this.obtenerDatosEmpleado();
  },
  methods: {
    obtenerDatosEmpleado() {
      axios.get(this.baseUrl + "/empleados/" + this.idTrabajador).then(res => {
        this.trabajador = res.data.datos;
        if (this.trabajador.celular == null) {
          this.trabajador.celular = "N/A";
        }
        var vacunas = [];
        this.trabajador.detallesVacunacion.forEach(function(detalleVacunacion) {
          vacunas.push({
            nombre: detalleVacunacion.vacuna.nombre,
            cantidadAplicada: detalleVacunacion.cantidadAplicada
          });
        });
        this.vacunas = vacunas;
      });
    }
  }
};
</script>
