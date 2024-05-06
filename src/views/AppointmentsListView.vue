<script setup lang="ts">
import { useAppointmentStore } from '@/stores/appointmentStore';
import TableAppointmentComponent from '@/components/TableAppointmentComponent.vue';

const { fetchAll } = useAppointmentStore(); 

fetchAll();
</script>

<template>
  <div>
    <TableAppointmentComponent></TableAppointmentComponent>
  </div>
</template>
