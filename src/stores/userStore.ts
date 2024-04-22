import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/core/user';

export const useUserStore = defineStore('users', () => {
    const users = ref<User[]>([]);

    async function fetchAll() {
        try {
            const response = await fetch('https://localhost:7113/Users');
            const usersInfo = await response.json();

            console.log('Data received:', usersInfo);

            users.value = usersInfo;
        } catch (error) {
            console.error('Error fetching user: ', error);
        }
    }
    
    return {
        users,
        fetchAll
    };
});
