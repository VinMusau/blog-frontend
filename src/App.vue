<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from './stores/auth';

  const authStore = useAuthStore

</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{name: 'home'}" class="nav-link">Home</RouterLink>
      <p v-if="authStore.user"> {{ authStore.user.name }}</p>
      <div class="nav-right">
        <RouterLink :to="{name: 'login'}" class="nav-link">Login</RouterLink>
        <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />

</template>

<style scoped>
  header {
    background-color: #da9ecb;
    padding: 10px 20px;
    color: white;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    margin-right: 15px;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  .nav-right {
    display: flex;
    align-items: center;
  }
</style>


