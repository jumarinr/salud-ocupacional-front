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
        <div class="w-100 mt-5" v-if="this.itemsVacunas && this.itemsVacunas.length>0">
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
        <div class="align-self-end" v-if="this.itemsVacunas && this.itemsVacunas.length>0">
          <h5 class="font-weight-bold">COSTO TOTAL: {{ costoTotal }}</h5>
        </div>

        <div class="alert alert-danger mt-4" role="alert" v-if="this.mensaje!==''">
          {{this.mensaje}}
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
      baseUrl: process.env.VUE_APP_BASE_URL,
        fechaInicial: "",
        fechaFinal: "",
        costoTotal: 0,
        mensaje: '',
      // ----- Datos de la tabla
      camposTabla: [
        { key: "nombre", sortable: true },
        { key: "cantDeVecesAplicada", sortable: false },
        { key: "cantDeEmpleadosConVacunaAplicada", sortable: false },
        { key: "subtotal", sortable: false }
      ],
      itemsVacunas: [
      ]
    };
  },
  methods: {
    generarInforme(){
      this.itemsVacunas = []
      axios({
        method: "POST",
        url: this.baseUrl + "/vacunas/informe",
        withCredentials: true,
        data: {
            fechaI: this.fechaInicial, 
            fechaF: this.fechaFinal
        }
      }).then(res => {
          this.mensaje = ''
          if(res.data.resultados && res.data.resultados.length == 0){
            this.mensaje = 'No se encontraron datos en rango de fecha introducida'
          }else{
            var suma = 0
            this.costoTotal = res.data.resultados.filter(function(x){return x.subtotal == null ? 0: x}).map(function(a){ suma = suma + a.subtotal})
            this.costoTotal = suma
            for (let vacunaInfo of res.data.resultados){
              this.itemsVacunas.push({
                nombre: vacunaInfo.nombre,
                cantDeVecesAplicada: vacunaInfo.cantidadVecesAplicada,
                cantDeEmpleadosConVacunaAplicada: vacunaInfo.cantidadEmpleadosVacunados,
                subtotal: vacunaInfo.subtotal
              })
            }
          }
      })

    }
  }
};
</script>
