<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

</script>

<template>
  <v-app>
    <header>
      <HeaderComponent></HeaderComponent>
    </header>

    <main>
    <RouterView />
        <!-- <nav>
          <RouterLink to="/patients">Pacientes</RouterLink>
          <RouterLink to="/appointments">Citas</RouterLink>
          <RouterLink to="/MedicalRecords">Historial médico</RouterLink>
        </nav> -->
    </main>

    <footer>
      <FooterComponent></FooterComponent>
    </footer>
  </v-app>
  <!-- <RouterView /> -->
</template>

<style scoped>

</style>
