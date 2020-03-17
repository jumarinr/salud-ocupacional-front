<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">
        <!-- START FILTROS DE FECHA -->
        <div class="w-100 d-flex">
          <div class="mr-3">
            <label for="fechaInicial" class="font-weight-bold">Fecha Inicial</label>
            <input id="fechaInicial" type="date" v-model="fechaInicial" class="form-control" required />
          </div>
          <div class="mr-3">
            <label for="fechaFinal" class="font-weight-bold">Fecha Final</label>
            <input id="fechaFinal" type="date" v-model="fechaFinal" class="form-control" required />
          </div>
            <div class="mt-4 pt-2">
            <b-button class="btn btn-info" v-on:click="generarInforme()">Generar Informe</b-button>
          </div>
        </div>
        <!-- END FILTROS DE FECHA -->

        <!-- START TABLA -->
        <div class="w-100 mt-5">
          <!-- Titulo de la tabla -->
          <h5>Costos de las vacunas</h5>
        <div class="overflow-auto">
          <b-table
            class="align-self-stretch shadow border text-center"
            id="vacunas-costos"
            :items="itemsVacunas"
            :fields="camposTabla"
            small
            >
          </b-table>
        </div>
        </div>
        <!-- END TABLA -->

        <!-- Costo total -->
        <div class="align-self-end">
          <h5 class="font-weight-bold">COSTO TOTAL: {{ costoTotal }}</h5>
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
  name: "VacunasCostos",
  components: {
    Header,
    Container,
    Footer
  },
  data() {
    return {
        fechaInicial: "",
        fechaFinal: "",
        costoTotal: "$213.213.423",

      // ----- Datos de la tabla
      camposTabla: [
        { key: "nombre", sortable: true },
        { key: "cantDeVecesAplicada", sortable: false },
        { key: "cantDeEmpleadosConVacunaAplicada", sortable: false },
        { key: "subtotal", sortable: false }
      ],
      itemsVacunas: [
        {
          nombre: "COVID-19",
          cantDeVecesAplicada: "93.000",
          cantDeEmpleadosConVacunaAplicada: "70.000",
          subtotal: 12234
        },
        {
          nombre: "COVID-19",
          cantDeVecesAplicada: "93.000",
          cantDeEmpleadosConVacunaAplicada: "70.000",
          subtotal: 12234
        },
        {
          nombre: "COVID-19",
          cantDeVecesAplicada: "93.000",
          cantDeEmpleadosConVacunaAplicada: "70.000",
          subtotal: 12234
        },
        {
          nombre: "COVID-19",
          cantDeVecesAplicada: "93.000",
          cantDeEmpleadosConVacunaAplicada: "70.000",
          subtotal: 12234
        },
        {
          nombre: "COVID-19",
          cantDeVecesAplicada: "93.000",
          cantDeEmpleadosConVacunaAplicada: "70.000",
          subtotal: 12234
        },
        {
          nombre: "COVID-19",
          cantDeVecesAplicada: "93.000",
          cantDeEmpleadosConVacunaAplicada: "70.000",
          subtotal: 12234
        },
        {
          nombre: "COVID-19",
          cantDeVecesAplicada: "93.000",
          cantDeEmpleadosConVacunaAplicada: "70.000",
          subtotal: 12234
        }
      ]
    };
  },
  methods: {
    generarInforme(){
        
    }
  }
};
</script>
