<script setup>
    
import { useAuthStore } from '@/stores/auth';
import { onMounted, reactive } from 'vue';

const {authenticate} = useAuthStore();


const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

onMounted(()=>(errors.value = {}));
</script>

<template>
  <div class="register-view">
    <h1>Register</h1>
    <form 
        @submit.prevent="authenticate('register', formData)"
        class="register-form space-y-4"
    >
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="John Doe"  v-model="formData.name"/>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="john@example.com" v-model="formData.email"/>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" v-model="formData.password" />
      </div>
      <div>
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" placeholder="confirm password" v-model="formData.password_confirmation" />
      </div>
      <button type="submit" class="primary-btn">Register</button>
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
</style>
