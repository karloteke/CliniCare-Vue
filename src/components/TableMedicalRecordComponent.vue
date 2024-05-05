<script setup lang="ts">
import { useMedicalRecordStore } from '@/stores/medicalRecordStore';
import router from '@/router';
import { ref, computed } from 'vue';

const { medicalRecords, deleteMedicalRecord } = useMedicalRecordStore();
const pageSize = 5; // Cantidad de historial médico por página
const currentPage = ref(1);

const handleAddMedicalRecord = () => {
  // Redirigir a la página de creación de pacientes
  router.push('/add-medicalRecord');
};

// Calcula el número total de páginas
const totalPages = computed(() => Math.ceil(medicalRecords.length / pageSize));

// Función para obtener las citas de la página actual
const paginatedMedicalRecords = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return medicalRecords.slice(startIndex, endIndex);
});

// Función para cambiar de página
const changePage = (page: number) => {
  currentPage.value = page;
};

</script>

<template>
  <div class="container">
    <div class="table-scroll">
      <div class="button-container">
        <v-btn @click="handleAddMedicalRecord" color="green" class="design-btn">
          <v-icon>mdi-account-plus</v-icon> Agregar Historial médico
        </v-btn>
      </div>
      <v-table>
        <thead>
          <tr>
            <th class="text-design">Id</th>
            <th class="text-design">Fecha creación</th>
            <th class="text-design">Nombre médico</th>
            <th class="text-design">Tratamiento</th>
            <th class="text-design">Coste tratamiento</th>
            <th class="text-design">Notas</th>
            <th class="text-design">DNI del paciente</th>
            <th class="text-design">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="medicalRecord in paginatedMedicalRecords" :key="medicalRecord.id">
            <td class="text-center">{{ medicalRecord.id }}</td>
            <td class="text-center">{{ medicalRecord.createdAt }}</td>
            <td class="text-center">{{ medicalRecord.doctorName }}</td>
            <td class="text-center">{{ medicalRecord.treatment }}</td>
            <td class="text-center">{{ medicalRecord.treatmentCost }}</td>
            <td class="text-center">{{ medicalRecord.notes }}</td>
            <td class="text-center">{{ medicalRecord.patientDni }}</td>
            <td class="d-flex justify-center align-center">
              <v-icon @click="deleteMedicalRecord(medicalRecord.id)">mdi-delete</v-icon>
              <!-- <v-icon @click="editUser(user.id)">mdi-pencil</v-icon> -->
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
</template>


<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-right: 40px;
    margin-left: 40px;
  }

  .button-container {
    padding-bottom: 40px;
  }

  .design-btn {
    width: 273px;
    height: 40px;
  }

  .text-design {
    font-weight: bold;
    color: green;
    font-size: 20px;
    text-align: center;
  }

  .table-scroll {
    overflow-x: auto; /* Scroll horizontal */
  }

  .pagination-container {
    margin-top: 20px;
  }

  .text-center {
    text-align: center;
  }
</style>