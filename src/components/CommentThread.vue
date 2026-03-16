<template>
  <div class="mt-8 border-t pt-6">
    <h3 class="text-lg font-bold mb-4">Comments</h3>
    
    <div v-for="comment in store.commentsByPost[postId]" :key="comment.id" class="mb-4 flex space-x-3">
      <div class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
        {{ comment.user.name.charAt(0) }}
      </div>
      <div class="bg-gray-50 rounded-lg p-3 flex-grow">
        <div class="flex justify-between items-center mb-1">
          <span class="font-semibold text-sm text-black-400">{{ comment.user.name }}</span>
          <span class="text-xs text-gray-400">{{ formatDate(comment.created_at) }}</span>
        </div>
        <p class="text-sm text-gray-700">{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCommentStore } from '@/stores/commentStore.js';

const props = defineProps(['postId']);
const store = useCommentStore();

onMounted(() => {
  store.fetchComments(props.postId);
});

const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
</script>