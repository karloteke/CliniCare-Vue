import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { MedicalRecord } from '@/core/medicalRecord';

export const useMedicalRecordStore = defineStore('medicalRecords', () => {
    const medicalRecords = ref<MedicalRecord[]>([]);

    async function fetchAll() {
        try {
            const response = await fetch('https://localhost:7113/MedicalRecords');
            const medicalRecordsInfo = await response.json();

            console.log('Data received:', medicalRecordsInfo);

            medicalRecords.value = medicalRecordsInfo;
        } catch (error) {
            console.error('Error fetching medical records: ', error);
        }
    }
    
    return {
        medicalRecords,
        fetchAll
    };
});

