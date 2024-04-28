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

    async function addAppointment(newAppointment: Appointment, patientDni: string) {
        try {
            const response = await fetch(`https://localhost:7113/Appointments?patientDni=${patientDni}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAppointment)
            });
    
            if (response.ok) {
                const createdAppointment = await response.json();
                console.log('Cita añadida correctamente:', createdAppointment);
                // Actualizar la lista de citas después de agregar la nueva cita
                fetchAll();
            } else {
                const errorMessage = await response.text();
                console.error('Fallo al añadir la cita:', errorMessage);
            }
        } catch (error) {
            console.error('Error al añadir la cita:', error);
        }
    }

    async function deleteAppointment(appointmentId: number) {
        try {
          const response = await fetch(`https://localhost:7113/Appointments/${appointmentId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            console.log(`Cita con Id ${appointmentId} borrada correctamente`);
            // Actualizar la lista de citas después de borrar el usuario
            fetchAll();
          } else {
            const errorMessage = await response.text();
            console.error('Fallo al borrar la cita:', errorMessage);
          }
        } catch (error) {
          console.error('Error al borrar la cita:', error);
        }
      }
    
    

    return {
        appointments,
        addAppointment,
        deleteAppointment,
        fetchAll
    };
});

