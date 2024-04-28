<script setup lang="ts">
// import type { Appointment } from '@/core/appointment';
import { useAppointmentStore } from '@/stores/appointmentStore';
import { ref } from 'vue';

const { addAppointment } = useAppointmentStore();


const appointmentData = ref({
  area: '',
  medicalName: '',
  date: '',
  time: '',
  isUrgent: false
});

let patientDni = '';
const handleSubmit = async () => {
  // Formatea la fecha con el formato del backend
  const formattedDate = new Date(appointmentData.value.date).toLocaleDateString('en-GB');
  //Formatea la hora con el formato del backend
  const timeParts = appointmentData.value.time.split(':');
  const formattedTime = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}`;

  const appointment = {
    id: 0, 
    createdAt: new Date().toISOString(), 
    area: appointmentData.value.area,
    medicalName: appointmentData.value.medicalName,
    date: formattedDate,
    time: formattedTime,//appointmentData.value.time,
    isUrgent: appointmentData.value.isUrgent,
    patientDni: patientDni //Pasamos Dni paciente a la cita
  };

  await addAppointment(appointment, patientDni); // Pasarle el Dni del paciente a la cita
  appointmentData.value = { area: '', medicalName: '', date: '', time: '', isUrgent: false }; // Limpiar los datos del formulario
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
          dense
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

        <v-btn class="mt-2" type="submit" block color="green">Crear cita</v-btn>
      </v-form>
    </v-sheet>
  </div>
  </template>
  
    
  <style scoped>
    .container-form{
      padding: 40px;
      margin-top: 40px;
      display: flex;
      justify-content: center;
    }
  </style> 