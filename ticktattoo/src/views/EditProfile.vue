<template>
  <div class="edit-profile-page">
    <div class="edit-profile-form">
      <h2 class="text-center text-2xl font-bold mb-4">Edit Profile</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <EditProfileComponent v-for="(item, index) in state.userData" :key="index" :label="index" :value="item" v-model="state.userData[index]" />
        <div v-if="state.role === 'studio'">
          <EditProfileComponent v-for="(item, index) in state.studioData" :key="index" :label="index" :value="item" v-model="state.studioData[index]"/>
        </div>

        <div v-if="state.role === 'designer'">
          <EditProfileComponent v-for="(item, index) in state.designerData" :key="index" :label="index" :value="item" v-model="state.designerData[index]" />
        </div>
      </div>

      <div class="profile-image-section">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaddILQkLdcENBnMQyl7RyvmSlVizrlW42Lg&s"
          alt="Profile Image" class="profile-image" />
        <button @click="editProfileImage" class="edit-image-button">
          <i class="fa fa-pencil"></i> <!-- Assuming you are using FontAwesome -->
        </button>
      </div>

      <div class="action-buttons">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="save" class="save-button">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import EditProfileComponent from "@/components/EditProfileComponent.vue";
import axios from "axios";
import { reactive } from 'vue';
export default {
  name: 'EditProfilePage',
  components: {
    EditProfileComponent,
  },
  setup() {
    const state = reactive({
      role: "",
      userData: {
        username: "fdfasd",
        email: "",
        first_name: "",
        last_name: "",
        tel: "",
        gender: ""
      },
      studioData: {
        studio_name: "",
        description: "",
        location: "",
        IG: "",
        facebook: "",
        category: [],
        artist: [],
      },
      designerData: {
        description: "",
        IG: "",
        facebook: "",
        category: [],
      },
    });

    return { state };
  },
  mounted() {
    this.getUserDetail()
  },
  methods: {
    editProfileImage() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.profileImage = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    },
    cancel() {
      this.$router.push('/profile');
    },
    save() {
      this.updateProfile();
      this.$router.push('/profile');
    },
    getUserDetail() {
      axios.get('/user/myAccount').then((res) => {
        var response_data = res.data["Details"]
        this.state.role = response_data["role"]
        this.setUserData(response_data)
        // console.log(this.role);
      }).catch((err) => {
        console.error('Error:', err.response ? err.response.data : err.message);
      })
     
    },
    setUserData(data) {
      if (data["role"] === "studio" && data["studio"]) {
        this.state.studioData = {
          studio_name: data["studio"]["studio_name"] || "",
          description: data["studio"]["description"] || "",
          location: data["studio"]["location"] || "",
          IG: data["studio"]["ig"] || "",
          facebook: data["studio"]["facebook"] || "",
          category: data["studio"]["category"] || [],
          artist: data["studio"]["artist"] || []
        }

      }
      if (data["role"] === "designer" && data["designer"]) {
        this.state.designerData = {
          description: data["designer"]["description"] || "",
          IG: data["designer"]["IG"] || "",
          facebook: data["designer"]["facebook"] || "",
          category: data["designer"]["category"] || ""
        }
      }
      this.state.userData = {
        username: data["username"] || "",
        email: data["email"] || "",
        first_name: data["first_name"] || "",
        last_name: data["last_name"] || "",
        tel: data["tel"] || "",
        gender: data["gender"] || ""
      };
    },
    updateProfile() {
      const formdata = {
        user: this.state.userData,
        studio: this.state.studioData,
        designer: this.state.designerData
      }
      console.log("form",formdata);
      axios.put('/user/EditProfile', formdata).then((res) => {
        console.log('Profile updated successfully:', res.data);
      }).catch((err) => {
        console.error('Error:', err.response ? err.response.data : err.message);
      })
    }

  },
};
</script>

<style scoped>
.edit-profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  /* Light gray background */
}

.edit-profile-form {
  background-color: #ffffff;
  /* White form background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  transition: all 0.3s ease;
  /* Animation on hover */
}

.edit-profile-form:hover {
  transform: scale(1.02);
  /* Scale effect on hover */
}

.profile-image-section {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  border: 3px solid #ccc;
  /* Monochrome border */
  transition: border 0.3s ease;
  /* Animation for border */
}

.profile-image:hover {
  border: 3px solid #000;
  /* Change border color on hover */
}

.edit-image-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.3s ease;
  /* Animation for button */
}

.edit-image-button:hover {
  transform: scale(1.2);
  /* Scale effect on hover */
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}

.cancel-button {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #000;
  color: #fff;
}

.save-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #fff;
  color: #28a745;
  border: 1px solid #28a745;
}
</style>
