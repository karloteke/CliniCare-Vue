<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';


const successAlert = ref(false); 
const { addUser, findUserName } = useUserStore();

const userData = ref({
  userName: '',
  email: '',
  password: ''
});

const handleSubmit = async () => {
  if (!userData.value.userName || !userData.value.email || !userData.value.password) {
    alert('Por favor, complete todos los campos.');
    return; 
  }

  const existingUserName = findUserName(userData.value.userName);
  if ( existingUserName) {
    alert('Ese nombre de usuario ya existe.');
    return; 
  }

  const newUser = {
    id: 0, 
    userName: userData.value.userName,
    email: userData.value.email,
    password: userData.value.password,
    role: 'user' 
  };
  

  await addUser(newUser);
  userData.value = { userName: '', email: '', password: '' };

   // Mostrar el alerta de éxito
   successAlert.value = true;

    setTimeout(() => {
      successAlert.value = false;
    }, 2000);
  };
</script>


<template>
  <div class="container-form">
    <v-sheet class="mx-auto" width="300">
    <h2 class="text-center mb-4">Crear Nuevo Usuario</h2>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="userData.userName"
        placeholder="Nombre usuario"
        required
      ></v-text-field>

      <v-text-field
        v-model="userData.email"
        placeholder="Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="userData.password"
        placeholder="Contraseña"
        required
        type="password"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block color="black">Crear usuario</v-btn>
    </v-form>
  </v-sheet>
  </div>

  <!-- v-alert para mostrar mensaje de éxito -->
  <v-alert v-model="successAlert" type="success" dismissible style="max-width: 300px;">
      Usuario creado correctamente.
  </v-alert>
</template>

  
<style scoped>
  .container-form{
    padding: 40px;
    margin-top: 115px;
    display: flex;
    justify-content: center;
  }

  .v-alert {
    position: absolute;
    top: 50%;
    left: 50%; 
    transform: translate(-50%, -50%); 
}
</style> 