<script setup lang="ts">
import { useAppointmentStore } from '@/stores/appointmentStore';

const { appointments } = useAppointmentStore();

</script>

<template>
    <div class="table-container">
        <v-table>
            <thead>
                <tr>
                <th class="text-design">Id</th>
                <th class="text-design">Fecha de creación</th>
                <th class="text-design">Área</th>
                <th class="text-design">Nombre médico</th>
                <th class="text-design">Fecha cita</th>
                <th class="text-design">Hora cita</th>
                <th class="text-design">¿Es Urgente?</th>
                <th class="text-design">DNI del paciente</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="appointment in appointments" :key="appointment.id">
                <td>{{ appointment.id }}</td>
                <td>{{ appointment.createdAt }}</td>
                <td>{{ appointment.area }}</td>
                <td>{{ appointment.medicalName }}</td>
                <td>{{ appointment.date }}</td>
                <td>{{ appointment.time }}</td>
                <td>{{ appointment.isUrgent ? 'Sí' : 'No' }}</td>
                <td>{{ appointment.patientDni }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<style scoped>
  .table-container {
    display: flex;
    justify-content: center;
    align-items: center;
  } 

  .text-design {
    font-weight: bold;
    color: green;
    font-size: 20px;
  }
</style>


