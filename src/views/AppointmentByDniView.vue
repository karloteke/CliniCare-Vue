<script setup lang="ts">
import { useAppointmentStore } from '@/stores/appointmentStore';
import SearchAppointmentComponent from '@/components/SearchAppointmentComponent.vue';
import TableAppointmentByDniComponent from '@/components/TableAppointmentByDniComponent.vue';
import { ref, watch } from 'vue';

const { fetchAppointmentsByDni } = useAppointmentStore();
const patientDni = ref('');

// Llama a fechtAppointmentByDni cada vez que el valor del dni cambia
watch(patientDni, (newDni) => {
  fetchAppointmentsByDni(newDni);
});
</script>

<template>
  <div>
    <SearchAppointmentComponent></SearchAppointmentComponent>
    <TableAppointmentByDniComponent></TableAppointmentByDniComponent>
  </div>
</template>
