<template>
  <div class="d-flex justify-content-center align-items-center pb-3 stepper">
    <!-- Iconos de añadir empleado -->
    <span :class="[paso == 1 ? 'border-primary text-primary' : '', 'rounded-circle border stepper-item']">
      <i class="fas fa-user-plus"></i>
    </span>
    <span class>-------------</span>
    <!-- Iconos de añadir vacunas -->
    <span :class="[paso == 2 ? 'border-primary text-primary' : '', 'rounded-circle border stepper-item']">
      <i class="fas fa-medkit"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Stepper',
  props: ['paso'],

};
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
