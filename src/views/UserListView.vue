<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'; 

const { users, fetchAll} = useUserStore();
fetchAll();

</script>

<template>
   <div class="table-container">
    <v-table>
      <thead>
        <tr>
            <th class="text-design">
                Id
            </th>
            <th class="text-design">
                Nombre usuario
            </th>
            <th class="text-design">
                Email
            </th>
            <th class="text-design">
                Role
            </th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>

        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped>
  .table-container {
    padding: 40px;
    margin-top: 115px;
    display: flex;
    justify-content: center;

  }

  .text-design {
    font-weight: bold;
    color:green;
    font-size: 20px;
  }
  
</style>


