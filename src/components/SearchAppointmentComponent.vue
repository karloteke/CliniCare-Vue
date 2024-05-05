<script setup lang="ts">
import { useAppointmentStore } from '@/stores/appointmentStore';
import { ref, onMounted } from 'vue';

const { fetchAppointmentsByDni } = useAppointmentStore();
const { appointments } = useAppointmentStore();
const patientDni = ref('');


const handleSearch = async () => { 
  if (patientDni.value.trim() !== '') {
    await fetchAppointmentsByDni(patientDni.value); 
  } else {
    alert('Por favor, ingrese el DNI del paciente');
  }
};

onMounted(() => {
  appointments.length = 0; 
});
</script>


<template>
  <div class="container-form">
    <v-sheet class="mx-auto" width="150">
      <v-form @submit.prevent="handleSearch">
        <v-text-field
          v-model="patientDni"
          placeholder="DNI del paciente"
          required
        ></v-text-field>
        <v-btn type="submit" color="green">Buscar</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped>
  .container-form{
    display: inline-block;
    padding-left: 30px;
    padding-top: 80px;
    height: 33vh;
  }
</style> 


