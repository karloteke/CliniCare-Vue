import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { Appointment } from '@/core/appointment';

export const useAppointmentStore = defineStore('appointments', () => {
    const appointments = reactive<Appointment[]>([]);

    async function fetchAll() {
        try {
            const response = await fetch('https://localhost:7113/Appointments');
            const appointmentsInfo = await response.json();

            console.log('Data received:', appointmentsInfo);
            appointments.splice(0, appointments.length, ...appointmentsInfo); // Actualiza el array reactivo
        } catch (error) {
            console.error('Error fetching appointment: ', error);
        }
    }

    return {
        appointments,
        fetchAll
    };
});

