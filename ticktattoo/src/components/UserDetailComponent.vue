<template>
  <div class="profile-container bg-gray-900 shadow-lg rounded-lg p-6 w-full max-w-7xl transition-transform transform hover:scale-105">
    <div v-if="role === 'studio'" class="profile-info">
      <h2 class="text-3xl font-bold mb-4 text-white">{{ userData.studioName }}</h2>
      <p class="text-gray-400 mb-2">{{ userData.description }}</p>
      <div class="info-container">
        <p class="text-gray-300"><strong>Studio Name:</strong> {{ userData.studioName }}</p>
        <p class="text-gray-300"><strong>Description:</strong> {{ userData.description }}</p>
        <p class="text-gray-300"><strong>Location:</strong> {{ userData.location }}</p>
        <p class="text-gray-300"><strong>Instagram:</strong> 
          <a :href="'https://instagram.com/' + userData.instagram" target="_blank" class="text-gray-200 hover:underline transition duration-300">{{ userData.instagram }}</a>
        </p>
        <p class="text-gray-300"><strong>Facebook:</strong> 
          <a :href="'https://facebook.com/' + userData.facebook" target="_blank" class="text-gray-200 hover:underline transition duration-300">{{ userData.facebook }}</a>
        </p>
      </div>
    </div>

    <div v-else-if="role === 'designer'" class="profile-info">
      <h2 class="text-3xl font-bold mb-4 text-white">Designer Details</h2>
      <p class="text-gray-400 mb-2">{{ userData.description }}</p>
      <div class="info-container">
        <p class="text-gray-300"><strong>Description:</strong> {{ userData.description }}</p>
        <p class="text-gray-300"><strong>Instagram:</strong> 
          <a :href="'https://instagram.com/' + userData.instagram" target="_blank" class="text-gray-200 hover:underline transition duration-300">{{ userData.instagram }}</a>
        </p>
        <p class="text-gray-300"><strong>Facebook:</strong> 
          <a :href="'https://facebook.com/' + userData.facebook" target="_blank" class="text-gray-200 hover:underline transition duration-300">{{ userData.facebook }}</a>
        </p>
      </div>
    </div>

    <div v-else-if="role === 'user'" class="profile-info">
      <h2 class="text-3xl font-bold mb-4 text-white">{{ userData.username }}'s Profile</h2>
      <div class="info-container">
        <p class="text-gray-300"><strong>Username:</strong> {{ userData.username }}</p>
        <p class="text-gray-300"><strong>Email:</strong> {{ userData.email }}</p>
        <p class="text-gray-300"><strong>Password:</strong> {{ userData.password }}</p>
        <p class="text-gray-300"><strong>First Name:</strong> {{ userData.firstName }}</p>
        <p class="text-gray-300"><strong>Last Name:</strong> {{ userData.lastName }}</p>
        <p class="text-gray-300"><strong>Tel:</strong> {{ userData.tel }}</p>
        <p class="text-gray-300"><strong>Gender:</strong> {{ userData.gender }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDetailComponent",
  mounted() {
    console.log("role", this.role);
    console.log("userData", this.userData);
  },
  props: {
    role: {
      type: String,
      required: true
    },
    userData: {
      type: Object,
      required: true
    }
  },
  watch: {
    // Watch for changes in the props if needed
    userData(newVal) {
      console.log("userData updated:", newVal);
    },
    role(newVal) {
      console.log("role updated:", newVal);
    }
  }
};

</script>

<style scoped>
.profile-info {
  animation: slideIn 0.5s ease-in-out;
}

.info-container {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.info-container:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.02);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
