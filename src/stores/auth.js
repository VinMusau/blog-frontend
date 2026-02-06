import { defineStore } from 'pinia'

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
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    this.user = data.user;
                }
                // console.log(data);
           } 
        },
        
     

        async login(formData) {
            try{
                const response = await fetch('/api/login', { //the fetch will return a promise
                    method: 'POST',
                    body: JSON.stringify(formData),
                });

                const token = response.data.token;
                localStorage.setItem('token', token);

                if (token) { 
                    localStorage.setItem('token', token);
                    this.$router.push({ name: 'home' });  //redirect to home after authentication
                }
                return response.data;
            } catch (error) {
                console.error('Login error:', error);
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
