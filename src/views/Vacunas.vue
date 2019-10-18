<template>
  <div class="vacunas">
    <Header />

    <Container>
      <div class="col d-flex flex-column justify-content-between py-2 px-1 px-sm-5">
        <!-- Título del registro -->
        <h4 class="px-sm-5 text-center text-sm-left">Registro de vacunas:</h4>

        <!-- Formulario -->
        <div class="flex-grow-1 overflow-auto py-2 px-0 px-sm-5 my-2">
          <b-form @submit.prevent="registrarVacuna">
            <b-form-group>
                <b-form-input v-model="nombre" type="text" id="nombre-vacuna" placeholder="Nombre" required />
            </b-form-group>
            <div class="form-group row">              
              <div class="col-sm-11">
                <b-form-input type="number" v-model="cantidadAplicar" id="cantidad-aplicacion" placeholder="Cantidad de veces a aplicar" required />
              </div>
              <label class="col-sm-1 col-form-label">Veces</label>
            </div>
            <div class="form-group row">              
              <div class="col-sm-11">
                <b-form-input type="text" v-model="periodicidad" id="periodicidad" placeholder="Periodicidad" />
              </div>
              <label class="col-sm-1 col-form-label">Días</label>
            </div>
            <b-form-group>
                <b-form-input type="text" v-model="prestadorServicio" id="entidad-prestadora" placeholder="Entidad que brinda el servicio" />
            </b-form-group>
            <b-form-group>
                <b-form-textarea id="descripcion" v-model="descripcion" placeholder="Descripción" rows="3" />
            </b-form-group>
            <div v-if="error.status === false">
                <div class="alert alert-danger">Esta vacuna ya se encuentra registrada</div>
            </div>
            <div v-else-if="error.status === true">
                <div class="alert alert-success">La vacuna se ha registrado correctamente</div>
            </div>
            <!-- Botón Registrar -->
            <b-button class="float-right" type="submit" variant="primary">Registrar</b-button>
          </b-form>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>

import axios from 'axios';

// @ is an alias to /src
import Container from '@/components/Container.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Vacunas',
  components: {
    Container,
    Header
  },
  data (){
      return {
        nombre: '',
        descripcion: '',
        periodicidad: '',
        cantidadAplicar: '',
        prestadorServicio: '',
        error: {}
      }
  },
  methods: {
      registrarVacuna(){
          // Cambiar ruta a la ruta de la api
          axios.post('http://localhost:4000/vacunas', {
              nombre: this.nombre,
              descripcion: this.descripcion,
              periodicidad: this.periodicidad,
              cantidadAplicar: this.cantidadAplicar,
              prestadorServicio: this.prestadorServicio,

          }).then(res => {
              this.error = res.data;

              // eslint-disable-next-line
              console.log(res.data)
          }).catch(err => {
            // eslint-disable-next-line
              console.log(err)
          });

          this.nombre = '';
          this.descripcion = '';
          this.periodicidad = '';
          this.cantidadAplicar = '';
          this.prestadorServicio = '';
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
