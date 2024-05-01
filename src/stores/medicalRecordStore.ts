import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { MedicalRecord } from '@/core/medicalRecord';
import { useLoginStore } from '@/stores/loginStore';

export const useMedicalRecordStore = defineStore('medicalRecords', () => {
    const medicalRecords = reactive<MedicalRecord[]>([]);
    const { getRole, getToken } = useLoginStore();

    async function fetchAll() {
        try {
            const role = getRole();
            if (role !== 'admin') {
              throw new Error('No tienes permiso para ver el historial médico');
            }
            const token = getToken();
            const response = await fetch('https://clinicare.azurewebsites.net/MedicalRecords', {
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
    
    return {
        medicalRecords,
        fetchAll
    };
});

