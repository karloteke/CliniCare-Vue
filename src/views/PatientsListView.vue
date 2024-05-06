<script setup lang="ts">
import { usePatientStore } from '@/stores/patientStore';
import TablePatientComponent from '@/components/TablePatientComponent.vue';

const { fetchAll } = usePatientStore(); 
fetchAll();

</script>

<template>
  <div>
    <TablePatientComponent></TablePatientComponent>
  </div>
</template>

















