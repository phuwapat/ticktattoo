<template>
  <div class="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold mb-6 text-center">View Detail</h1>
    <UserDetailComponent :role="role" :userData="userData" :key="role + userData.username" />
  </div>
</template>

<script>
import UserDetailComponent from "@/components/UserDetailComponent.vue";
import axios from "axios";
export default {
  name: "ViewDetailPage",
  components: {
    UserDetailComponent
  },
  mounted() {
    this.getUserDetail()
    console.log(this.$route.params.userId,"Id");
  },
  data() {
    return {
      role: "",
      userData: {
        studioName: "",
        description: "",
        location: "",
        instagram: "",
        facebook: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        tel: "",
        gender: ""
      }
    };
  },
  methods: {
    getUserDetail() {
      axios.get(`/public/profile?id=${this.$route.params.userId}`)
        .then((res) => {
          console.log("Full response data:", res.data);
          const response_data = res.data["Details"];
          this.setUserData(response_data);
        })
        .catch((err) => {
          console.error('Error:', err.response ? err.response.data : err.message);
        });
    },
    setUserData(data) {
      console.log(data["role"],"role",data);
      const studio = data["role"] === "studio" && data["studio"] ? {
        studioName: data["studio"]["studio_name"] || "",
        description: data["studio"]["description"] || "",
        location: data["studio"]["location"] || "",
        instagram: data["studio"]["ig"] || "",
        facebook: data["studio"]["facebook"] || ""
      } : {};
      const designer = data["role"] === "designer" && data["designer"] ? {
        description: data["designer"]["description"] || "",
        instagram: data["designer"]["IG"] || "",
        facebook: data["designer"]["facebook"] || ""
      } : {};
      this.userData = {
        ...studio,
        ...designer,
        username: data["username"] || "",
        email: data["email"] || "",
        firstName: data["first_name"] || "",
        lastName: data["last_name"] || "",
        tel: data["tel"] || "",
        gender: data["gender"] || ""
      };
      console.log("user view",this.userData);
      this.role = data["role"];
    }

  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
