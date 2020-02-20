<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">

        <div class="w-100">
          <!-- Botón Registrar -->
          <b-button to="vacunas/registrar" class="my-3 float-left" variant="primary">
            Registrar vacuna
          </b-button>

          <!-- Buscador -->
          <div class="my-3 float-right">
            <input class="form-control" type="text" placeholder="Buscar" aria-label="Buscar" v-model="filtro"/>
          </div>
        </div>

        <!-- Tabla donde se muestran los datos de los empleados -->
        <b-table
          class="align-self-stretch shadow border text-center"
          :items="vacunas"
          :fields="camposVacunas"
          :filter="filtro"
          :filter-function="filterTable"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          sort-icon-center
        >
        <template v-slot:cell(ver)="data">
              <span v-html="data.value"></span>
        </template>
         <template v-slot:cell(editar)="data">
              <span v-html="data.value"></span>
        </template>
        <template v-slot:cell(eliminar)="data">
          <button v-on:click="eliminarVacuna(data.value)" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
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

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Container from '@/components/Container.vue';
import axios from 'axios';

export default {
  name: "Vacunas",
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
      camposVacunas: [
        { key: "nombre", sortable: true },
        { key: "ver", sortable: false },
        { key: "editar", sortable: false },
        { key: "eliminar", sortable: false }
      ],
      vacunas: [

      ],
      // ----- Datos del pagination
      rows: 1,
      perPage: 20,
      currentPage: 1,
      sortBy: "nombre"
    };
  },
  created (){
    this.obtenerVacunas();
  },
  methods: {
    obtenerVacunas(){

      axios({
        method: "GET",
        url: this.baseUrl + '/vacunas',
        withCredentials: true
      })
      .then(res => {
        this.vacunas = res.data.datos;

        this.rows=Object.keys(this.vacunas).length;
        for (
          let index = 0;
          index < this.rows;
          index++
        ) {
          var id_vac = this.vacunas[index]._id;
          this.vacunas[index]["ver"] =
            '<a href="vacunas/ver/' + id_vac + 
            '" class="btn btn-info"> <i class="fas fa-user"></i></a>';
          this.vacunas[index]["editar"] = 
            '<a  href="vacunas/editar/' +
            id_vac +
            '" class="btn btn-success"><i class="fas fa-user-edit"></i></a>';
          this.vacunas[index]["eliminar"] = id_vac;
        }
      }).catch((error) =>{
          // Ya no existe la sesión en el servidor
          if (error.response.status == 405) {
            localStorage.removeItem('usertoken')
            localStorage.removeItem("authenticated")
            localStorage.removeItem("areaTrabajo")
            localStorage.removeItem("id")
            this.$router.push("/")
          }
        });
    },
    eliminarVacuna(id) {
      this.$bvModal
        .msgBoxConfirm("Deseas eliminar esta vacuna?", {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Elíminar!",
          cancelTitle: "Cancelar!",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {



            // TODO: AQUI VA EL CODIGO PARA ELIMINAR LA VACUNA TANTO EN EL FRONT COMO EN EL BACK



          } else {
            console.log("Cancelado");
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    filterTable(row, filtro) {
      if(row.nombre.toLowerCase().includes(filtro.toLowerCase())){
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
