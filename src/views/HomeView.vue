<script setup>
import { storeToRefs } from 'pinia';  
import { onMounted } from 'vue';
import { usePostsStore } from '@/stores/posts';
import { RouterLink } from 'vue-router';

// const { fetchPosts } = usePostsStore();
const postsStore = usePostsStore();
const { posts } = storeToRefs(postsStore);

onMounted(() =>  { postsStore.fetchPosts(); } );

// onMounted( async() => posts.value = await fetchPosts());
</script>
<template>
  <main>    
    <h1 class="title"> Latest posts</h1>

      <div v-for="post in posts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12">
        <span class="badge" v-if="post.category">
          {{ post.category.name }}
        </span>
        <h2 class="font-bold"> {{ post.title }}</h2>

        <p class="text-xs text-slate-600 mb-4">by {{ post.user.name }} • {{ new Date(post.created_at).toLocaleDateString() }}</p>
        
        <p>{{ post.content }}
          <RouterLink :to="{ name: 'show', params: { id: post.id } }" class="text-blue-600 hover:underline"> Read more...</RouterLink>
        </p>

      </div>
  </main>
</template>
<style scoped>
  .title {
    text-align: center;
    margin-top: 20px;
    text-emphasis: bold;
  }
  
</style>