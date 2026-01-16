import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return{
            user: null,
            errors: {},
            
        }
    },
    actions: {

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
        
        // Generic authenticate method for login and registration
        async authenticate(apiRoute, formData) {
            const response = await fetch(`/api/${apiRoute}`, { //the fetch will return a promise
                method: 'POST',
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            if (data.errors) {
                this.errors = data.errors;           
             }
            else {
                this.errors = {};
                localStorage.setItem('token', data.token);
                this.user = data.user;

                this.$router.push({ name: 'home' });  //redirect to home after authentication
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