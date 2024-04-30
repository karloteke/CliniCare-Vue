import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { User } from '@/core/user';
import { useLoginStore } from '@/stores/loginStore';


export const useUserStore = defineStore('users', () => {
    const users = reactive<User[]>([]);
    const { getRole, getToken } = useLoginStore();

    async function fetchAll() {
      try {
          const role = getRole();
          if (role !== 'admin') {
            throw new Error('No tienes permiso para ver la lista de usuarios');
          }
          const token = getToken();
          const response = await fetch('https://localhost:7113/Users', {
            headers: {
              'Authorization': `Bearer ${token}`, // Incluir el token en las cabeceras de autorización
            },
          });
          
          if (!response.ok) {
            throw new Error('No se pudo obtener la lista de usuarios');
          }
          
          const usersInfo = await response.json();
          console.log('Data received:', usersInfo);
          users.splice(0, users.length, ...usersInfo); // Actualiza el array reactivo
      
        } catch (error) {
          console.error('Error fetching users: ', error);
        }
    }
    
    async function addUser(newUser: User) {
        try {
            const token = getToken(); // Obtener el token de autorización
            const response = await fetch('https://localhost:7113/Users', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                const createdUser = await response.json();
                console.log('Usuario añadido satisfactoriamente:', createdUser);
               
                fetchAll();  // Actualizar la lista de usuarios después de agregar el nuevo usuario
            } else {
                const errorMessage = await response.text();
                console.error('Fallo al añadir el usuario:', errorMessage);
            }
        } catch (error) {
            console.error('Error al añadir usuario:', error);
        }
    }

    async function deleteUser(userId: number) {
        try {
          const token = getToken();
          const response = await fetch(`https://localhost:7113/Users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            console.log(`Usuario con ID ${userId} borrado satisfactoriamente`);
            // Actualizar la lista de usuarios después de borrar el usuario
            fetchAll();
          } else {
            const errorMessage = await response.text();
            console.error('Fallo al borrar el usuario:', errorMessage);
          }
        } catch (error) {
          console.error('Error al borrar el usuario:', error);
        }
      }
      
    
    return {
        users,
        addUser,
        deleteUser,
        fetchAll,
        getRole
    };
});
