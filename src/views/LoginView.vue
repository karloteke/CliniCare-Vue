<script setup lang="ts">
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/loginStore';
// import { fetchAllUsers } from '@/views/userListViews';

const username = ref(localStorage.getItem('username') || '');
const password = ref(localStorage.getItem('password') || '');

const { login, logout } = useLoginStore();
const router = useRouter();

async function handleLogin() {
  try {
    await login({ userName: username.value, password: password.value });
    // Guardar nombre de usuario y contraseña en localStorage
    localStorage.setItem('username', username.value);
    localStorage.setItem('password', password.value);
    router.push('/');  // Si el inicio de sesión es correcto, redirige a la página principal

  } catch (error) {
    if (error instanceof Error) {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    } else {
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  }
}

function handleLogout() {
    logout();
    localStorage.removeItem('username'); // Eliminar nombre de usuario del almacenamiento local
    localStorage.removeItem('password'); // Eliminar contraseña del almacenamiento local
    window.location.reload(); // Recargar la página después de cerrar sesión
   
}
</script>

<template>
  <v-container fluid class="login-container">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center">Iniciar sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                label="Nombre de usuario"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                required
              ></v-text-field>
              <v-btn
                color="green"
                block
                type="submit"
              >
                Iniciar sesión
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              @click="handleLogout"
            >
              Cerrar sesión
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>
  .login-container {
    padding: 20px;
    margin-top: 115px;
    width: 100%;
  }
</style>
