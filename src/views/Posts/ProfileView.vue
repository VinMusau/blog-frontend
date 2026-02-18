<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostsStore } from '@/stores/posts';
import { useAuthStore } from '@/stores/auth'; 

const route = useRoute();
const postsStore = usePostsStore();
const authStore = useAuthStore();

const fileInput = ref(null);

const profileAuthor = computed(() => {
    // If we have posts, get the user info from the first post
    if (postsStore.userPosts.length > 0) {
        return postsStore.userPosts[0].user;
    }
    return null;
});

const userInitial = computed(() => {
    // Use the profile author's name, not the logged-in user's name
    return profileAuthor.value?.name 
        ? profileAuthor.value.name.charAt(0) 
        : '?';
});

const isOwnProfile = computed(() => {
    // Does the ID in the URL match the ID of the person logged in?
    return authStore.user?.id == route.params.id;
});

const triggerUpload = () => fileInput.value.click();

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        await authStore.uploadAvatar(file);

    } catch (error) {
        alert("Failed to upload avatar. Check file size or type.");
    }
};

onMounted(() => {
    postsStore.fetchUserPosts(route.params.id);
});
</script>

<template>
  <main class="container">
        <header class="profile-header" v-if="profileAuthor">
            <div class="avatar-wrapper" @click="isOwnProfile ? triggerUpload() : null">
                <img v-if="profileAuthor.avatar" 
                    :src="`http://localhost:8080/storage/${profileAuthor.avatar}`" 
                    class="avatar-image" />
                
                <div v-else class="avatar-placeholder">
                    {{ userInitial }}
                </div>

                <div v-if="isOwnProfile" class="upload-overlay">Change Photo</div>
            </div>

            <h1>{{ profileAuthor.name }}</h1>
        </header>

      <div class="post-feed">
        <div v-for="post in postsStore.userPosts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12 ">
            <h2 class="font-bold">{{ post.title }}</h2>
            <p>{{ post.content }}</p>
            <time>
                {{ new Date(post.created_at).toLocaleDateString() }}
            </time>
        </div>
      </div>
  </main>
</template>
<style scoped>

</style>