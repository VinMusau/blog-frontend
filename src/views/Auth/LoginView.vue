<script>

import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';

const {authenticate} = useAuthStore();


const formData = reactive({
    email: '',
    password: '',
});

onMounted(()=>(errors.value = {}));
</script>

<template>
    <div class="">
    <h1>Login</h1>
    <form 
        @submit.prevent="authenticate('login', formData)"
        class="register-form space-y-4"
    >
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="john@example.com" v-model="formData.email"/>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" v-model="formData.password" />
      </div>
      <button type="submit" class="primary-btn">Login</button>
    </form>
  </div>
</template>


<style>


</style>