<script setup>
import { onMounted } from 'vue';
import { usePostsStore } from '@/stores/posts';

const { fetchPosts } = usePostsStore();

onMounted(() => fetchPosts());
</script>
<template>
  <main>    
    <h1 class="title"> Latest posts</h1>
    <PostsList />
  </main>
</template>
<style scoped>
  .title {
    text-align: center;
    margin-top: 20px;
  }
  
</style>