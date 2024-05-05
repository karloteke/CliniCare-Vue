<script setup lang="ts">
import { ref } from 'vue';
import { usePatientStore } from '@/stores/patientStore';

const successAlert = ref(false); 
const { addPatient, findPatientByDni } = usePatientStore();

const patientData = ref({
  name: '',
  lastName: '',
  address: '',
  dni:'',
  phone:''

});

const handleSubmit = async () => {
  if (!patientData.value.name || !patientData.value.lastName || !patientData.value.address || !patientData.value.dni || !patientData.value.phone) {
    alert('Los campos no pueden estar vacios.');
    return; 
  }

  const existingPatient = findPatientByDni(patientData.value.dni);
  if (existingPatient !== undefined) {
    alert('El paciente con este DNI ya existe.');
    return; 
  }

  await addPatient({
    id: 0, 
    name: patientData.value.name,
    lastName: patientData.value.lastName,
    address: patientData.value.address,
    dni: patientData.value.dni,
    phone: patientData.value.phone,
  });
  
  // Limpiar los campos después de agregar el paciente
  patientData.value = {name: '',lastName: '',address: '',dni: '',phone: ''};

  // Mostrar el alerta de éxito
  successAlert.value = true;

  // Ocultar el alerta en 2 segundos
  setTimeout(() => {
    successAlert.value = false;
  }, 2000);
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

      <v-btn class="mt-2" type="submit" block color="black">Crear Paciente</v-btn>
    </v-form>
  </v-sheet>
  </div>

   <!-- Componente v-alert para mostrar mensaje de éxito -->
   <v-alert v-model="successAlert" type="success" dismissible style="max-width: 300px;">
      Paciente creado correctamente.
  </v-alert>

</template>

  
<style scoped>
  .container-form{
    padding: 40px;
    margin-top: 75px;
    display: flex;
    justify-content: center;
    padding: 40px;
    margin-top: 75px;
    position: relative;
  }

  .v-alert {
    position: absolute;
    top: 50%;
    left: 50%; 
    transform: translate(-50%, -50%); 
}
</style> 