<script setup lang = "ts">
import { usePatientStore } from '@/stores/patientStore'; 

const { patients } = usePatientStore();
</script>



<template>
    <div class="table-container">
    <v-table >
      <thead>
        <tr>
          <th class="text-design">
            Id
          </th>
          <th class="text-design">
            Nombre
          </th>
          <th class="text-design">
            Apellido
          </th>
          <th class="text-design">
            Dirección
          </th>
          <th class="text-design">
            DNI
          </th>
          <th class="text-design">
            Teléfono
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.id }}</td>
          <td>{{ patient.name }}</td>
          <td>{{ patient.lastName }}</td>
          <td>{{ patient.address }}</td>
          <td>{{ patient.dni }}</td>
          <td>{{ patient.phone }}</td>
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
    color: green;
    font-size: 20px;
  }
</style>

