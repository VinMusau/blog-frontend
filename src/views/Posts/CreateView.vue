<script setup>
    import { reactive, onMounted } from 'vue';
    import { usePostsStore } from '@/stores/posts';
    import { storeToRefs } from 'pinia';
    import { useCategoryStore } from '@/stores/categoryStore';

    const categoryStore = useCategoryStore();
    const postsStore = usePostsStore();
    const { errors } = storeToRefs(usePostsStore());
    const { createPost } = usePostsStore();
    const formData = reactive({
        title: '',
        content: '',
        category_id: ''
    });
    
    onMounted( async () => { 
        console.log("Component Mounted");
        postsStore.errors = {};

        await categoryStore.fetchCategories();
        console.log("Categories in store:", categoryStore.categories);
    });

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
            <div class="category-badge">
                <select v-model="formData.category_id">
                    <option value="">select a category</option>
                    <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
                         {{ cat.name }}
                    </option>
                </select>
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
    .category-badge {
        background: #e2e8f0;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.75rem;
        color: #4a5568;
        margin-bottom: 8px;
        display: inline-block;
    }

</style>