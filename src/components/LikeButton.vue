<script setup>
import { useLikeStore } from '@/stores/likeStore';
import { computed } from 'vue';


const props = defineProps({ post: Object });
const likeStore = useLikeStore();

// const { likedPosts, loading } = storeToRefs(likeStore);

const isLiked = computed(() => likeStore.isLiked(props.post.id));

const handleToggle = async () => {
    try {
        const newCount = await likeStore.toggleLike(props.post.id);
        props.post.likes_count = newCount;
    } catch (err) {
        console.error('Error toggling like:', err);
    }
};
</script>

<template>
    <div class="mt-2">
        <span class="text-sm text-gray-600">{{ post.likes_count }} {{ post.likes_count === 1 ? 'like' : 'likes' }}</span>
    
        <button
            @click="handleToggle"
            :disabled="loading"
            :class="isLiked ? 'text-red-500' : 'text-gray-400'"
            class="transition-colors duration-200"
        >
        {{ isLiked ? '❤️ Unlike' : '🤍 Like' }}

        </button>
    </div>
</template>