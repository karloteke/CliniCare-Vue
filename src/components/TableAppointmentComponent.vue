<script setup lang="ts">
import { useAppointmentStore } from '@/stores/appointmentStore';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const { appointments, deleteAppointment } = useAppointmentStore();
const router = useRouter();
const pageSize = 5; // Cantidad de citas por página
const currentPage = ref(1);

const handleAddAppointment = () => {
  // Redirigir a la página de creación de citas
  router.push('/add-appointment');
};

// Calcula el número total de páginas
const totalPages = computed(() => Math.ceil(appointments.length / pageSize));

// Función para obtener las citas de la página actual
const paginatedAppointments = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return appointments.slice(startIndex, endIndex);
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
          <v-btn @click="handleAddAppointment" color="green" class="design-btn">
              <v-icon>mdi-calendar</v-icon> Agregar Cita
          </v-btn>
      </div>
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
              <tr v-for="appointment in paginatedAppointments" :key="appointment.id">
              <td class="text-center">{{ appointment.id }}</td>
              <td class="text-center">{{ appointment.createdAt }}</td>
              <td class="text-center">{{ appointment.area }}</td>
              <td class="text-center">{{ appointment.medicalName }}</td>
              <td class="text-center">{{ appointment.date }}</td>
              <td class="text-center">{{ appointment.time }}</td>
              <td class="text-center">{{ appointment.isUrgent ? 'Sí' : 'No' }}</td>
              <td class="text-center">{{ appointment.patientDni }}</td>
              <td class="d-flex justify-center align-center">
                <v-icon @click="deleteAppointment(appointment.id)">mdi-delete</v-icon>
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
    width: 150px;
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


