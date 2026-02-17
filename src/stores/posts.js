import { defineStore } from 'pinia';
import { useAuthStore } from './auth';  
import axios from 'axios';

export const usePostsStore = defineStore('postsStore', {
    state: () => {
        return {
            posts: [],
            categories: [],
            selectedCategoryId: null,
            userPosts: [],
            errors: {},

        }
    },

    actions: {
        // fetching posts
        async fetchPosts() {
            const response = await fetch('/api/posts');
            const data = await response.json();
            this.posts = data;
            // this.posts = data.data || data;
        

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            console.log(data);          
            return data.posts;
        }, 

        // fetching a single post
        async fetchPost(id) {
            const response = await fetch(`/api/posts/${id}`);
            const data = await response.json();

            return data.post;

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

        },
        // Get Categories
        async fetchCategories() {
            const response = await fetch(`/api/categories`);
            const data  = await response.json();
            console.log("Categories from API:", data);

            this.categories = data;
        },

        // Delete a post
        async deletePost(post) {
            const authStore = useAuthStore();
            if (authStore.user.id === post.user_id) {
                const response = await fetch(`/api/posts/${post.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    // Post deleted successfully
                    this.$router.push({ name: 'home' });

                }
            }
                

            // Remove the deleted post from the state
           // this.posts = this.posts.filter(post => post.id !== post);
        },

        
        // edit a post
        async editPost(post, formData) {
            const authStore = useAuthStore();
            if (authStore.user.id === post.user_id) {
                const response = await fetch(`/api/posts/${post.id}`, {
                    method: 'PUT',
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
                    this.$router.push({ name: 'home' });
                    this.errors = {};
                }
            }
        },

        // getting posts by only a specific user
        async fetchUserPosts(userId) {
            this.loading= true;
            try {
                const response = await fetch(`/api/users/${userId}/posts`, {
                    method: 'GET',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error (`Server responded with ${response.status}`);
                }

                const data = await response.json();
                this.userPosts = data;
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                this.loading = false;
            }
          
        }

        


    }
});