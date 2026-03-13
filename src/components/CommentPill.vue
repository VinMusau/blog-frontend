<template>
  <div class="flex items-center space-x-2 w-full max-w-md">
    <div class="relative flex-grow">
      <input 
        v-model="commentBody"
        @keyup.enter="submitComment"
        type="text"
        placeholder="Leave a comment..."
        class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-800 border-none rounded-full focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      
      <button 
        v-if="commentBody.length > 0"
        @click="submitComment"
        class="absolute right-2 top-1.5 p-1 text-blue-600 hover:bg-blue-50 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup> 
import  { ref } from 'vue';
import { useCommentStore } from '@/stores/commentStore';

const commentStore = useCommentStore();
const commentBody = ref('');

const props = defineProps ({
    postId: {
        type: Number,
        required: true
    }
})

const submitComment = async() => {
    if (!commentBody.value.trim()) return; // Prevent empty comments
    
    try {
      await commentStore.addComment(props.postId, commentBody.value)
      commentBody.value = '';

    } catch (e) {
      if (e.response && e.response.status === 401) {    
        alert("Login to comment");
      } else {
        console.error('Error submitting comment:', e); 
      }  
    }
}
</script>