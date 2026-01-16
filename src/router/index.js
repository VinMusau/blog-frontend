import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/Auth/LoginView.vue'
import CreateView from '@/views/Posts/CreateView.vue'

const router = createRouter({
    history: createWebHistory( import.meta.env.BASE_URL ),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: { guest: true }
      },

      {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { guest: true }
      },

      {
        path: '/create',
        name: 'create',
        component: CreateView,
        meta: { requiresAuth: true }
      }


    ]
})

/*
let isAuthenticated = false;

router.beforeEach( async ( to, from ) => {
      
  if ( !isAuthenticated ) {
    const authStore = useAuthStore();
    await authStore.getUser();
    isAuthenticated = !!authStore.user;
  }
        
  const authStore = useAuthStore();

  if ( authStore.user && to.meta.guest ) {
    return( { name: 'home' } );
  }
  

  if ( !authStore.user && to.meta.requiresAuth ) {
    return( { name: 'login' } );
  }


});
*/

export default router