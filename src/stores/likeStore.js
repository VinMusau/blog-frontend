import axios from "axios";
import { defineStore } from "pinia";

export const useLikeStore = defineStore('likesStore', {
    state :() => ({
        likedPosts: new Set(),
        loading: false,
    }),

    getters: {
        isLiked: (state) => (postId) => state.likedPosts.has(postId),
    },

    actions: {
        async toggleLike(postId) {
            this.loading = true;
            try {
                const { data } = await axios.post(`/api/posts/${postId}/like`);
                if (data.liked) {
                    this.likedPosts.add(postId);
                } else {
                    this.likedPosts.delete(postId)
                }

                return data.likes_count;
            } finally  {
                this.loading = false;                
            }
        },

        async loadLikes() {
            this.loading = true;
            try {
                const { data } = await axios.get('/api/user/likes')
                this.likedPosts = new Set(data);
            } catch (error) {
                console.error('Failed to load liked posts:', error);
            } finally {
                this.loading = false;
            }
        }
    }
})