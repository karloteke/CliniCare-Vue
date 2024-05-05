<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'; 
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const { users,  deleteUser } = useUserStore();
const router = useRouter();
const pageSize = 5; // Cantidad de usuarios por página
const currentPage = ref(1);

const handleAddUser = () => {
  // Redirigir a la página de creación de usuario
  router.push('/add-user');
};

// Calcula el número total de páginas
const totalPages = computed(() => Math.ceil(users.length / pageSize));

// Función para obtener los usuarios de la página actual
const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return users.slice(startIndex, endIndex);
});

// Función para cambiar de página
const changePage = (page: number) => {
  currentPage.value = page;
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
                <tr v-for="user in paginatedUsers" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.userName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td  class="d-flex justify-center align-center">
                      <v-icon @click="deleteUser(user.id)">mdi-delete</v-icon>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <div class="pagination-container">
          <v-pagination
              v-model="currentPage"
              :length="totalPages"
              @input="changePage"
            ></v-pagination>
      </div>
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

  .pagination-container {
    margin-top: 20px;
  }
</style>
  
