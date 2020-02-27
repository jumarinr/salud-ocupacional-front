<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="col px-1 px-sm-5">
        <!-- Formulario paso 1 -->
        <b-form @submit.prevent="camposVacios" id="form-paso1">
          <div id="#vista1" v-show="!ocultar">
            <!-- Iconos para especificar la vista -->
            <Stepper paso="1" />

            <!-- Alertas -->
            <div v-if="error !== null" :class="[error === true ? 'alert-danger' : 'alert-success', 'alert']">{{ mensajeTransaccion }}</div>

            <!-- Título del registro -->
            <h4 class="px-sm-5 text-center text-sm-left">{{ modoEdicion ? 'Edición' : 'Registro'}} de trabajador</h4>

            <!-- Formulario -->
            <div class="py-2 px-0 px-sm-5 my-2">
              <div class="form-group">
                <label for="tipoDocumento">Tipo de identificación</label>
                <b-form-select v-model="tipoDocumento" :options="opcionesTipoDoc" required></b-form-select>
              </div>
              <div class="form-group">
                <label for="documento">Identificación</label>
                <input type="text" v-model="documento" class="form-control" id="documento" placeholder="Identificación" required/>
              </div>
              <div class="form-group">
              <div class="form-group">
                <label for="correo">Correo</label>
                <input type="email" v-model="correo" class="form-control" id="correo" placeholder="Correo" required/>
              </div>
                <label for="nombres">Nombres</label>
                <input type="text" v-model="nombres" class="form-control" pattern="[A-Za-z_á_é_í_ó_ú_ñ_Á_É_Í_Ó_Ú_ ]{3,}" id="nombres" placeholder="Nombres" required/>
              </div>
              <div class="form-group">
                <label for="apellidos">Apellidos</label>
                <input type="text" v-model="apellidos" class="form-control" pattern="[A-Za-z_á_é_í_ó_ú_ñ_Á_É_Í_Ó_Ú_ ]{3,}" id="apellidos" placeholder="Apellidos" required/>
              </div>
              <div class="form-group">
                <label for="nacimiento">Fecha de nacimiento</label>
                <input type="date" v-model="fechaNacimiento" class="form-control" id="nacimiento" min="1939-01-01" max="2000-12-29" required/>
              </div>
              <div class="form-group">
                <label for="direccion">Dirección</label>
                <input type="text" v-model="direccion" class="form-control" id="direccion" placeholder="Dirección" required />
              </div>
              <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input type="text" v-model="telefono" class="form-control" id="telefono" placeholder="Teléfono" required/>
              </div>
              <div class="form-group">
                <label for="celular">Celular</label>
                <input type="text" v-model="celular" class="form-control" id="celular" placeholder="Celular" />
              </div>
              <div class="form-group text-left">
                <label for="telefonoFamiliar">Contacto de allegado</label>
                <input type="text" v-model="telefonoFamiliar" class="form-control" id="telefonoFamiliar" placeholder="Contacto de allegado" required />
              </div>
              <div class="form-group">
                <label for="nivelRiesgo">Nivel de riesgo laboral</label>
                <b-form-select v-model="nivelRiesgo" :options="opcionesRiesgo" required></b-form-select>
              </div>
              <div v-if="areaTrabajo() == 'Direccion'" class="form-check">
                <input class="form-check-input" v-model="tipoTrabajador" type="checkbox" value="tipoTrabajador" id="tipoTrabajador" />
                <label class="form-check-label" for="tipoTrabajador">¿El trabajador se desempeña en el área de salud y seguridad en el trabajo?</label>
              </div>
              <div v-if="mostrarCamposVacios">
                <div class="alert alert-danger">Campos vacios</div>
              </div>
            </div>

            <!-- Botón Siguiente -->
            <b-button type="submit" class="float-right mr-sm-5" variant="primary">Siguiente</b-button>
          </div>
        </b-form>

        <!-- Formulario paso 2 | Seleccion de vacunas -->
        <b-form @submit.prevent="funcionModo">
          <div id="#vista2" v-show="ocultar">
            <!-- Iconos para especificar la vista -->
            <Stepper paso="2" />

            <!-- Título del registro -->
            <h4 class="px-sm-5 pb-2 text-center text-sm-left">Listado de vacunas</h4>

            <!-- Lista de vacunas -->
            <div class="flex-grow-1 overflow-auto py-2 px-0 px-sm-5 my-2">
              <b-form-group>
                <b-form-checkbox-group
                  id="checkbox-group-2" v-model="detallesVacunacion" name="seleccionarVacunas" v-for="vacuna in listaVacunas" :key="vacuna._id">
                  <b-form-checkbox :value="vacuna._id">{{ vacuna.nombre }}</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </div>
          </div>

          <!-- Botón Atras -->
          <b-button class="float-left ml-sm-5" @click="ocultar = !ocultar" variant="primary" v-show="ocultar">Atras</b-button>

          <!-- Botón Registrar -->
          <b-button class="float-right mr-sm-5" type="submit" variant="primary" v-if="ocultar">{{ modoEdicion ? 'Editar' : 'Registrar'}}</b-button>
        </b-form>
      </div>
    </Container>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header.vue'
import Container from '@/components/Container.vue'
import Footer from '@/components/Footer.vue'
import Stepper from '@/components/Stepper.vue'

export default {
  name: 'RegistrarTrabajador',
  components: {
    Header,
    Container,
    Footer,
    Stepper
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      modoEdicion: !!this.$route.params.idTrabajador,
      nombres: '',
      apellidos: '',
      direccion: '',
      correo: '',
      tipoDocumento: null,
      documento: '',
      telefono: '',
      celular: null,
      nivelRiesgo: null,
      fechaNacimiento: '',
      telefonoFamiliar: '',
      tipoTrabajador: '',
      detallesVacunacion: [],
      error: null,
      mensajeTransaccion: "",
      ocultar:false,
      mostrarCamposVacios:false,
      listaVacunas:[],
      opcionesRiesgo: [
        {value: null, text: 'Seleccionar nivel de riesgo'},
        {value: 'I', text: 'I'},
        {value: 'II', text: 'II'},
        {value: 'III', text: 'III'},
        {value: 'IV', text: 'IV'},
        {value: 'V', text: 'V'}
      ],
      opcionesTipoDoc: [
        {value: null, text: 'Seleccionar tipo de documento'},
        {value: 'cc', text: 'Cédula de ciudadanía'},
        {value: 'tp', text: 'Pasaporte'}
      ]
    }
  },
  methods: {
    registrarTrabajador () {
      this.error = null;
      this.mensajeTransaccion = "";

      // TODO: Hacer la lógica correspondiente para el editar
      axios({
        method: "POST",
        url: this.baseUrl + '/empleados',
        withCredentials: true,
        data: {
          nombres: this.nombres,
          apellidos: this.apellidos,
          direccion: this.direccion,
          correo: this.correo,
          tipoDocumento: this.tipoDocumento,
          documento: this.documento,
          telefono: this.telefono,
          celular: this.celular,
          nivelRiesgo: this.nivelRiesgo,
          fechaNacimiento: this.fechaNacimiento,
          telefonoFamiliar: this.telefonoFamiliar,
          tipoTrabajador: this.tipoTrabajador,
          detallesVacunacion: this.detallesVacunacion
        }
      }).then(res => {
        this.error = res.data.error;
        this.mensajeTransaccion = res.data.mensaje;
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

      this.nombres= '';
      this.apellidos= '';
      this.direccion= '';
      this.correo= '';
      this.tipoDocumento= null;
      this.documento= '';
      this.telefono= '';
      this.celular= null;
      this.nivelRiesgo= null;
      this.fechaNacimiento= '';
      this.telefonoFamiliar= '';
      this.tipoTrabajador= '';
      this.detallesVacunacion= [];
      this.ocultar=!this.ocultar;
      this.mostrarCamposVacios=false;
    },
    camposVacios () {
      if([this.nombres, this.apellidos, this.direccion, this.correo, this.tipoDocumento, this.documento, this.telefono, this.nivelRiesgo,
        this.fechaNacimiento, this.telefonoFamiliar].some(item => item === '')) {
          this.mostrarCamposVacios=true;
        } else {
          this.ocultar=!this.ocultar;
        }
    },
    editarTrabajador() {
      axios({
        method: "PUT",
        url: this.baseUrl + '/empleados/' + this.$route.params.idTrabajador,
        withCredentials: true,
        data: {
          nombres: this.nombres,
          apellidos: this.apellidos,
          direccion: this.direccion,
          correo: this.correo,
          tipoDocumento: this.tipoDocumento,
          documento: this.documento,
          telefono: this.telefono,
          celular: this.celular,
          nivelRiesgo: this.nivelRiesgo,
          fechaNacimiento: this.fechaNacimiento,
          telefonoFamiliar: this.telefonoFamiliar,
          tipoTrabajador: this.tipoTrabajador,
          detallesVacunacion: this.detallesVacunacion
        }
      }).then(res => {
        this.error = res.data.error;
        this.mensajeTransaccion = res.data.mensaje;
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

      this.nombres= '';
      this.apellidos= '';
      this.direccion= '';
      this.correo= '';
      this.tipoDocumento= null;
      this.documento= '';
      this.telefono= '';
      this.celular= null;
      this.nivelRiesgo= null;
      this.fechaNacimiento= '';
      this.telefonoFamiliar= '';
      this.tipoTrabajador= '';
      this.detallesVacunacion= [];
      this.ocultar=!this.ocultar;
      this.mostrarCamposVacios=false;
    },
    funcionModo() {
      if (this.modoEdicion) {
        return this.editarTrabajador()
      }
      return this.registrarTrabajador()
    },
    areaTrabajo() {
      return localStorage.getItem("areaTrabajo");
    }
  },
  created: function () {

    // Se consultan las vacunas
    axios({
      method: "GET",
      url: this.baseUrl + '/vacunas',
      withCredentials: true
    })
    .then(res => {
      this.listaVacunas = res.data.datos;
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

    // Se consultan e insertan en el formulario los datos del empleado a editar
    if (this.modoEdicion) {
      axios({
        method: "GET",
        url: this.baseUrl + '/empleados/' + this.$route.params.idTrabajador,
        withCredentials: true
      }).then(res => {
        this.tipoDocumento = this.opcionesTipoDoc.filter((elemento) => {
          return elemento.value == res.data.datos.tipoIdentificacion
        })[0].value
        this.documento = res.data.datos.identificacion
        this.correo = res.data.datos.correo
        this.nombres = res.data.datos.nombres
        this.apellidos = res.data.datos.apellidos
        this.fechaNacimiento = String(res.data.datos.fechaNacimiento).substring(0, 10)
        this.direccion = res.data.datos.direccion
        this.telefono = res.data.datos.telefono
        this.celular = res.data.datos.celular
        this.telefonoFamiliar = res.data.datos.contactoAllegado
        this.nivelRiesgo = this.opcionesRiesgo.filter((elemento) => {
          return elemento.value == res.data.datos.nivelRiesgoLaboral
        })[0].value
        this.tipoTrabajador = res.data.datos.areaTrabajo == "Empleado salud" ? true : false
        this.detallesVacunacion = res.data.datos.detallesVacunacion.map((elemento) => {
          return elemento.vacuna._id
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
    }
  }
}
</script>
