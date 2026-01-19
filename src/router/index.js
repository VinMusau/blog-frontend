import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/Auth/LoginView.vue'
import CreateView from '@/views/Posts/CreateView.vue'
import ShowView from '@/views/Posts/ShowView.vue'
import EditView from '@/views/Posts/EditView.vue'

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
      },

      {
        path: '/posts/:id',
        name: 'show',
        component: ShowView,
      },
      {
        path: '/posts/:id/edit',
        name: 'edit',
        component: EditView,
        meta: { requiresAuth: true }
      }


    ]
})



router.beforeEach(async (to, from ) => {
  const authStore = useAuthStore();
      
  if ( authStore.user === undefined ) {
    await authStore.getUser();
  }
        

  if ( authStore.user && to.meta.guest ) {
    return( { name: 'home' } );
  }
  

  if ( !authStore.user && to.meta.requiresAuth ) {
    return( { name: 'login', query: { redirect: to.fullPath } } );
  }


});


export default router