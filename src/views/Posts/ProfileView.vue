<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostsStore } from '@/stores/posts';
import axios from 'axios';

const route = useRoute();
const postsStore = usePostsStore();

const profileOwnerName = computed(()=>{
    return postsStore.userPosts.length > 0
    ? postsStore.userPosts[0].user.userName
    : 'User Profile';
});

onMounted(() => {
  // Fetch the posts for the ID currently in the URL
  postsStore.fetchUserPosts(route.params.id);
});
</script>

<template>
  <main class="container">
    <div v-if="postsStore.loading">Loading...</div>
    
    <div v-else>
      <div class="profile-header">
        
        <div class="user-info">
            <h1 v-if="postsStore.userPosts.length > 0">
                {{ postsStore.userPosts[0].user.name }}'s Feed</h1>
        </div>
      </div>

      <div class="post-feed">
        <div v-for="post in postsStore.userPosts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12 ">
          <h2 class="font-bold">{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <time>
            {{ new Date(post.created_at).toLocaleDateString() }}
          </time>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.profile-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;

}
.container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}
.avatar-placeholder {
    width: 80px;
    height: 80px;
    background-color: var(--accent-color, #3b82f6);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
}
.posts-feed {
    display: flex;
    flex-direction: column;
    gap: 1.5rem; 
}
</style>