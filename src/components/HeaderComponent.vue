<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const items = [
  { text: 'Home', to: '/' },
  { text: 'Pacientes', to: '/patients' },
  { text: 'Citas', to: '/appointments' },
  { text: 'Historial médico', to: '/medicalRecords' },
  { text: 'Usuarios', to: '/users' },
]
</script>

<template>
  <v-card>
      <v-app-bar color="green darken-3" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>CliniCare</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-magnify" variant="text"></v-btn>
        <!-- <v-btn icon="mdi-filter" variant="text"></v-btn>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app right width="200">
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.text" :to="item.to">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  </v-card>
</template>


<style scoped>

</style>




