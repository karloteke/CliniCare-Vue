<script setup lang="ts">
import { ref } from 'vue';
import { usePatientStore } from '@/stores/patientStore';


const { addPatient } = usePatientStore();

const patientData = ref({
  name: '',
  lastName: '',
  address: '',
  dni:'',
  phone:''

});

const handleSubmit = async () => {
  await addPatient(patientData.value);
  patientData.value = { name: '', lastName: '', address: '', dni: '', phone: '' };
};
</script>


<template>
  <div class="container-form">
    <v-sheet class="mx-auto" width="300">
    <h2 class="text-center mb-4">Crear nuevo paciente</h2>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="patientData.name"
        placeholder="Nombre Paciente"
 
        required
      ></v-text-field>

      <v-text-field
        v-model="patientData.lastName"
        placeholder="Apellido"

        required
      ></v-text-field>

      <v-text-field
        v-model="patientData.address"
        placeholder="Dirección"

        required
      ></v-text-field>

      <v-text-field
        v-model="patientData.dni"
        placeholder="DNI"

        required
      ></v-text-field>

      <v-text-field
        v-model="patientData.phone"
        placeholder="Teléfono"

        required
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block color="green">Crear Paciente</v-btn>
    </v-form>
  </v-sheet>
  </div>

</template>

  
<style scoped>
  .container-form{
    padding: 40px;
    margin-top: 75px;
    display: flex;
    justify-content: center;
  }
</style> 