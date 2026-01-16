import { defineStore } from 'pinia';
import { useAuthStore } from './auth';  

export const usePostsStore = defineStore('postsStore', {
    state: () => {
        return {
            errors: {},

        }
    },

    actions: {
        // fetching posts
        async fetchPosts() {
            const response = await fetch('/api/posts/14', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            // console.log(data);          
            return data.posts;
        },

        // Create a new post
        async createPost(formData) {
            const authStore = useAuthStore();
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.errors) {
                this.errors = data.errors;
            } else {
               // this.errors = {};
               this.$router.push({ name: 'home' });
            }

        }
    },
});