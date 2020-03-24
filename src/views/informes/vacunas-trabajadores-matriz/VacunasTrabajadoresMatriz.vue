<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column p-3">
        <div class="d-flex justify-content-between my-3">
          <!-- Botón de descarga -->
          <div class="">
            <b-button class="btn btn-success" v-on:click="descargarMatriz()"
              >Descargar matriz</b-button
            >
          </div>

          <!-- Start Buscador de trabajador por nombre o identificacion -->
          <div class="">
            <input
              class="form-control"
              type="text"
              placeholder="Buscar Trabajador"
              aria-label="Buscar Trabajador"
              v-model="filtroTrabajador"
            />
          </div>
          <!-- End Buscador -->
        </div>

        <!-- Start Tabla donde se muestran los datos de los trabajadores -->
        <b-table
          class="align-self-stretch shadow border text-center"
          responsive
          bordered
          :items="trabajadores"
          :fields="campostrabajadores"
          :filter="filtroTrabajador"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          sort-icon-center
        >
          <template v-slot:cell(vacunas)="data">
            <span v-html="data.value"></span>
          </template>
        </b-table>
        <!-- End Tabla -->
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
import XLSX from "xlsx";

export default {
  name: "VacunasTrabajadores",
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
        { key: "identificacion", sortable: true },
        { key: "nombres", sortable: true }
      ],
      trabajadores: [],
      vacunas: [],
      filterOn: ["identificacion", "nombres"],
      sortBy: "nombres"
    };
  },
  created() {
    this.obtenertrabajadores();
    this.obtenerVacunas();
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

          /*
           *  Los diferentes colores que se pueden utilizar:
           *  primary
           *  secondary
           *  success
           *  warning
           *  danger
           *  info
           *  light
           *  dark
           *
           *  Los colores pueden ser aplicados a una celda con _cellVariants
           *
           *  En el siguiente for se pueden realizar los filtros necesarios para aplicar los colores en las celdas
           */
          this.rows = Object.keys(this.trabajadores).length;
          var hoy = new Date();
          for (let index = 0; index < this.rows; index++) {
            var id_emp = this.trabajadores[index]._id;
            var cantAtrasadas = 0;
            var vacunaCompleta = 0;
            if (this.trabajadores[index].detallesVacunacion.length > 0) {
              for (
                let indexDetalles = 0;
                indexDetalles <
                this.trabajadores[index].detallesVacunacion.length;
                indexDetalles++
              ) {
                if (
                  this.trabajadores[index].detallesVacunacion[indexDetalles]
                    .aplicaciones.length > 0
                ) {
                  if (
                    this.trabajadores[index].detallesVacunacion[indexDetalles]
                      .aplicaciones.length ==
                    this.trabajadores[index].detallesVacunacion[indexDetalles]
                      .vacuna.cantidadAplicar
                  ) {
                    this.trabajadores[index].detallesVacunacion[indexDetalles][
                      "estado"
                    ] = "Vacuna completa";
                    vacunaCompleta++;
                  } else {
                    var ultimaAplicacion = new Date(
                      Date.parse(
                        this.trabajadores[index].detallesVacunacion[
                          indexDetalles
                        ].aplicaciones[
                          this.trabajadores[index].detallesVacunacion[
                            indexDetalles
                          ].aplicaciones.length - 1
                        ]
                      )
                    );
                    if (
                      Math.floor(
                        (hoy.getTime() - ultimaAplicacion.getTime()) /
                          (1000 * 60 * 60 * 24)
                      ) >
                      this.trabajadores[index].detallesVacunacion[indexDetalles]
                        .vacuna.periodicidad
                    ) {
                      this.trabajadores[index].detallesVacunacion[
                        indexDetalles
                      ]["estado"] = "Atrasado";
                      cantAtrasadas++;
                    } else {
                      this.trabajadores[index].detallesVacunacion[
                        indexDetalles
                      ]["estado"] = "Al dia";
                    }
                  }
                }
              }

              if (
                vacunaCompleta ==
                this.trabajadores[index].detallesVacunacion.length
              ) {
                this.trabajadores[index]["estadoGeneral"] = "completoTodo";
              }
            }

            if (cantAtrasadas > 0) {
              this.trabajadores[index]["estadoGeneral"] = "atrasado";
            } else {
              this.trabajadores[index]["estadoGeneral"] = "al dia";
            }
          }

          for (let trabajador of this.trabajadores) {
            trabajador._cellVariants = {
              identificacion: "",
              nombres: ""
            };
            if (trabajador.detallesVacunacion.length > 0) {
              for (let detalle of trabajador.detallesVacunacion) {
                var color = "";
                if (detalle.estado == "Atrasado") {
                  color = "danger";
                } else if (detalle.estado == "Al dia" || !detalle.estado) {
                  color = "primary";
                } else if (detalle.estado == "Vacuna completa") {
                  color = "success";
                }
                trabajador._cellVariants[detalle.vacuna.nombre] = color;
              }
            }
          }
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

    obtenerVacunas() {
      axios({
        method: "GET",
        url: this.baseUrl + "/vacunas",
        withCredentials: true
      })
        .then(res => {
          this.vacunas = res.data.datos;
          for (let vacuna of this.vacunas) {
            this.campostrabajadores.push({
              key: vacuna.nombre,
              sortable: false
            });
          }
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

    descargarMatriz() {
      let matriz = [];
      let fila1 = ["Identificacion", "Nombres"];
      for (let vacuna of this.vacunas) {
        fila1.push(vacuna.nombre);
      }
      matriz.push(fila1);

      let nombres = [];
      for (let trabajador of this.trabajadores) {
        nombres.push(trabajador.nombres);
        matriz.push([]);
      }
      nombres.sort();

      let filasTrabajadores = [];
      for (let trabajador of this.trabajadores) {
        let fila = [trabajador.identificacion, trabajador.nombres];
        for (let index = 2; index < fila1.length; index++) {
          let vacuna = fila1[index];
          if (trabajador._cellVariants[vacuna] == "primary") {
            fila.push("Al dia");
          } else if (trabajador._cellVariants[vacuna] == "danger") {
            fila.push("Atrasado");
          } else if (trabajador._cellVariants[vacuna] == "success") {
            fila.push("Vacuna completa");
          } else {
            fila.push("");
          }
        }
        filasTrabajadores.push(fila);
      }

      for (let fila of filasTrabajadores) {
        let indice = nombres.indexOf(fila[1]) + 1;
        matriz[indice] = fila;
      }

      let sheet1 = XLSX.utils.aoa_to_sheet(matriz);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheet1);
      XLSX.writeFile(workbook, "informeMatriz.xlsx");
    }
  }
};
</script>
