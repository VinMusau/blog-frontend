import { defineStore } from 'pinia'
import axios from 'axios'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [],
    loading: false
  }),
  actions: {
    async fetchCategories() {
      this.loading = true
      if (this.categories.length > 0) return;

      try {
        const response = await axios.get(`/api/categories`)
        this.categories = response.data;
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    }
  }
})