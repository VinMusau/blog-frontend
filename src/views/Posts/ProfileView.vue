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
    if (postsStore.userPosts.length > 0) {
        return postsStore.userPosts[0].user;
    }
    return null;
});

const userInitial = computed(() => {
    return profileAuthor.value?.name 
        ? profileAuthor.value.name.charAt(0) 
        : '?';
});

const isOwnProfile = computed(() => {
    return authStore.user?.id == route.params.id;
});

const triggerUpload = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
}

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        await authStore.uploadAvatar(file);

    } catch (error) {
        // alert("Failed to upload avatar. Check file size or type.");
        console.error("Backend Error:", error.response?.data);

        const msg = error.response?.data?.message || "Upload failed";
        alert(msg);
    }
};

const removeAvatar = async () => {
    if (confirm("Are you sure you want to remove your AVI")) {
        await authStore.deleteAvatar();
        showSuccess.value = true;
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
                    :src="`/storage/${profileAuthor.avatar}`" 
                    class="avatar-image" />
                
                <div v-else class="avatar-placeholder">
                    {{ userInitial }}
                </div>

                <input 
                    type="file"
                    ref="fileInput"
                    @change="handleFileChange"
                    style="display: none"
                    accept="image/*"
                />

                <div v-if="isOwnProfile" class="upload-overlay">Change Photo</div>
                <div v-if="authStore.user?.avatar" class="mt-2">
                    <button
                        @click="removeAvatar"
                        class="text-sm text-red-500 hover:text-red-700 underline transition-colors"
                    >
                        Remove Profile
                    </button>
                </div>
            </div>

            <h1>{{ profileAuthor.name }}</h1>
        </header>

      <div class="post-feed">
        <div v-for="post in postsStore.userPosts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12 ">
            <h2 class="font-bold">{{ post.title }}</h2>
            <p class="text-xs text-slate-600 mb-4">
                <time>
                    {{ new Date(post.created_at).toLocaleDateString() }} 
                </time>
            </p>
            <p>{{ post.content }}</p>
            
        </div>
      </div>
  </main>
</template>
<style scoped>

</style>