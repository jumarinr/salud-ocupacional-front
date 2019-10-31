<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="col p-3">
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

        <!-- Tabla de vacunas -->
        <b-table class="text-center border rounded shadow" :items="vacunas" :fields="camposVacunas"></b-table>
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
      camposVacunas: ["nombre", "cantidad_aplicada"],
      vacunas: []
    };
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
            cantidad_aplicada: detalleVacunacion.cantidadAplicada
          });
        });
        this.vacunas = vacunas;
      });
    }
  }
};
</script>
