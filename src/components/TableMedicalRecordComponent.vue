<script setup lang="ts">
import { useMedicalRecordStore } from '@/stores/medicalRecordStore';

const { medicalRecords } = useMedicalRecordStore();
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
                Fecha creación
            </th>
            <th class="text-design">
                Nombre médico
            </th>
            <th class="text-design">
                Tratamiento
            </th>
            <th class="text-design">
                Coste tratamiento
            </th>
            <th class="text-design">
                Notas
            </th>
            <th class="text-design">
                DNI del paciente
            </th>
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