<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'; 
import { useRouter } from 'vue-router';

const { users,  deleteUser } = useUserStore();
const router = useRouter();

const handleAddUser = () => {
  // Redirigir a la página de creación de usuario
  router.push('/add-user');
};

</script>


<template>
<div class="container">
  <div class="content">
    <div class="button-container">
        <v-btn @click="handleAddUser" color="green">
            <v-icon>mdi-account-plus</v-icon> Agregar Usuario
        </v-btn>
    </div>
    <div class="table-container">
        <v-table>
            <thead>
                <tr>
                    <th class="text-design">Id</th>
                    <th class="text-design">Nombre usuario</th>
                    <th class="text-design">Email</th>
                    <th class="text-design">Role</th>
                    <th class="text-design">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.userName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                      <v-icon @click="deleteUser(user.id)">mdi-delete</v-icon>
                      <!-- <v-icon @click="editUser(user.id)">mdi-pencil</v-icon> -->
                    </td>
                </tr>
            </tbody>
        </v-table>
      </div>
    </div>
</div>
</template>
  

  
<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .button-container {
    margin-right: 100px; 
    padding-bottom: 20px;
  }

  .table-container {
    display: flex;
    flex-direction: column;
  }

  .text-design {
    font-weight: bold;
    color: green;
    font-size: 20px;
  }
</style>
  
