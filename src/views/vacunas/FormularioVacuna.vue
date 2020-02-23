<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="col d-flex flex-column justify-content-between py-2 px-1 px-sm-5 m-09">
        <div class="my-2">
          <h4 class="float-left">{{ modoEdicion ? 'Edición' : 'Registro'}} de vacuna</h4>
          <b-button to="/vacunas" class="float-right" variant="primary">Volver</b-button>
        </div>

        <!-- Formulario -->
        <div class="flex-grow-1 my-2">
          <b-form @submit.prevent="registrarVacuna">
            <b-form-group>
              <b-form-input
                v-model="nombre"
                type="text"
                id="nombre-vacuna"
                placeholder="Nombre"
                required
              />
            </b-form-group>
            <div class="form-group row">
              <div class="col-sm-11">
                <b-form-input
                  type="number"
                  min="1"
                  v-model="cantidadAplicar"
                  id="cantidad-aplicacion"
                  placeholder="Cantidad de veces a aplicar"
                  required
                />
              </div>
              <label class="col-sm-1 col-form-label">Veces</label>
            </div>
            <div class="form-group row">
              <div class="col-sm-11">
                <b-form-input
                  type="number"
                  min="0"
                  v-model="periodicidad"
                  id="periodicidad"
                  placeholder="Periodicidad"
                />
              </div>
              <label class="col-sm-1 col-form-label">Días</label>
            </div>
            <b-form-group>
              <b-form-input
                type="text"
                v-model="prestadorServicio"
                id="entidad-prestadora"
                placeholder="Entidad que brinda el servicio"
              />
            </b-form-group>
            <b-form-group>
              <b-form-textarea
                id="descripcion"
                v-model="descripcion"
                placeholder="Descripción"
                rows="3"
              />
            </b-form-group>
            <div v-if="error.error === false">
              <div class="alert alert-success">{{error.mensaje}}</div>
            </div>
            <div v-else-if="error.error === true">
              <div class="alert alert-danger">{{error.mensaje}}</div>
            </div>
            <!-- Botón Registrar -->
            <b-button class="float-right" type="submit" variant="primary">Registrar</b-button>
          </b-form>
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
  name: "RegistrarVacuna",
  components: {
    Header,
    Container,
    Footer
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      nombre: "",
      descripcion: "",
      periodicidad: "",
      cantidadAplicar: "",
      prestadorServicio: "",
      error: {}
    };
  },
  methods: {
    registrarVacuna() {
      // Cambiar ruta a la ruta de la api
      axios({
        method: "POST",
        url: this.baseUrl + "/vacunas",
        data: {
          nombre: this.nombre,
          descripcion: this.descripcion,
          periodicidad: this.periodicidad,
          cantidadAplicar: this.cantidadAplicar,
          prestadorServicio: this.prestadorServicio
        },
        withCredentials: true
      })
        .then(res => {
          this.error = res.data;

          // eslint-disable-next-line
          console.log(res.data);
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

      this.nombre = "";
      this.descripcion = "";
      this.periodicidad = "";
      this.cantidadAplicar = "";
      this.prestadorServicio = "";
    }

    /*obtenerVacunas(){
                fetch('/vacunas')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data;
                        console.log(this.tasks)
                    });
            }*/
  }
};
</script>
