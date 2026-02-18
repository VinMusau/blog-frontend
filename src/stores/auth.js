import { defineStore } from 'pinia'
import axios from 'axios'
import { routes } from 'ziggy-js'

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return{
            user: null,
            errors: {},
            
        }
    },
    actions: {
        // Fetch the authenticated user's data

        async getUser(){
           if (localStorage.getItem('token')) {
                const response = await fetch('/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) { 
                    const data = await response.json();
                    this.user = data.user;
                }
                // console.log(data);
           } 
        },
        
     

        async authenticate(apiRoute, formData) {
            try{
                const response = await axios.post(`/api/${apiRoute}`, formData);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    this.user = response.data.user;

                    this.$router.push({ name: 'home' });
                }
            } catch (error) {
                if (error.response?.data?.errors) {
                    this.errors = error.response.data.errors;
                }
                console.error('Auth error:', error);
            }
        },
        
        async uploadAvatar(file) {
            const formData = new formData();
            formData.append('avatar', file);

            try {
                const response = await fetch(`/api/user/avatar`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.token || localStorage.getItem('token')}`
                    }
                });
                if (response.data.user) {
                    this.user = response.data.user;
                }
                return response.data;
            } catch (error) {
                console.error("Avatar upload failed", error.response?.data)
                throw error;
            }
        },
        

        async logout() {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                this.user = null;
                localStorage.removeItem('token');
                this.$router.push({ name: 'login' }); //redirect to login after logout
            }
        }
    }

})
