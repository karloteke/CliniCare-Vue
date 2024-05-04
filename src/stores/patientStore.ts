import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { Patient } from '@/core/patient';
import { useLoginStore } from '@/stores/loginStore';

export const usePatientStore = defineStore('patients', () => {
    const patients = reactive<Patient[]>([]);
    const { getRole, getToken } = useLoginStore();


    async function fetchAll() {
      try {
          const role = getRole(); 
          if (role !== 'admin') {
              throw new Error('No tienes permiso para ver la lista de usuarios');
          }
          const token = getToken();
          const response = await fetch('https://clinicare.azurewebsites.net/Patients', {
              headers: {
                  'Authorization': `Bearer ${token}`, 
              },
          });
          
          if (!response.ok) {
              throw new Error('No se pudo obtener la lista de pacientes');
          }
          
          const patientsInfo = await response.json();
          console.log('Data received:', patientsInfo);
          patients.splice(0, patients.length, ...patientsInfo); // Actualiza el array reactivo

      } catch (error) {
          console.error('Error fetching patients: ', error);
      }
    }

    async function addPatient(newPatient: Patient) {
        try {
            const token = getToken();
            const response = await fetch('https://clinicare.azurewebsites.net/Patients', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPatient)
            });

            if (response.ok) {
                const createdPatient = await response.json();
                console.log('Paciente añadido satisfactoriamente:', createdPatient);
                
                fetchAll();  // Actualizar la lista de pacientes después de agregar el nuevo usuario
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
          const token = getToken();
          const response = await fetch(`https://clinicare.azurewebsites.net/Patients/${patientId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
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

    function findPatientByDni(dni: string) {
      return patients.find(patient => patient.dni === dni);
    }

    return {
        patients,
        addPatient,
        deletePatient,
        fetchAll,
        findPatientByDni
    };
});




