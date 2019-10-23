<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="col p-3">
        <h4 class="p-2">Armando Paredes Rojas</h4>

        <b-table-simple stacked class="rounded shadow">
          <colgroup><col/><col/></colgroup>

          <b-thead>
            <b-tr>
              <b-th>Identificación:</b-th>
              <b-th>Dirección actual:</b-th>
              <b-th>Correo:</b-th>
              <b-th>Teléfono:</b-th>
              <b-th>Celular:</b-th>
              <b-th>Nivel de riesgo:</b-th>
              <b-th>Fecha de nacimiento:</b-th>
              <b-th>Número de emergencia:</b-th>
            </b-tr>
          </b-thead>

          <b-tbody>
            <b-tr class="text-center">
              <b-td stacked-heading="Identificación:">{{this.trabajador.identificacion}}</b-td>
              <b-td stacked-heading="Dirección actual:">{{this.trabajador.direccion}}</b-td>
              <b-td stacked-heading="Correo:">{{this.trabajador.correo}}</b-td>
              <b-td stacked-heading="Teléfono:">{{this.trabajador.telefono}}</b-td>
              <b-td stacked-heading="Celular:">{{this.trabajador.celular}}</b-td>
              <b-td stacked-heading="Nivel de riesgo:">//</b-td>
              <b-td stacked-heading="Fecha de nacimiento:">{{this.trabajador.fechaNacimiento}}</b-td>
              <b-td stacked-heading="Télefono de un familiar:">{{this.trabajador.contactoAllegado}}</b-td>
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
        idTrabajador: this.$route.params.idTrabajador,
        trabajador: {},
        camposVacunas: ['nombre', 'cantidad_aplicada', 'proxima_fecha_de_aplicacion'],
        vacunas: [
          { nombre: 'vacuna 1', cantidad_aplicada: '0 de 2', proxima_fecha_de_aplicacion: '24/12/2019'},
          { nombre: 'vacuna 2', cantidad_aplicada: '0 de 2', proxima_fecha_de_aplicacion: '24/12/2019'},
          { nombre: 'vacuna 3', cantidad_aplicada: '0 de 2', proxima_fecha_de_aplicacion: '24/12/2019'},
          { nombre: 'vacuna 1', cantidad_aplicada: '0 de 2', proxima_fecha_de_aplicacion: '24/12/2019'},
          { nombre: 'vacuna 2', cantidad_aplicada: '0 de 2', proxima_fecha_de_aplicacion: '24/12/2019'},
          { nombre: 'vacuna 3', cantidad_aplicada: '0 de 2', proxima_fecha_de_aplicacion: '24/12/2019'}
        ]
      }
    },
    created() {
          this.obtenerDatosEmpleado();
    }, 
    methods: {
      obtenerDatosEmpleado(){
        axios.get('http://localhost:4000/empleados/' + this.idTrabajador)
          .then(res => {
            this.trabajador = res.data;
            if (this.trabajador.celular == null) {
              this.trabajador.celular = 'NO';
            }
            console.log(this.trabajador)
          })
      }
    }
};
</script>
