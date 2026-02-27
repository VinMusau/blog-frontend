<script setup>
  import { createPinia } from 'pinia';
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from './stores/auth';
  import { onMounted, ref, computed } from 'vue';

  const authStore = useAuthStore();
  const isDark = ref(false);
  const loading = ref(false);

  const toggleTheme = () => {
    isDark.value = !isDark.value;

      document.documentElement.classList.toggle('dark', isDark.value);
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    
  }

  const avatarUrl = computed(() => {
    const user = authStore.user;

    if (user?.avatar) {
      return `/storage/${user.avatar}`;
    }
    const name = user?.name || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
  });

  const handleImageError = (e) => {
    e.target.src = `https://ui-avatars.com/api/?name=Error&background=ccc&color=666`;
  };

  const handleResend = async () => {
    loading.value= true;
    await authStore.resendVerification
    loading.value= false;
  };

  onMounted(() => {
    authStore.getUser();
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      isDark.value = true;
      document.documentElement.classList.add('dark');
    }
  });

  onMounted(() => {
    if ( route.query.verified === '1') {
      showSuccessToast('Verification complete!')
    }
  });

</script>

<template>
  <header>
    <nav>
    <RouterLink :to="{name: 'home'}" class="nav-link">Home</RouterLink>

    <div v-if="authStore.user" class="nav-right" style="display: flex; align-items: center; gap: 12px;">
      
      <RouterLink :to="{ name: 'profile', params: { id: authStore.user.id } }" class="nav-avatar-link">
        <div class="nav-avatar-circle">
          <img v-if="authStore.user.avatar" 
               :src="`/storage/${authStore.user.avatar}`" 
               alt="Profile" />
          <span v-else>{{ authStore.user.name?.charAt(0).toUpperCase() }}</span>
        </div>
      </RouterLink>

      <p class="text-sm text-slate-300">Hello, {{ authStore.user.name }}</p> 
      
      <form @submit.prevent="authStore.logout">
        <button type="submit" class="nav-link" style="background:none; border:none; padding:0; cursor:pointer;">Logout</button>
      </form>
    </div>
    
    <div v-else class="nav-right">
      <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
      <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
    </div>

    <RouterLink :to="{name: 'create'}" class="nav-link">Create Post</RouterLink>
    
    <button @click="toggleTheme" class="theme-btn" aria-label="Toggle Theme">
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    </button>
      
  </nav>
  </header>


  <div v-if="authStore.isLoggedIn && !authStore.isVerified" class="banner">
    <p> Please verify your email </p>
    <button 
      @click="handleResend" :disabled="loading"
      class="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1 rounded-md text-xs font-medium transition-colors"
    >
        {{ loading ? 'sending...' : 'Resend Email' }}
    </button>

  </div>
  <slot />


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


