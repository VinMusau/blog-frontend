import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommentStore = defineStore('commentStore',  {
    state: () => ({ 
        commentsByPost: {},
        loading: false,
        error: null,
    }),

    actions: {
        async fetchComments(postId) {

            this.loading = true;
            try {
                const response = await axios.get(`/api/posts/${postId}/comments`);

                this.commentsByPost[postId] = response.data;
            } catch (error) {
                this.error = error.message || 'Failed to load comments';

            } finally {
                this.loading = false;
            }
        },


        async addComment(postId, body) {

            try {
                const response = await axios.post(`/api/comments`, {
                     body: body,
                    post_id: postId, 
                });

                if (!this.commentsByPost[postId]) {
                    this.commentsByPost[postId] = [];
                }
                this.commentsByPost[postId].unshift(response.data);

                return response.data;

            } catch (error) {
                throw error;
            }
        }
    }
});