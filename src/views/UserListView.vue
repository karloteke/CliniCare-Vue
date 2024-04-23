<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'; 
import TableUserComponent from '@/components/TableUserComponent.vue';

const { fetchAll} = useUserStore();
fetchAll();

</script>

<template>
  <div>
    <TableUserComponent></TableUserComponent>
  </div>
</template> 


