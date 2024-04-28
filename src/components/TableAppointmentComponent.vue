<script setup lang="ts">
import { useAppointmentStore } from '@/stores/appointmentStore';
import { useRouter } from 'vue-router';

const { appointments, deleteAppointment } = useAppointmentStore();
const router = useRouter();

const handleAddAppointment = () => {
  // Redirigir a la página de creación de citas
  router.push('/add-appointment');
};
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="button-container">
          <v-btn @click="handleAddAppointment" color="green">
              <v-icon>mdi-calendar</v-icon> Agregar Cita
          </v-btn>
      </div>
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
                <th class="text-design">Acciones</th>
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
              <td>
                <v-icon @click="deleteAppointment(appointment.id)">mdi-delete</v-icon>
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


