<template>
  <div class="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 fade-in">
    <div v-if="userData.role === 'studio'" class="profile-info">
      <h2 class="text-3xl font-semibold mb-2">{{ userData.studioName }}</h2>
      <p class="text-gray-700 mb-4">{{ userData.description }}</p>
      <p class="text-gray-600">Location: <span class="font-medium">{{ userData.location }}</span></p>
      <p class="text-gray-600">Instagram: <a :href="'https://instagram.com/' + userData.instagram" target="_blank" class="text-blue-600 hover:underline">{{ userData.instagram }}</a></p>
      <p class="text-gray-600">Facebook: <a :href="'https://facebook.com/' + userData.facebook" target="_blank" class="text-blue-600 hover:underline">{{ userData.facebook }}</a></p>
    </div>
    <div v-else-if="userData.role === 'designer'" class="profile-info">
      <h2 class="text-3xl font-semibold mb-2">{{ userData.username }}</h2>
      <p class="text-gray-700 mb-4">{{ userData.description }}</p>
      <p class="text-gray-600">Instagram: <a :href="'https://instagram.com/' + userData.instagram" target="_blank" class="text-blue-600 hover:underline">{{ userData.instagram }}</a></p>
      <p class="text-gray-600">Facebook: <a :href="'https://facebook.com/' + userData.facebook" target="_blank" class="text-blue-600 hover:underline">{{ userData.facebook }}</a></p>
    </div>
    <div v-else-if="userData.role === 'user'" class="profile-info">
      <h2 class="text-3xl font-semibold mb-2">{{ userData.username }}</h2>
      <p class="text-gray-600">Email: <span class="font-medium">{{ userData.email }}</span></p>
      <p class="text-gray-600">Name: <span class="font-medium">{{ userData.firstName }} {{ userData.lastName }}</span></p>
      <p class="text-gray-600">Tel: <span class="font-medium">{{ userData.tel }}</span></p>
      <p class="text-gray-600">Gender: <span class="font-medium">{{ userData.gender }}</span></p>
    </div>
    <div v-else>
      <p class="text-gray-600">No data available</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.profile-info {
  transition: transform 0.2s;
}
.profile-info:hover {
  transform: translateY(-5px);
}
</style>
