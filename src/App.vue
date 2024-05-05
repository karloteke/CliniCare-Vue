<script setup lang="ts">
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
    </main>

    <footer>
      <FooterComponent></FooterComponent>
    </footer>
  </v-app>
</template>


<style scoped>

</style>
