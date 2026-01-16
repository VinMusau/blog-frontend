<script setup>
    
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const { errors } = storeToRefs(useAuthStore());
const {authenticate} = useAuthStore();


const formData = reactive({
    email: '',
    password: '',
});

import { useAuthStore } from '@/stores/auth';


onMounted(()=>(errors.value = {})); // Clear errors on mount (trancation of errors)
</script>

<template>
  <div class="register-view">
    <h1>Welcome Back</h1>
    <form 
        @submit.prevent="authenticate('login', formData)"
        class="register-form space-y-4"
    >
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="john@example.com" v-model="formData.email"/>
        <p v-if="errors.email" class="color">{{ errors.email[0] }}</p>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" v-model="formData.password" />
        <p v-if="errors.password" class="color">{{ errors.password[0] }}</p>
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
