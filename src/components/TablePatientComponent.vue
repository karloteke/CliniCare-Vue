<script setup lang = "ts">
import { usePatientStore } from '@/stores/patientStore'; 
import { useRouter } from 'vue-router';

const { patients, deletePatient } = usePatientStore();
const router = useRouter();

const handleAddPatient = () => {
  // Redirigir a la página de creación de pacientes
  router.push('/add-patient');
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
          <tr v-for="patient in patients" :key="patient.id">
            <td>{{ patient.id }}</td>
            <td>{{ patient.name }}</td>
            <td>{{ patient.lastName }}</td>
            <td>{{ patient.address }}</td>
            <td>{{ patient.dni }}</td>
            <td>{{ patient.phone }}</td>
            <td  class="d-flex justify-center align-center">
                <v-icon @click="deletePatient(patient.id)">mdi-delete</v-icon>
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

