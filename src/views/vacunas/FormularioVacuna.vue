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
          <b-form @submit.prevent="funcionModo">
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
            <div class="form-group row">
              <div class="col-sm">
                <b-form-input
                  type="number"
                  min="0"
                  v-model="costo"
                  placeholder="Costo"
                />
              </div>
            </div>
            <!-- Botón Registrar -->
            <b-button class="float-right" type="submit" variant="primary">{{ modoEdicion ? 'Editar' : 'Registrar'}}</b-button>
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
      modoEdicion: !!this.$route.params.idVacuna,
      nombre: "",
      descripcion: "",
      periodicidad: "",
      cantidadAplicar: "",
      prestadorServicio: "",
      costo: "",
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
    },
    editarVacuna() {
      axios({
        method: "PUT",
        url: this.baseUrl + "/vacunas/" + this.$route.params.idVacuna,
        withCredentials: true,
        data: {
          nombre: this.nombre,
          descripcion: this.descripcion,
          periodicidad: this.periodicidad,
          cantidadAplicar: this.cantidadAplicar,
          prestadorServicio: this.prestadorServicio
        }
      }).then(res => {
        this.error = res.data;

        this.$bvModal.msgBoxOk(this.error.mensaje, {
          title: 'Confirmación',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: this.error.error ? "danger" : "success",
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        }).then(value => {
          this.$router.push("/vacunas")
        })
      }).catch((error) =>{
        // Ya no existe la sesión en el servidor
        if (error.response.status == 405) {
          localStorage.removeItem('usertoken')
          localStorage.removeItem("authenticated")
          localStorage.removeItem("areaTrabajo")
          localStorage.removeItem("id")
          this.$router.push("/")
        }
      })
    },
    funcionModo() {
      if (this.modoEdicion) {
        return this.editarVacuna()
      }
      return this.registrarVacuna()
    }
  },
  created() {
    // Se consultan e insertan en el formulario los datos de la vacuna a editar
    if (this.modoEdicion) {
      axios({
        method: "GET",
        url: this.baseUrl + "/vacunas/" + this.$route.params.idVacuna,
        withCredentials: true
      }).then(res => {
        this.nombre = res.data.datos.nombre
        this.descripcion = res.data.datos.descripcion
        this.periodicidad = res.data.datos.periodicidad
        this.cantidadAplicar = res.data.datos.cantidadAplicar
        this.prestadorServicio = res.data.datos.prestadorServicio
      }).catch((error) =>{
        // Ya no existe la sesión en el servidor
        if (error.response.status == 405) {
          localStorage.removeItem('usertoken')
          localStorage.removeItem("authenticated")
          localStorage.removeItem("areaTrabajo")
          localStorage.removeItem("id")
          this.$router.push("/")
        }
      })
    }
  }
};
</script>
