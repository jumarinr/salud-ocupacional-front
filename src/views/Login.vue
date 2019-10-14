<template>
 <div class="login">
   <div class="d-flex flex-column align-items-center bg-light px-5 py-4 rounded container w-50 bg-white">
     <!-- Logo de la empresa -->
     <b-media>
       <img src="@/assets/logo.png" alt="Logo de la empresa" width="140px" />
     </b-media>
     <!-- Título de inicio de sesión -->
     <h4 class="px-sm-5 text-center text-sm-left">Inicio de sesión</h4>

     <!-- Formulario para inicio de sesión -->
     <div class="flex-grow-1 overflow-auto py-2 px-0 px-sm-5 my-2">
       <b-form @submit.prevent="login" class="my-3">
         <b-form-group>
           <input v-model="email" type="email" id="email" class="form-control"  placeholder="Ingresar email" required>
         </b-form-group>
         <b-form-group>
           <input v-model="password" type="password" id="password" class="form-control" placeholder="Ingresar Contraseña" required>
         </b-form-group>
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
     email: '',
     password: ''
   }
 },
 methods: {
   login () {
     axios.post('', {
       email: this.email,
       password: this.password
     }).then(res => {
       localStorage.setItem('usertoken', res.data)
       this.email = ''
       this.password = ''
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
