<script setup>

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { storeToRefs } from 'pinia';  
import { onMounted, computed } from 'vue';
import { usePostsStore } from '@/stores/posts';
import { useCategoryStore } from '@/stores/categoryStore';
import { RouterLink } from 'vue-router';

// const { fetchPosts } = usePostsStore();
const postsStore = usePostsStore();
const categoryStore = useCategoryStore();
const { posts } = storeToRefs(postsStore);
dayjs.extend(relativeTime);

const formatTime = (date) => {
  return dayjs(date).fromNow();
};

const filteredPosts = computed(()=>{
  if (!postsStore.selectedCategoryId) {
    return postsStore.posts; //this will return all posts if no category is selected
  }
  return postsStore.posts.filter(post=>post.category_id === postsStore.selectedCategoryId);
});

onMounted(() =>  {
   postsStore.fetchPosts(); 
   categoryStore.fetchCategories();
});

// onMounted( async() => posts.value = await fetchPosts());
</script>
<template>
  <main class="container">    
    <h1 class="title"> Latest posts</h1>

      <div class="filter-bar" v-if="categoryStore && categoryStore.categories">
        <label for="cat-select"> Filter by Category: </label>
        <select id="cat-select" v-model="postsStore.selectedCategoryId" class="custom-select">
          <option :value="null">All Categories</option>
          <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search titles..." 
            class="search-input"
          />
        </select>
      </div>

      <div class="post-feed">
        <div v-if="filteredPosts.length === 0" class="no-posts">
          No posts found in this category
        </div>

        <div>
          <div v-for="post in filteredPosts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12 " >
            <div class="post-header">
               <h2 class="font-bold"> {{ post.title }}</h2>
               <span v-if="post.category">
                {{ post.category.name }}
               </span>
            </div>

            <p class="text-xs text-slate-600 mb-4">by {{ post.user.name }} • {{ formatTime(post.created_at) }}</p>
        
            <p>{{ post.content }}
              <RouterLink :to="{ name: 'show', params: { id: post.id } }" class="text-blue-600 hover:underline"> Read more...</RouterLink>
            </p>
          </div>
        </div>
      </div> 

  </main>
</template>
<style scoped>
  .title {
    text-align: center;
    margin-top: 20px;
    text-emphasis: bold;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
  }

  .filter-bar {
    background: #f4f4f9;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .custom-select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .post-card {
    border: 1px solid #eee;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    transition: transform 0.2s;
  }

  .post-card:hover {
    transform: translateY(-3px);
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .date {
    font-size: 0.85rem;
    color: #888;
  }

  .post-content {
    color: #444;
    line-height: 1.6;
  }  
</style>