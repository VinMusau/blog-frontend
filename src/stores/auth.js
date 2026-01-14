import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return{
            user: null,
            
        }
    },
    actions: {
        async authenticate(apiRoute, formData) {
            const response = await fetch(`/api/${apiRoute}`, {
                method: 'POST',
                body: JSON.stringify(formData) });
            
            const data = await response.json();
            console.log(data);
        } 

    }

})