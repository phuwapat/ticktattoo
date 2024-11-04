<template>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="modal-content flex flex-col justify-center items-center bg-white rounded-2xl w-2/5 h-72 overflow-auto">
        <h2 class="text-2xl font-bold mb-6 text-center">Rate your experience</h2>
        <div class="flex justify-center">
          <span v-for="star in stars" :key="star" @click="setRating(star)" class="cursor-pointer">
            <svg class="w-16 h-16" :class="star <= rating ? 'text-yellow-300' : 'text-gray-300'" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </span>
        </div>
        <div class="flex mt-6 justify-end">
          <button @click="closeModal" class="bg-gray-300 text-black text-xl font-bold rounded-md p-2 mr-2 w-32">Close</button>
          <button @click="submitRating" class="bg-green-600 text-white text-xl font-bold rounded-md p-2 w-32">Submit</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapState, mapActions } from 'vuex';
  
  export default {
    name: 'YourComponentName', // Replace with your component's name
    props: {
      message: String,
      date: String,
      name: String,
      state: String,
      studioId: String,
    },
    emits: ['closeModal', 'finish', 'hideNotification'],
    data() {
      return {
        showModal: true,
        rating: 0,
        stars: [1, 2, 3, 4, 5],
      };
    },
    computed: {
      ...mapState(['items', 'loading']),
      studioIdComputed() {
        console.log('Computing studioIdComputed:', this.items);
        if (this.loading || !Array.isArray(this.items) || this.items.length === 0) {
          console.error('Items not loaded or not an array');
          return '';
        }
        // const notification = this.items.find((item) => item.name === this.name);
        // return notification?.id || '';
        // return this.items
        const notification = this.items.find((item) => item.name?.studio_name === this.name);
    
        // Return the UserID from the found notification's "name" object
        return notification?.name?.UserID || '';
      },
    },
    methods: {
      ...mapActions(['fetchNotifications']),
      setRating(star) {
        this.rating = star;
      },
      async submitRating() {
        if (this.loading) {
          console.log('Data is still loading, please wait.');
          return;
        }
        console.log('Submitting rating with studio ID:', this.studioIdComputed);
        console.log('Rating submitted:', this.rating);
        try {
          await axios.post('user/rate', {
            studio_id: this.studioIdComputed,
            rating: this.rating,
          });
          console.log('Rating sent to backend');
        } catch (error) {
          console.error('Error sending rating:', error);
        }
        this.closeModal();
        this.$emit('finish');
        this.$emit('hideNotification');
      },
      closeModal() {
        this.showModal = false;
        this.rating = 0;
        this.$emit('closeModal');
        this.$emit('hideNotification');
      },
      toggleBodyScroll(enabled) {
        document.body.style.overflow = enabled ? 'auto' : 'hidden';
      },
    },
    async mounted() {
      this.toggleBodyScroll(false);
      await this.fetchNotifications(); // Fetch the notifications from Vuex store
      console.log('Mounted - Items:', this.items);
    },
    beforeUnmount() {
      this.toggleBodyScroll(true);
    },
  };
  </script>
  
  <style scoped>
  .modal-content {
    overflow: auto;
  }
  </style>
  