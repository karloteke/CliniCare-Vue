<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';


const { addUser } = useUserStore();

const userData = ref({
  username: '',
  email: '',
  password: ''
});

const handleSubmit = async () => {
  await addUser(userData.value);
  userData.value = { username: '', email: '', password: '' };
};
</script>


<template>
  <div class="container-form">
    <v-sheet class="mx-auto" width="300">
    <h2 class="text-center mb-4">Crear Nuevo Usuario</h2>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="userData.username"
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

      <v-btn class="mt-2" type="submit" block color="green">Crear usuario</v-btn>
    </v-form>
  </v-sheet>
  </div>

</template>

  
<style scoped>
  .container-form{
    padding: 40px;
    margin-top: 115px;
    display: flex;
    justify-content: center;
  }
</style> 