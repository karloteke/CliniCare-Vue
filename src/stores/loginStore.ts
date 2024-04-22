import { defineStore } from 'pinia';
import { ref } from 'vue';
// import type { Login } from '@/core/login';

export const useLoginStore = defineStore('login', () => {
    const token = ref<string | null>(localStorage.getItem('token') ?? null);
    const role = ref<string | null>(localStorage.getItem('role') ?? null);
    const errorMessage = ref<string>(''); 

    async function login(credentials: { userName: string; password: string }) {
        try {
            const response = await fetch('https://localhost:7113/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                token.value = data.token;

                // Decodificar el token JWT para obtener el rol
                const decodedToken = parseJwt(data.token);
                const userRole = decodedToken.role;

                role.value = userRole;

                localStorage.setItem('token', data.token);
                localStorage.setItem('role', userRole);
            } else {
                errorMessage.value = 'Credenciales incorrectas. Inténtalo de nuevo.'; 
                console.error('Error de inicio de sesión:', response.statusText);
                throw new Error(response.statusText); // Lanzar un error para capturar en la vista
            }
        } catch (error) {
            errorMessage.value = 'Error de inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
            console.error('Error de inicio de sesión:', error);
            throw error;
        }
    }

    function logout() {
        // Limpiar el token al cerrar sesión
        token.value = null;
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    }

    function getToken() {
        return token.value;
    }

    function getRole(){
        return role.value;
    }

      // Función para determinar si el usuario está autenticado
      function isLoggedIn() {
        return !!token.value; // Devuelve true si hay un token almacenado, false si no lo hay
    }

    // Función para decodificar un token JWT
    function parseJwt(token: string) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error parsing JWT:', error);
            throw error;
        }
    }

    return {
        token,
        role,
        login,
        logout,
        getToken,
        getRole,
        errorMessage, 
        isLoggedIn
    };
});
