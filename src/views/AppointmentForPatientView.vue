<script setup lang="ts">
import { useAppointmentStore } from '@/stores/appointmentStore';
import SearchAppointmentComponent from '@/components/SearchAppointmentComponent.vue';
import TableAppointmentPatientComponent from '@/components/TableAppointmentPatientComponent.vue';
import { ref, watch } from 'vue';

const { fetchAppointmentsForPatients } = useAppointmentStore();
const patientDni = ref('');

// Llama a fechtAppointmentForPatients cada vez que el valor del dni cambia
watch(patientDni, (newDni) => {
  fetchAppointmentsForPatients(newDni);
});
</script>

<template>
  <div>
    <SearchAppointmentComponent></SearchAppointmentComponent>
    <TableAppointmentPatientComponent></TableAppointmentPatientComponent>
  </div>
</template>
