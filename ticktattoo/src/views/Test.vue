<template>
    <div class="p-6">
      <h1 class="text-2xl mb-4">Vue.js Pop-up Example</h1>
      <button @click="openModal" class="px-4 py-2 bg-green-500 text-white rounded">Open Pop-up</button>
      <!-- Modal component -->
      <CreatePostModal v-if="isModalVisible" :show="isModalVisible" @close="closeModal" />
    </div>
  </template>
  
  <script>
import CreatePostModal from '@/components/EditPostModal.vue';


  export default {
    name:"FormPost",
    components: {
      CreatePostModal
    },
    data() {
      return {
        isModalVisible: false
      };
    },
    methods: {
      openModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add additional styles if necessary */
  </style>