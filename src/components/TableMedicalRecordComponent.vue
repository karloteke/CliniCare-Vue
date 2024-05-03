<script setup lang="ts">
import { useMedicalRecordStore } from '@/stores/medicalRecordStore';
import router from '@/router';

const { medicalRecords, deleteMedicalRecord } = useMedicalRecordStore();

const handleAddMedicalRecord = () => {
  // Redirigir a la página de creación de pacientes
  router.push('/add-medicalRecord');
};

</script>

<template>
     <div class="container">
        <div class="content">
            <div class="button-container">
                <v-btn @click="handleAddMedicalRecord" color="green">
                    <v-icon>mdi-account-plus</v-icon> Agregar Historial médico
                </v-btn>
            </div>
            <div class="table-container">
            <v-table >
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
                    <tr v-for="medicalRecord in medicalRecords" :key="medicalRecord.id">
                    <td>{{ medicalRecord.id }}</td>
                    <td>{{ medicalRecord.createdAt }}</td>
                    <td>{{ medicalRecord.doctorName }}</td>
                    <td>{{ medicalRecord.treatment }}</td>
                    <td>{{ medicalRecord.treatmentCost }}</td>
                    <td>{{ medicalRecord.notes }}</td>
                    <td>{{ medicalRecord.patientDni }}</td>
                    <td  class="d-flex justify-center align-center">
                        <v-icon @click="deleteMedicalRecord(medicalRecord.id)">mdi-delete</v-icon>
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