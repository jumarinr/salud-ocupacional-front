<template>
  <div class="contenedor">
    <!-- Registro de vacunas -->
    <main class="flex-grow-1 d-flex align-items-stretch justify-content-center my-sm-4">
        <div class="row container bg-white p-2 rounded">
            <!-- <div class="col d-flex flex-column justify-content-between py-2 px-1 px-sm-5"> -->
              <!-- Dentro del slot se renderiza lo que se pase como hijo al container -->
              <slot></slot>
            <!-- </div> -->
        </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Container'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
