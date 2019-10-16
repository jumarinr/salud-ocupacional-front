<template>
 <div class="login">
   <div class="d-flex flex-column align-items-center bg-light px-5 py-4 rounded container w-50 bg-white">
     <!-- Logo de la empresa -->
     <b-media>
       <template>
        <img src="@/assets/logo.png" alt="Logo de la empresa" width="140px" />
       </template>
     </b-media>
     <!-- Título de inicio de sesión -->
     <h4 class="px-sm-5 text-center text-sm-left">Inicio de sesión</h4>

     <!-- Formulario para inicio de sesión -->
     <div class="flex-grow-1 overflow-auto py-2 px-0 px-sm-5 my-2">
       <b-form @submit.prevent="login" class="my-3">
         <b-form-group>
           <input v-model="correo" type="email" id="correo" class="form-control"  placeholder="Ingresar email" required>
         </b-form-group>
         <b-form-group>
           <input v-model="contrasena" type="password" id="contrasena" class="form-control" placeholder="Ingresar Contraseña" required>
         </b-form-group>         
         <div v-if="error === true">
              <div class="alert alert-danger">Usuario y/o contraseña no encontrado</div>
          </div>
         <!-- Botón Registrar -->
         <b-button class="btn btn-primary" type="submit" variant="primary">Iniciar sesión</b-button>
       </b-form>
     </div>
   </div>
 </div>
</template>

<script>
import axios from 'axios'

export default {
 name: 'Login',
 data () {
   return {
     correo: '',
     contrasena: '',
     error: {}
   }
 },
 methods: {
   login () {
     axios.post('http://localhost:4000/login', {
       correo: this.correo,
       contrasena: this.contrasena
     }).then(res => {       
       if(res.data.error){
         this.error = res.data.error;
       }else{
       localStorage.setItem('user token', res.data)
       this.error = res.data.error;
       this.correo = ''
       this.contrasena = ''       
       this.$router.push('/vacunas')
       }
     }).catch(err => {
       // eslint-disable-next-line
       console.log(err)
     });
   }
 }

}
</script>

<style media="screen">
  .login .container {
    margin-top: 25vh;
  }
</style>
