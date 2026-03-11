import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { ZiggyVue } from 'ziggy-js';
import { Ziggy } from './ziggy';


import App from './App.vue'
import router from './router'
import axios from 'axios';

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axios.interceptors.request.use(config=> {
    const activeToken = localStorage.getItem('token');
    if (activeToken) {
        config.headers.Authorization = `Bearer ${activeToken}`;
    }
    config.headers.Accept = 'Application/json';
    return config;
});

window.Ziggy = Ziggy
const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
    store.$router = markRaw(router)
})

app.use(ZiggyVue, Ziggy)
app.use(pinia)
app.use(router)

app.mount('#app')
