<script>
import { usePostsStore } from '@/stores/posts';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { fetchPost } = usePostsStore();
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

            </div>
        </div>

     
    </main>
</template>
<style>

</style>