import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { Appointment } from '@/core/appointment';
import { useLoginStore } from '@/stores/loginStore';


export const useAppointmentStore = defineStore('appointment', () => {
    const appointments = reactive<Appointment[]>([]);
    const { getRole, getToken } = useLoginStore();

    async function fetchAll() {
        try {
            const role = getRole();
            if (role !== 'admin') {
              throw new Error('No tienes permiso para ver la lista de citas');
            }
            const token = getToken();
            const response = await fetch('https://localhost:7113/Appointment', {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            });
            
            if (!response.ok) {
              throw new Error('No se pudo obtener la lista de citas');
            }
            
            const appointmentsInfo = await response.json();
            console.log('Data received:', appointmentsInfo);
            appointments.splice(0, appointments.length, ...appointmentsInfo); // Actualiza el array reactivo

        } catch (error) {
            console.error('Error fetching appointment: ', error);
        }
    }

    async function addAppointment(newAppointment: Appointment, patientDni: string) {
        try {
            const token = getToken();
            const response = await fetch(`https://localhost:7113/Appointment?patientDni=${patientDni}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAppointment)
            });
    
            if (response.ok) {
                const createdAppointment = await response.json();
                console.log('Cita añadida correctamente:', createdAppointment);
              
                fetchAll();
            } else {
                const errorMessage = await response.text();
                console.error('Fallo al añadir la cita:', errorMessage);
            }
        } catch (error) {
            console.error('Error al añadir la cita:', error);
        }
    }

    async function fetchAppointmentsByDni(patientDni: string) {
        try {
            const token = getToken();
            const response = await fetch(`https://localhost:7113/Appointment/SearchByDni?PatientDni=${patientDni}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
          
            if (response.ok) {
                const appointmentsByDniInfo = await response.json();
                console.log('Data received:', appointmentsByDniInfo);
                appointments.splice(0, appointments.length, ...appointmentsByDniInfo); // Actualiza el array reactivo
            } else {
                console.error('Error fetching appointments for patient:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching appointments for patient:', error);
        }
    }


    async function deleteAppointment(appointmentId: number) {
        try {
            const token = getToken();
            const response = await fetch(`https://localhost:7113/Appointment/${appointmentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            console.log(`Cita con Id ${appointmentId} borrada correctamente`);
   
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
        fetchAppointmentsByDni,
        deleteAppointment,
        fetchAll
    };
});

