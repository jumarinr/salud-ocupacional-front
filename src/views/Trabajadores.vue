<template>
  <div class="trabajadores">
    <Header />

    <Container>
      <div class="col d-flex flex-column justify-content-between py-2 px-1 px-sm-5">
        <!-- Iconos para especificar la vista -->
        <div class="d-flex justify-content-center align-items-center pb-3">
          <span class="icon-user-plus rounded-circle p-2 border border-primary text-primary"></span>
          <span class>---------</span>
          <span class="icon-aid-kit rounded-circle p-2 border" icon="angry"></span>
          <span class>---------</span>
          <span class="icon-user-check rounded-circle p-2 border"></span>
        </div>
        <div id="#vista1">
          <!-- Título del registro -->
          <h4 class="px-sm-5 text-center text-sm-left">Información del trabajador:</h4>
          <!-- Formulario -->
          <div class="flex-grow-1 overflow-auto py-2 px-0 px-sm-5 my-2">
            <form>
              <div class="form-group">
                <input type="text" v-model="nombres" class="form-control" id="nombres" placeholder="Nombres" required/>
              </div>
              <div class="form-group">
                <input type="text" v-model="apellidos" class="form-control" id="apellidos" placeholder="Apellidos" required/>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  v-model="direccion"
                  class="form-control"
                  id="direccion"
                  placeholder="Dirección actual"
                  required
                />
              </div>
              <div class="form-group">
                <input type="email" v-model="correo" class="form-control" id="correo" placeholder="Correo" required/>
              </div>
              <div class="form-group">
                <b-form-select v-model="tipoDocumento" :options="options2" required></b-form-select>
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
                <b-form-select v-model="nivelRiesgo" :options="options1" required></b-form-select>
              </div>
              <div class="form-group">
                <label for="nacimiento">Fecha de nacimiento</label>
                <input type="date" v-model="fechaNacimiento" class="form-control" id="nacimiento" min="1939-01-01" max="2000-12-29" required/>
              </div>
              <div class="form-group text-left">
                <input
                  type="text"
                  v-model="telefonoFamiliar"
                  class="form-control"
                  id="telefonoFamiliar"
                  placeholder="Teléfono de un familiar"
                  required
                />
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  v-model="tipoTrabajador"
                  type="checkbox"
                  value="tipoTrabajador"
                  id="tipoTrabajador"
                  required
                />
                <label
                  class="form-check-label"
                  for="tipoTrabajador"
                >¿El trabajador se desempeña en el área de salud y seguridad en el trabajo?</label>
              </div>
            </form>
          </div>
        </div>

        <!-- Seleccion de vacunas -->
        <div id="#vista2">
        <!-- Título del registro -->
        <h4 class="px-sm-5 pb-2 text-center text-sm-left">Listado de vacunas</h4>

        <!-- Busqueda de vacuna -->
        <div class="pb-1 px-0 px-sm-5 my-2">
          <form class="form-inline">
            <div class="input-group">
              <input
                class="form-control mr-2"
                type="search"
                placeholder="Nombre de la vacuna"
                aria-label="Buscar vacuna por nombre"
              />
              <button class="btn btn-outline-primary my-0" type="submit">Buscar</button>
            </div>
          </form>
        </div>

        <!-- Lista de vacunas -->
        <div class="flex-grow-1 overflow-auto py-2 px-0 px-sm-5 my-2">
            <b-form-group label="Using options array:">
              <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="Avacunas"
              name="flavour-1"
            ></b-form-checkbox-group>
            </b-form-group>
        </div>
        </div>
        <!-- Botón Registrar -->
        <button type="button" class="align-self-end btn btn-primary">Registrar</button>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import Header from '@/components/Header.vue'

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
      selected: '',
      options1: [
        {value: null, text: 'Seleccionar nivel de riesgo'},
        {value: 'n1', text: 'Nivel 1'},
        {value: 'n2', text: 'Nivel 2'},
        {value: 'n3', text: 'Nivel 3'},
        {value: 'n4', text: 'Nivel 4'},
        {value: 'n5', text: 'Nivel 5'}
      ],
      options2: [
        {value: null, text: 'Seleccionar tipo de documento'},
        {value: 'cc', text: 'Cédula de ciudadanía'},
        {value: 'tp', text: 'Pasaporte'}
      ],
      Avacunas: [
        {text: 'neumococo', value: 'a'}
      ]
    }
  }
}
</script>
