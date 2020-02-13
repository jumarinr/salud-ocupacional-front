<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">
        <div class="my-3 align-self-end">
          <!-- Buscador de trabajador por nombre o identificacion -->
          <div class="d-inline-block">
            <input
              class="form-control"
              type="text"
              placeholder="Buscar Trabajador"
              aria-label="Buscar Trabajador"
              v-model="filtroTrabajador"
            />
          </div>

          <!-- Buscador de trabajador por estado -->
          <div class="d-inline-block">
            <button class="btn btn-outline-primary mx-2" v-on:click="filtrarTrabajadores('AL DIA')">
              <i class="fas fa-user-check mr-2"></i>
              <span>Al Día</span>
            </button>

            <button class="btn btn-outline-primary" v-on:click="filtrarTrabajadores('ATRASADOS')">
              <i class="fas fa-user-alt-slash mr-2"></i>
              <span>Atrasados</span>
            </button>
          </div>
        </div>

        <!-- Tabla donde se muestran los datos de los trabajadores -->
        <b-table
          class="align-self-stretch shadow border text-center"
          :items="trabajadores"
          :fields="campostrabajadores"
          :filter="filtroTrabajador"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          sort-icon-center
        >
          <template v-slot:cell(vacunas)="data">
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
  name: "AplicarVacunas",
  components: {
    Header,
    Container,
    Footer
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      filtroTrabajador: "",
      // ----- Datos de la tabla
      campostrabajadores: [
        { key: "nombres", sortable: true },
        { key: "identificacion", sortable: true },
        { key: "vacunas", sortable: false }
      ],
      trabajadores: [],
      // ----- Datos del pagination
      rows: 1,
      perPage: 50,
      currentPage: 1,
      sortBy: "nombres"
    };
  },
  created() {
    this.obtenertrabajadores();
    this.filtarCompletos();
  },
  methods: {
    obtenertrabajadores() {
      axios({
        method: "GET",
        url: this.baseUrl + "/empleados",
        withCredentials: true
      })
        .then(res => {
          this.trabajadores = res.data.datos;
          // Se filtran los directores y al usuario ya que no tiene sentido
          // que este puede eliminar a algún director, a sí mismo o a otro trabajador de salud (a excepción
          // de que el usuario sea un director).
          this.trabajadores = this.trabajadores.filter(trabajador => {
            return (
              (trabajador._id != localStorage.getItem("id") &&
                trabajador.areaTrabajo != "Direccion" &&
                trabajador.areaTrabajo == "Empleado salud" &&
                localStorage.getItem("areaTrabajo") == "Direccion") ||
              trabajador.areaTrabajo == "Empleado normal"
            );
          });

          this.rows = Object.keys(this.trabajadores).length;
          var hoy = new Date()
          for (let index = 0; index < this.rows; index++) {
            var id_emp = this.trabajadores[index]._id;
            this.trabajadores[index]["vacunas"] =
              '<a href="aplicar/' +
              id_emp +
              '" class="btn btn-info"> <i class="fas fa-eye"></i></a>';
          var cantAtrasadas = 0
          var vacunaCompleta = 0
                if(this.trabajadores[index].detallesVacunacion.length > 0){
                  for (let indexDetalles = 0; indexDetalles < this.trabajadores[index].detallesVacunacion.length; indexDetalles++){ 
                      if(this.trabajadores[index].detallesVacunacion[indexDetalles].aplicaciones.length > 0){
                        if(this.trabajadores[index].detallesVacunacion[indexDetalles].aplicaciones.length == this.trabajadores[index].detallesVacunacion[indexDetalles].vacuna.cantidadAplicar){
                          this.trabajadores[index].detallesVacunacion[indexDetalles]["estado"] = "Vacuna completa"
                          vacunaCompleta ++
                        }else{
                          var ultimaAplicacion = new Date(Date.parse(this.trabajadores[index].detallesVacunacion[indexDetalles].aplicaciones[this.trabajadores[index].detallesVacunacion[indexDetalles].aplicaciones.length - 1]))
                          if(Math.floor((hoy.getTime() - ultimaAplicacion.getTime())/(1000*60*60*24)) > this.trabajadores[index].detallesVacunacion[indexDetalles].vacuna.periodicidad){
                            this.trabajadores[index].detallesVacunacion[indexDetalles]["estado"] = "Atrasado"
                            cantAtrasadas ++
                          }else{
                            this.trabajadores[index].detallesVacunacion[indexDetalles]["estado"] = "Al dia"
                          }
                        }
                      }
                  }

                  if(vacunaCompleta == this.trabajadores[index].detallesVacunacion.length){
                    this.trabajadores[index]["estadoGeneral"] = "completoTodo"
                  }
                }else{
                  cantAtrasadas ++
                }


                if(cantAtrasadas > 0){
                  this.trabajadores[index]["estadoGeneral"] = "atrasado"
                }else{
                  this.trabajadores[index]["estadoGeneral"] = "al dia"
                }
                
                 
                
                
          }
           console.log(this.trabajadores);
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
    filtrarTrabajadores(filtro) {
      if (filtro == "AL DIA") {
        this.filtroTrabajador = 'al dia'
      } else if (filtro == "ATRASADOS") {
        this.filtroTrabajador = 'atrasado'
      }
    }, 

    filtarCompletos(){
      this.trabajadores = this.trabajadores.filter(trabajador => trabajador.estadoGeneral !== "completoTodo")
    }
  }
};
</script>
