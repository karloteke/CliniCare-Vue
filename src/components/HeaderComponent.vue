<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/loginStore';
import { ref, computed } from 'vue';


const drawer = ref(false);
const router = useRouter();
const { isLoggedIn, logout, getRole } = useLoginStore();
const role = computed(() => getRole()); //Los elementos del menú se actualicen automáticamente cada vez que cambia el rol del usuario


const toggleDrawer = () => {
  drawer.value = !drawer.value;
}

const navigateTo = (route: string) => {
  router.push(route);
  drawer.value = false; // Cerrar el drawer después de navegar
}

const adminMenuItems = [
  { text: 'Pacientes', icon: 'mdi-account', route: '/patients' },
  { text: 'Citas', icon: 'mdi-calendar', route: '/appointments' },
  { text: 'Historial médico', icon: 'mdi-file-document', route: '/medicalRecords' },
  { text: 'Usuarios', icon: 'mdi-account-multiple', route: '/users' },
  { text: 'Home', icon: 'mdi-account-multiple', route: '/' }
];

const userMenuItems = [ 
  { text: 'Añadir paciente', icon: 'mdi-account', route: '/add-patient' },
  { text: 'Añadir cita', icon: 'mdi-calendar-plus', route: '/add-appointment' }
];
</script>


<template>
  <v-app-bar color="green darken-3" dark>
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>CliniCare</v-toolbar-title>
    <v-spacer></v-spacer> <!-- Espaciador -->
    <div v-if="isLoggedIn()" class="text-center">
      <v-btn icon @click="logout">
        Cerrar sesión
      </v-btn>
    </div>
    <div v-else class="text-center">
      <router-link to="/login">
        <v-btn icon>
          Iniciar sesión
        </v-btn>
      </router-link>
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <template v-if="isLoggedIn() && role === 'admin'">
        <v-list-item v-for="(item, index) in adminMenuItems" :key="index" @click="navigateTo(item.route)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </template>
      <template v-else-if="isLoggedIn() && role === 'user'">
        <v-list-item v-for="(item, index) in userMenuItems" :key="index" @click="navigateTo(item.route)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>


<style scoped>

</style>
