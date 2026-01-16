<script setup>
    import { reactive } from 'vue';
    import { onMounted } from 'vue';
    import { usePostsStore } from '@/stores/posts';
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';

    const { errors } = storeToRefs(usePostsStore());
    const { createPost } = usePostsStore();
    const formData = reactive({
        title: '',
        content: ''
    });
    
    onMounted(() => { errors.value = {}; });
</script>
<template>
    <main>
        <div>
            <h1 class="title"> Publish a post </h1>
        </div>
        <form class="form" @submit.prevent="createPost(formData)" >
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Post Title" v-model="formData.title" />
                <p v-if="errors.title" class="color">{{ errors.title[0] }}</p>
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea id="content" name="content" placeholder="Post Content" v-model="formData.content"></textarea>
                <p v-if="errors.content" class="color">{{ errors.content[0] }}</p>
            </div>
            <button type="submit" class="primary-btn"> Publish </button>
        </form>
    </main>
</template>
<style scoped>
    .title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 600px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-group label {
        margin-bottom: 5px;
        font-weight: 600;
    }

    .form-group input,
    .form-group textarea {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }

    .form-group textarea {
        resize: vertical;
        min-height: 100px;
    }

    .primary-btn {
        background-color: #007bff;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    .primary-btn:hover {
        background-color: #0056b3;
    }
    .color {
        color: red;
        font-size: 14px;
        margin-top: 5px;
    }

</style>