import axios from "axios";
import { defineStore } from "pinia";

export const useLikeStore = defineStore('likesStore', {
    state :() => ({
        likedPosts: new Set(),
        loading: false,
    }),

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
            const { data } = await axios.get('/api/likes')
            this.likedPosts = new Set(data.map(post => post.id))
            this.likedPosts = data
        }
    }
})