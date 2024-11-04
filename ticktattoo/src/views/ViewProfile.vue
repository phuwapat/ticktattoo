<template>
    <div class="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 class="text-4xl font-bold mb-6 text-center">View Profile</h1>
      <ProfileDetailComponent :userData="userData" />
    </div>
  </template>
  
  <script>
  import ProfileDetailComponent from "@/components/ProfileDetailComponent.vue";
  
  export default {
    components: {
      ProfileDetailComponent
    },
    data() {
      return {
        userData: {} // initialize userData
      };
    },
    created() {
      // Simulating fetching user data (mock data)
      const userId = this.$route.params.userId; // get userId from URL
      this.fetchUserData(userId);
    },
    methods: {
      fetchUserData(userId) {
        // Mock data based on userId
        const mockData = {
          1: { role: "studio", studioName: "Oakarin Studio", description: "A great place for tattoos", location: "Location 1", instagram: "@awesomestudio", facebook: "fb.com/awesomestudio" },
          2: { role: "designer", username: "Designer Park", description: "Experienced tattoo artist", instagram: "@park007zaza", facebook: "fb.com/Parklnwza" },
          3: { role: "user", username: "Nicka56", email: "user@example.com", firstName: "Tai", lastName: "Tui", tel: "012-345-6789", gender: "Male" }
        };
  
        this.userData = mockData[userId] || {};
      }
    }
  };
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  </style>
  