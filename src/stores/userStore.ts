import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/core/user';
import { useLoginStore } from '@/stores/loginStore'; 

export const useUserStore = defineStore('users', () => {
    const users = ref<User[]>([]);
    const { getToken, getRole } = useLoginStore();

    async function fetchAll() {
        try {
            const token = getToken(); // Obtiene el token del usuario
            const role = getRole(); // Obtiene el rol del usuario

            // Verifica que el usuario esté autenticado y tenga el rol adecuado
            if (token && role === 'admin') {
                const response = await fetch('https://localhost:7113/Users', {
                    headers: {
                        Authorization: `Bearer ${token}` // Incluye el token en el encabezado de autorización
                    }
                });

                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de usuarios');
                }

                const usersInfo = await response.json();

                console.log('Data received:', usersInfo);

                users.value = usersInfo;
            } else {
                console.error('El usuario no está autorizado para ver la lista de usuarios');
            }
        } catch (error) {
            console.error('Error fetching user: ', error);
        }
    }
    
    return {
        users,
        fetchAll
    };
});
