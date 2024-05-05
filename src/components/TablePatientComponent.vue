<script setup lang = "ts">
import { usePatientStore } from '@/stores/patientStore'; 
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const { patients, deletePatient } = usePatientStore();
const router = useRouter();
const pageSize = 5; // Cantidad de pacientes por página
const currentPage = ref(1);

const handleAddPatient = () => {
  router.push('/add-patient');
};

// Calcula el número total de páginas
const totalPages = computed(() => Math.ceil(patients.length / pageSize));

// Función para obtener los pacientes de la página actual
const paginatedPatients = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return patients.slice(startIndex, endIndex);
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
          <v-btn @click="handleAddPatient" color="green">
              <v-icon>mdi-account-plus</v-icon> Agregar Paciente
          </v-btn>
      </div>
      <div class="table-container">
      <v-table >
        <thead>
          <tr>
            <th class="text-design">Id</th>
            <th class="text-design">Nombre</th>
            <th class="text-design">Apellido</th>
            <th class="text-design">Dirección</th>
            <th class="text-design">DNI</th>
            <th class="text-design">Teléfono</th>
            <th class="text-design">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in paginatedPatients" :key="patient.id">
            <td>{{ patient.id }}</td>
            <td>{{ patient.name }}</td>
            <td>{{ patient.lastName }}</td>
            <td>{{ patient.address }}</td>
            <td>{{ patient.dni }}</td>
            <td>{{ patient.phone }}</td>
            <td  class="d-flex justify-center align-center">
                <v-icon @click="deletePatient(patient.id)">mdi-delete</v-icon>
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

