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
              <b-td stacked-heading="Identificación:">123456789</b-td>
              <b-td stacked-heading="Dirección actual:">Carrera 67 #39d - 103</b-td>
              <b-td stacked-heading="Correo:">arojasp@gmail.com</b-td>
              <b-td stacked-heading="Teléfono:">444 44 44</b-td>
              <b-td stacked-heading="Celular:">300 000 0000</b-td>
              <b-td stacked-heading="Nivel de riesgo:">V</b-td>
              <b-td stacked-heading="Fecha de nacimiento:">05/02/2001</b-td>
              <b-td stacked-heading="Télefono de un familiar:">301 001 0101</b-td>
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
    }
};
</script>
