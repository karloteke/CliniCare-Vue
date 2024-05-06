<script setup lang="ts">
import { useAppointmentStore } from '@/stores/appointmentStore';
import { ref } from 'vue';

const successAlert = ref(false); 
const { addAppointment } = useAppointmentStore();

const appointmentData = ref({
  area: '',
  medicalName: '',
  date: '',
  time: '',
  isUrgent: false,
});

let patientDni = '';
const handleSubmit = async () => {
  if (!appointmentData.value.area || !appointmentData.value.medicalName || !appointmentData.value.date || !appointmentData.value.time || !patientDni) {
    alert('Por favor, complete todos los campos.');
    return; 
  }

  const formattedDate = new Date(appointmentData.value.date).toLocaleDateString('en-GB');
  const timeParts = appointmentData.value.time.split(':');
  const formattedTime = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}`;


  const appointment = {
    id: 0, 
    createdAt: new Date().toISOString(), 
    area: appointmentData.value.area,
    medicalName: appointmentData.value.medicalName,
    date: formattedDate,
    time: formattedTime,
    isUrgent: appointmentData.value.isUrgent,
    patientDni: patientDni 
  };

  await addAppointment(appointment, patientDni); 
  appointmentData.value = { area: '', medicalName: '', date: '', time: '', isUrgent: false };
  
  // Mostrar el alerta de éxito
  successAlert.value = true;

  setTimeout(() => {
    successAlert.value = false;
  }, 2000);
};
</script>


<template>
 <div class="container-form">
    <v-sheet class="mx-auto" width="300">
      <h2 class="text-center mb-3"> Crear nueva cita</h2>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="appointmentData.area"
          placeholder="Área"
          required
        ></v-text-field>

        <v-text-field
          v-model="appointmentData.medicalName"
          placeholder="Nombre del médico"
          required
        ></v-text-field>

        <v-text-field
          v-model="appointmentData.date"
          label="Fecha"
          type="date"
          required
        ></v-text-field>

        <v-text-field
          v-model="appointmentData.time"
          label="Hora (formato: hh:mm)"
          type="text"
          required
        ></v-text-field>

        <v-checkbox
          v-model="appointmentData.isUrgent"
          label="¿Es urgente?"
        ></v-checkbox>

        <v-text-field
          v-model="patientDni"
          placeholder="DNI del paciente"
          required
        ></v-text-field>

        <v-btn class="mt-2" type="submit" block color="black">Crear cita</v-btn>
      </v-form>
    </v-sheet>
  </div>

  <!-- v-alert para mostrar mensaje de éxito -->
  <v-alert v-if="successAlert" v-model="successAlert" type="success" dismissible style="max-width: 300px;">
      Cita creada correctamente.
  </v-alert>
  </template>
  
    
  <style scoped>
    .container-form{
      padding: 40px;
      margin-top: 40px;
      display: flex;
      justify-content: center;
    }

    .v-alert {
      position: absolute;
      top: 50%;
      left: 50%; 
      transform: translate(-50%, -50%); 
    }
  </style> 