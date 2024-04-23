import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { Patient } from '@/core/patient';

export const usePatientStore = defineStore('patients', () => {
    const patients = reactive<Patient[]>([]);

    async function fetchAll() {
        try {
            const response = await fetch('https://localhost:7113/Patients');
            const patientsInfo = await response.json();

            console.log('Data received:', patientsInfo);
            patients.splice(0, patients.length, ...patientsInfo); // Actualiza el array reactivo

        } catch (error) {
            console.error('Error fetching patients: ', error);
        }
    }

    return {
        patients,
        fetchAll
    };
});




