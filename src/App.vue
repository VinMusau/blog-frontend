<script setup>
  import { createPinia } from 'pinia';
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from './stores/auth';
  import { onMounted } from 'vue';

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.getUser();
  });

</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{name: 'home'}" class="nav-link">Home</RouterLink>

      <div v-if="authStore.user" class="nav-right" style="align-items: center; gap: 10px;">
        <p  class="text-sm text-slate-300">Hello, {{ authStore.user.name }}</p> 
        <form @submit.prevent="authStore.logout">
          <button v-if="authStore.user" type="submit" class="nav-link" style="background:none; border:none; padding:0; cursor:pointer;">Logout</button>
        </form>
      </div>




      <div v-else class="nav-right">
        <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>

        <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>

      </div>
                  <RouterLink :to="{name: 'create'}" class="nav-link">Create Post</RouterLink>

    </nav>
  </header>

  <div style="height: 20px;">
  </div>

  <RouterView />

</template>

<style scoped>
  header {
    background-color: #07384e;
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


