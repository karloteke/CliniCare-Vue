<script setup lang="ts">
import { useMedicalRecordStore } from '@/stores/medicalRecordStore';
import { ref } from 'vue';

const successAlert = ref(false); 
const { addMedicalRecord } = useMedicalRecordStore();

const medicalRecordData = ref({
  doctorName: '',
  treatment: '',
  treatmentCost: 0,
  notes: '',
});

let patientDni = '';
const handleSubmit = async () => {
  if (!medicalRecordData.value.doctorName || !medicalRecordData.value.treatment || !medicalRecordData.value.treatmentCost || !medicalRecordData.value.notes || !patientDni) {
    alert('Por favor, complete todos los campos.');
    return; 
  }

  const medicalRecord = {
    id: 0,
    createdAt: new Date().toISOString(),
    doctorName: medicalRecordData.value.doctorName,
    treatment: medicalRecordData.value.treatment,
    treatmentCost: medicalRecordData.value.treatmentCost,
    notes: medicalRecordData.value.notes,
    patientDni: patientDni
  };

  await addMedicalRecord(medicalRecord, patientDni);
  medicalRecordData.value = {doctorName: '',treatment: '',treatmentCost: 0,notes: '',};

  // Mostrar el alerta de éxito
  successAlert.value = true;

  setTimeout(() => {
    successAlert.value = false;
  }, 2000);
};
</script>


<template>
  <div class="container-form">
    <v-sheet class="mx-auto" width="300">
      <h2 class="text-center mb-3">Agregar nuevo registro médico</h2>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="medicalRecordData.doctorName"
          placeholder="Nombre del doctor"
          required
        ></v-text-field>

        <v-text-field
          v-model="medicalRecordData.treatment"
          placeholder="Tratamiento"
          required
        ></v-text-field>

        <v-text-field
          v-model.number="medicalRecordData.treatmentCost"
          placeholder="Costo del tratamiento"
          type="number"
        ></v-text-field>

        <v-textarea
          v-model="medicalRecordData.notes"
          placeholder="Notas adicionales"
          rows="3"
        ></v-textarea>

        <v-text-field
          v-model="patientDni"
          placeholder="DNI del paciente"
          required
        ></v-text-field>

        <v-btn class="mt-2" type="submit" block color="black">Agregar registro</v-btn>
      </v-form>
    </v-sheet>
  </div>

  <!-- v-alert para mostrar mensaje de éxito -->
  <v-alert v-model="successAlert" type="success" dismissible style="max-width: 300px;">
      Historial médico creado correctamente.
  </v-alert>
</template>


<style scoped>
.container-form {
  padding: 40px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.v-alert {
  position: absolute;
  top: 50%;
  left: 50%; 
  transform: translate(-50%, -50%); 
}
</style>
