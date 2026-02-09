<script setup>
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';

// 1. Just grab the whole store object
const authStore = useAuthStore();

const formData = reactive({
    email: '',
    password: '',
});

// 2. Clear errors by reaching into the store directly
onMounted(() => {
    authStore.errors = {}; 
});

// 3. Create a local wrapper for the submit to keep it clean
const handleLogin = async () => {
    await authStore.authenticate('login', formData);
};
</script>

<template>
  <div class="register-view">
    <h1>Welcome Back</h1>
    <form 
        @submit.prevent="handleLogin" class="register-form space-y-4"
    >
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="john@example.com" v-model="formData.email"/>
        <p v-if="authStore.errors?.email" class="color">
                {{ authStore.errors.email[0] }}
        </p>     
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" v-model="formData.password" />
        <p v-if="authStore.errors?.password" class="color">
          {{ authStore.errors.password[0] }}
        </p>
      </div>
      <button type="submit" class="primary-btn">Login</button>
    </form>
  </div>
</template>

<style scoped>  
    .register-view {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    }
    .register-view h1 {
    text-align: center;
    margin-bottom: 20px;
    }

    .register-view form div {
    margin-bottom: 15px;
    }
    .register-view label {
    display: block;
    margin-bottom: 5px;
    }
    .register-view input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    }
    .register-view button {
    width: 100%;
    padding: 10px;
    background-color: #e6b3e3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    }
    .primary-btn {
    background-color: #e6b3e3;
    }
    .primary-btn:hover {
    background-color: #f3c6f5;
    }
    .color{
      color: red;
    }
</style>
