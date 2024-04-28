import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { User } from '@/core/user';

export const useUserStore = defineStore('users', () => {
    const users = reactive<User[]>([]);

    async function fetchAll() {
        try {
            const response = await fetch('https://localhost:7113/Users');
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de usuarios');
            }
            const usersInfo = await response.json();
            console.log('Data received:', usersInfo);
            users.splice(0, users.length, ...usersInfo); // Actualiza el array reactivo
            // users.push(...usersInfo)

        } catch (error) {
            console.error('Error fetching users: ', error);
        }
    }

    async function addUser(newUser: User) {
        try {
            const response = await fetch('https://localhost:7113/Users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                const createdUser = await response.json();
                console.log('Usuario añadido satisfactoriamente:', createdUser);
                // Actualizar la lista de usuarios después de agregar el nuevo usuario
                fetchAll();
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
          const response = await fetch(`https://localhost:7113/Users/${userId}`, {
            method: 'DELETE',
            headers: {
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
        fetchAll
    };
});
