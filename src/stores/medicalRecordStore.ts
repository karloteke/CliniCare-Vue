
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { MedicalRecord } from '@/core/medicalRecord';
import { useLoginStore } from '@/stores/loginStore';

export const useMedicalRecordStore = defineStore('medicalRecord', () => {
    const medicalRecords = reactive<MedicalRecord[]>([]);
    const { getRole, getToken } = useLoginStore();

    async function fetchAll() {
        try {
            const role = getRole();
            if (role !== 'admin') {
              throw new Error('No tienes permiso para ver el historial médico');
            }
            const token = getToken();
            const response = await fetch('https://localhost:7113/MedicalRecord', {
              headers: {
                'Authorization': `Bearer ${token}`, 
              },
            });
            
            if (!response.ok) {
              throw new Error('No se pudo obtener el historial médico');
            }
            
            const medicalRecordsInfo = await response.json();
            console.log('Data received:', medicalRecordsInfo);
            medicalRecords.splice(0, medicalRecords.length, ...medicalRecordsInfo); // Actualiza el array reactivo
        } catch (error) {
            console.error('Error fetching medical records: ', error);
        }
    }

    async function addMedicalRecord(newMedicalRecord: MedicalRecord, patientDni: string) {
      try {
          const token = getToken();
          const response = await fetch(`https://localhost:7113/MedicalRecord?patientDni=${patientDni}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newMedicalRecord)
          });

          if (response.ok) {
              const createdMedicalRecord = await response.json();
              console.log('Historial médico añadido satisfactoriamente:', createdMedicalRecord);
             
              fetchAll();  // Actualizar el historial después de agregar el historial médico
          } else {
              const errorMessage = await response.text();
              console.error('Fallo al añadir el historial médico:', errorMessage);
          }
      } catch (error) {
          console.error('Error al añadir el historial médico:', error);
      }
  }

  async function deleteMedicalRecord(medicalRecordId: number) {
      try {
        const token = getToken();
        const response = await fetch(`https://localhost:7113/MedicalRecord/${medicalRecordId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          console.log(`Historial médico con ID ${medicalRecordId} borrado satisfactoriamente`);
          fetchAll();

        } else {
          const errorMessage = await response.text();
          console.error('Fallo al borrar el historial médico:', errorMessage);
        }
      } catch (error) {
        console.error('Error al borrar el historial médico:', error);
      }
    }
    
    return {
        medicalRecords,
        addMedicalRecord,
        deleteMedicalRecord,
        fetchAll
    };
});

