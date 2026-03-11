<template>
    <footer class="bg-gray-800 text-white py-4 mt-10">
        <div class="container mx-auto text-center">
        <p>&copy; {{ new Date().getFullYear() }} T Blog. All rights reserved.</p>
            <span class="text-sm text-gray-400">Designed by Vin</span>
        </div>  

        <div class="container mx-auto text-center mt-4">
            <h3> Support T Blog </h3>
            <div class="flex justify-center gap-4">
                <button @click="showMpesaModal = true" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200">
                    Donate via M-Pesa 
                </button>
            </div>
        </div>

        <div v-if="showMpesaModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded shadow-lg w-80">
                <h2 class="text-xl font-bold mb-4">Donate via M-Pesa</h2>
                <input 
                    v-model="phone" 
                    type="text" 
                    placeholder="2547..." 
                    class="w-full p-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
                
                <input 
                    v-model="amount" 
                    type="number" 
                    placeholder="Amount (KES)" 
                    class="w-full p-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
                
                <div class="flex justify-end gap-2">
                    <button @click="payWithMpesa" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200">
                        Pay
                    </button>

                    <button @click="showMpesaModal = false" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';


const showMpesaModal = ref(false);
const phone = ref('');
const amount = ref('');


const payWithMpesa = async () => {
    await axios.post('/api/donate/mpesa', { 
        phone: phone.value, 
        amount: amount.value 
    });
    alert("Check your phone to complete payment");
    showMpesaModal.value = false
};
</script>