<template>
  <div class="trabajadores">
    <Header />

    <Container>
      <div class="col d-flex flex-column justify-content-between py-2 px-1 px-sm-5">
        <b-form @submit.prevent="camposVacios" id="form-paso1">
          <div id="#vista1" v-show="!ocultar">
            <!-- Iconos para especificar la vista -->
            <div class="d-flex justify-content-center align-items-center pb-3">
              <span class="icon-user-plus rounded-circle p-2 border border-primary text-primary"></span>
              <span class>---------</span>
              <span class="icon-aid-kit rounded-circle p-2 border" icon="angry"></span>
              <span class>---------</span>
              <span class="icon-user-check rounded-circle p-2 border"></span>
            </div>
            <div v-if="error === false">
              <div class="alert alert-success">Empleado fue registrado</div>
            </div>
            <div v-if="error === true">
              <div class="alert alert-danger">Empleado no fue registrado</div>
            </div>
            <!-- Título del registro -->
            <h4 class="px-sm-5 text-center text-sm-left">Información del trabajador:</h4>
            <!-- Formulario -->
            <div class="flex-grow-1 overflow-auto py-2 px-0 px-sm-5 my-2">
              <div class="form-group">
                <input type="text" v-model="nombres" class="form-control" pattern="[A-Za-z_ _ñ]{3,}" id="nombres" placeholder="Nombres" required/>
              </div>
              <div class="form-group">
                <input type="text" v-model="apellidos" class="form-control" pattern="[A-Za-z_ _ñ]{3,}" id="apellidos" placeholder="Apellidos" required/>
              </div>
              <div class="form-group">
                <input type="text" v-model="direccion" class="form-control" id="direccion" placeholder="Dirección actual" required />
                </div>
                <div class="form-group">
                <input type="email" v-model="correo" class="form-control" id="correo" placeholder="Correo" required/>
                </div>
              <div class="form-group">
                <b-form-select v-model="tipoDocumento" :options="opcionesTipoDoc" required></b-form-select>
                </div>
              <div class="form-group">
                <input type="text" v-model="documento" class="form-control" id="documento" placeholder="Documento" required/>
                </div>
                <div class="form-group">
                <input type="text" v-model="telefono" class="form-control" id="telefono" placeholder="Teléfono" required/>
                </div>
                <div class="form-group">
                <input type="text" v-model="celular" class="form-control" id="celular" placeholder="Celular" />
                </div>
              <div class="form-group">
                <b-form-select v-model="nivelRiesgo" :options="opcionesRiesgo" required></b-form-select>
                </div>
              <div class="form-group">
                <label for="nacimiento">Fecha de nacimiento</label>
                <input type="date" v-model="fechaNacimiento" class="form-control" id="nacimiento" min="1939-01-01" max="2000-12-29" required/>
                </div>
                <div class="form-group text-left">
                <input type="text" v-model="telefonoFamiliar" class="form-control" id="telefonoFamiliar" placeholder="Teléfono de un familiar" required />
                </div>
              <div class="form-check">
                <input class="form-check-input" v-model="tipoTrabajador" type="checkbox" value="tipoTrabajador" id="tipoTrabajador" />
                <label class="form-check-label" for="tipoTrabajador">¿El trabajador se desempeña en el área de salud y seguridad en el trabajo?</label>
                </div>
              <div v-if="mostrarCamposVacios">
                <div class="alert alert-danger">Campos vacios</div>
              </div>
            </div>
            <b-button type="submit" class="float-right" variant="primary">Siguiente</b-button>
          </div>
        </b-form>

        <!-- Seleccion de vacunas -->
        <b-form @submit.prevent="registrarTrabajador">
          <div id="#vista2" v-show="ocultar">
            <!-- Título del registro -->
            <h4 class="px-sm-5 pb-2 text-center text-sm-left">Listado de vacunas</h4>
            <!-- Iconos para especificar la vista -->
            <div class="d-flex justify-content-center align-items-center pb-3">
              <span class="icon-user-plus rounded-circle p-2 border"></span>
              <span class>---------</span>
              <span class="icon-aid-kit rounded-circle p-2 border border-primary text-primary" icon="angry"></span>
              <span class>---------</span>
              <span class="icon-user-check rounded-circle p-2 border"></span>
            </div>
            <!-- Lista de vacunas -->
            <div class="flex-grow-1 overflow-auto py-2 px-0 px-sm-5 my-2">
              <!-- <b-form-group>
                <b-form-checkbox-group id="checkbox-group-1" v-model="detallesVacunacion" :options=[] name="flavour-1"></b-form-checkbox-group>
                </b-form-group> -->
            </div>
          </div>
          <!-- Botón Atras -->
          <b-button class="float-left" @click="ocultar = !ocultar" variant="primary" v-show="ocultar">Atras</b-button>
          <!-- Botón Registrar -->
          <b-button class="float-right" type="submit" variant="primary" v-if="ocultar">Registrar</b-button>
        </b-form>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import Header from '@/components/Header.vue'
import axios from 'axios'

export default {
  name: 'Trabajadores',
  components: {
    Container,
    Header
  },
  data () {
    return {
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
      error: {},
      ocultar:false,
      mostrarCamposVacios:false,
      opcionesRiesgo: [
        {value: null, text: 'Seleccionar nivel de riesgo'},
        {value: 'n1', text: 'I'},
        {value: 'n2', text: 'II'},
        {value: 'n3', text: 'III'},
        {value: 'n4', text: 'IV'},
        {value: 'n5', text: 'V'}
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
      axios.post('http://localhost:4000/empleados', {
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
      }).then(res => {
        this.error = res.data.error;

        console.log(res.data)
      }).catch(err => {

        console.log(err)
      });
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
    }
  }
}
</script>

<style media="screen">
  .stepper .stepper-item {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
