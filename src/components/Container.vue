<template>
  <main id="containerPrincipal" class="d-flex justify-content-center pt-5">
    <div class="row container bg-white p-2 my-4 rounded">
      <!-- Dentro del slot se renderiza lo que se pase como hijo al container -->
      <slot></slot>
    </div>
  </main>
</template>

<script>
export default {
  name: "Container"
};
</script>
