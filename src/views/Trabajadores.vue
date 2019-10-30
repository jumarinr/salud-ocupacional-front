<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">

        <div class="w-100">
          <!-- Botón Registrar -->
          <b-button to="trabajadores/registrar" class="my-3 float-left" variant="primary">
            Registrar Trabajador
          </b-button>
          
          <!-- Buscador -->
          <div class="my-3 float-right">
            <input class="form-control" type="text" placeholder="Buscar" aria-label="Buscar" v-model="filtro"/>
          </div>
        </div>
        
        <!-- Tabla donde se muestran los datos de los empleados -->
        <b-table
          class="align-self-stretch shadow border text-center"
          :items="empleados"
          :fields="camposEmpleados"
          :filter="filtro"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          sort-icon-center
        >
        <template v-slot:cell(ver)="data">
              <span v-html="data.value"></span>
        </template>
         <template v-slot:cell(editar)="data">
              <span v-html="data.value"></span>
        </template>
        <template v-slot:cell(eliminar)="data">
              <span v-html="data.value"></span>
        </template>
        </b-table>

        <!-- Pagination -->
        <div>
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="mt-4">
            <template v-slot:first-text>
              <span class="text-success">Primero</span>
            </template>
            <template v-slot:prev-text>
              <span class="text-danger">Atras</span>
            </template>
            <template v-slot:next-text>
              <span class="text-warning">Siguiente</span>
            </template>
            <template v-slot:last-text>
              <span class="text-info">Ultimo</span>
            </template>
            <template v-slot:ellipsis-text>
              <b-spinner small type="grow"></b-spinner>
              <b-spinner small type="grow"></b-spinner>
              <b-spinner small type="grow"></b-spinner>
            </template>
            <template v-slot:page="{ page, active }">
              <b v-if="active">{{ page }}</b>
              <i v-else>{{ page }}</i>
            </template>
          </b-pagination>
        </div>
      </div>
    </Container>

    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Trabajadores",
  components: {
    Header,
    Container,
    Footer
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      filtro: '',
      // ----- Datos de la tabla
      camposEmpleados: [
        { key: "nombres", sortable: true },
        { key: "identificacion", sortable: false },
        { key: "ver", sortable: false },
        { key: "editar", sortable: false },
        { key: "eliminar", sortable: false }
      ],
      empleados: [

      ],
      // ----- Datos del pagination
      rows: 1,
      perPage: 50,
      currentPage: 1,

    };
  },
  created (){
    this.obtenerEmpleados();
  },
  methods: {
    obtenerEmpleados(){
      axios.get(this.baseUrl + '/empleados')
        .then(res => {
          this.empleados = res.data.datos
          console.log(this.empleados)
          console.log(Object.keys(this.empleados).length)
          this.rows = Object.keys(this.empleados).length
          for (let index = 0; index < Object.keys(this.empleados).length; index++) {    
            var id_emp = this.empleados[index]._id
            this.empleados[index]['ver'] =  '<a href= "trabajadores/ver/'+id_emp+'" class="btn btn-info"> <i class="fas fa-user"></i></a>'
            this.empleados[index]['editar'] =  '<a  href="" class="btn btn-success"><i class="fas fa-user-edit"></i></a>'
            this.empleados[index]['eliminar'] =  '<a  href="" class="btn btn-danger"><i class="fas fa-trash-alt"></i></a>'
          }
        })

        
    }


  }

  // <>
};
</script>
