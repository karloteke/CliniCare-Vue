<script setup lang="ts">
import { useMedicalRecordStore } from '@/stores/medicalRecordStore';
import TableMedicalRecordComponent from '@/components/TableMedicalRecordComponent.vue';

const { fetchAll } = useMedicalRecordStore(); 

fetchAll();
</script>

<template>
  <TableMedicalRecordComponent></TableMedicalRecordComponent>
</template>



