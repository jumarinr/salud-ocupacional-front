<template>
 <div class="justify-content-center align-items-center">
   <div class="d-flex flex-column align-items-center px-5 py-4 rounded bg-white bg-light">
     
     <!-- Logo de la empresa -->
     <b-media>
        <img src="@/assets/logo.png" alt="Logo de la empresa" width="140px" />
     </b-media>
     
     <!-- Título de inicio de sesión -->
     <h4 class="px-sm-5 text-center text-sm-left">Inicio de sesión</h4>

     <!-- Formulario para inicio de sesión -->
     <div class="py-2 px-0 px-sm-5 my-2">
       <b-form @submit.prevent="login" class="d-flex flex-column align-items-center my-3">
         <!-- Input de usuario -->
         <b-form-group>
           <input v-model="correo" type="email" id="correo" class="form-control"  placeholder="Ingresar email" required>
         </b-form-group>
         <!-- Input de contraseña -->
         <b-form-group>
           <input v-model="contrasena" type="password" id="contrasena" class="form-control" placeholder="Ingresar contraseña" required>
         </b-form-group>   
         <!-- Alerta -->
         <div v-if="error === true">
              <div class="alert alert-danger">Usuario y/o contraseña no encontrado</div>
          </div>
         <!-- Botón Iniciar Sesión -->
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
     baseUrl: process.env.VUE_APP_BASE_URL,
     correo: '',
     contrasena: '',
     error: {}
   }
 },
 methods: {
   login () {
     axios.post(this.baseUrl + '/login', {
       correo: this.correo,
       contrasena: this.contrasena
     }).then(res => {       
       if(res.data.error){
         this.error = res.data.error;
       }else{
       localStorage.setItem('usertoken', res.data)
       this.error = res.data.error;
       this.correo = ''
       this.contrasena = ''       
       this.$router.push('/home')
       }
     }).catch(err => {
       // eslint-disable-next-line
       console.log(err)
     });
   }
 }

}
</script>
