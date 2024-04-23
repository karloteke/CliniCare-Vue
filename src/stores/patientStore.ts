import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Patient } from '@/core/patient';

export const usePatientStore = defineStore('patients', () => {
    const patients = ref<Patient[]>([]);

    async function fetchAll() {
        try {
            const response = await fetch('https://localhost:7113/Patients');
            const patientsInfo = await response.json();

            console.log('Data received:', patientsInfo);

            patients.value = patientsInfo;
        } catch (error) {
            console.error('Error fetching patients: ', error);
        }
    }

    return {
        patients,
        fetchAll
    };
});




