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

    async function addPatient(newPatient: Patient) {
        try {
            const response = await fetch('https://localhost:7113/Patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPatient)
            });

            if (response.ok) {
                const createdPatient = await response.json();
                console.log('Paciente añadido satisfactoriamente:', createdPatient);
                // Actualizar la lista de pacientes después de agregar el nuevo usuario
                fetchAll();
            } else {
                const errorMessage = await response.text();
                console.error('Fallo al añadir el paciente:', errorMessage);
            }
        } catch (error) {
            console.error('Error al añadir el paciente:', error);
        }
    }

    async function deletePatient(patientId: number) {
        try {
          const response = await fetch(`https://localhost:7113/Patients/${patientId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            console.log(`Paciente con ID ${patientId} borrado satisfactoriamente`);
            // Actualizar la lista de usuarios después de borrar el usuario
            fetchAll();
          } else {
            const errorMessage = await response.text();
            console.error('Fallo al borrar el paciente:', errorMessage);
          }
        } catch (error) {
          console.error('Error al borrar el paciente:', error);
        }
      }

    return {
        patients,
        addPatient,
        deletePatient,
        fetchAll
    };
});




