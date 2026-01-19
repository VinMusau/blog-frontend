<script setup>
import { usePostsStore } from '@/stores/posts';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();
const { fetchPost, deletePost } = usePostsStore();
const post = ref(null)

onMounted(async()=> (post.value = await fetchPost(route.params.id)));
</script>

<template>
    <main>
        <div v-if="post"> 
            <div  class="border-l-4 border-blue-500 pl-4 mt-12">
                <h2 class="font-bold"> {{ post.title }}</h2>

                <p class="text-xs text-slate-600 mb-4">by {{ post.user.name }}</p>
                
                <p>{{ post.content }}
                </p>

                <div 
                    v-if="authStore.user && authStore.user.id === post.user.id"
                    class="flex items-center gap-6 mt-6">
                        <form @submit.prevent="deletePost(post)"> 
                            <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Post</button>
                        </form>
                        <router-link 
                            :to="{ name: 'edit', params: { id: post.id } }"
                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Edit Post
                        </router-link>

                </div>

            </div>
        </div>

     
    </main>
</template>
<style>

</style>