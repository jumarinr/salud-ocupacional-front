<template>
  <div>
    <!-- HEADER -->
    <Header />

    <Container>
      <div class="w-100 d-flex flex-column align-items-center p-3">

        <div class="w-100">
          <!-- Botón Registrar -->
          <b-button to="/registrarTrabajador" class="my-3 float-left" variant="primary">
            Registrar Trabajador
          </b-button>
          
          <!-- Buscador -->
          <div class="my-3 float-right">
            <input class="form-control" type="text" placeholder="Buscar" aria-label="Buscar"/>
          </div>
        </div>
        
        <!-- Tabla donde se muestran los datos de los empleados -->
        <b-table
            class="align-self-stretch shadow border text-center"
          :items="empleados"
          :fields="camposEmpleados"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          sort-icon-center
        >
        </b-table>

        <!-- Pagination -->
        <div>
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="mt-4">
            <template v-slot:first-text>
              <span class="text-success">Primero</span>
            </template>
            <template v-slot:prev-text>
              <span class="text-danger">Atras</span>
            </template>
            <template v-slot:next-text>
              <span class="text-warning">Siguiente</span>
            </template>
            <template v-slot:last-text>
              <span class="text-info">Ultimo</span>
            </template>
            <template v-slot:ellipsis-text>
              <b-spinner small type="grow"></b-spinner>
              <b-spinner small type="grow"></b-spinner>
              <b-spinner small type="grow"></b-spinner>
            </template>
            <template v-slot:page="{ page, active }">
              <b v-if="active">{{ page }}</b>
              <i v-else>{{ page }}</i>
            </template>
          </b-pagination>
        </div>
      </div>
    </Container>

    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Trabajadores",
  components: {
    Header,
    Container,
    Footer
  },
  data() {
    return {
      // ----- Datos de la tabla
      camposEmpleados: [
        { key: "nombre", sortable: true },
        { key: "identificacion", sortable: false },
        { key: "ver", sortable: false },
        { key: "editar", sortable: false },
        { key: "borrar", sortable: false }
      ],
      empleados: [
        { isActive: true, nombre: 'Armando Paredes Rojas', identificacion: "123456789"},
        { isActive: false, nombre: 'Buñuelos Paredes Rojas', identificacion: "123456789"},
        { isActive: false, nombre: 'Casas Paredes Rojas', identificacion: "123456789"},
        { isActive: true, nombre: 'Domino Paredes Rojas', identificacion: "123456789"},
        { isActive: true, nombre: 'Armando Paredes Rojas', identificacion: "123456789"},
        { isActive: false, nombre: 'Buñuelos Paredes Rojas', identificacion: "123456789"},
        { isActive: false, nombre: 'Casas Paredes Rojas', identificacion: "123456789"},
        { isActive: true, nombre: 'Domino Paredes Rojas', identificacion: "123456789"},
        { isActive: true, nombre: 'Armando Paredes Rojas', identificacion: "123456789"},
        { isActive: false, nombre: 'Buñuelos Paredes Rojas', identificacion: "123456789"},
        { isActive: false, nombre: 'Casas Paredes Rojas', identificacion: "123456789"},
        { isActive: true, nombre: 'Domino Paredes Rojas', identificacion: "123456789"}
      ],
      // ----- Datos del pagination
      rows: 100,
      perPage: 10,
      currentPage: 1
    };
  }
};
</script>
