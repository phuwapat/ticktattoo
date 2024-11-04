<template>
  <div class="card bg-gray-card cursor-pointer" @click="togglePopup">
    <div>
      <img :src="images[0].src" :alt="images[0].alt" class="tattoo-img w-64 h-auto object-cover" />
    </div>
    <div class="profile-container">
      <img :src="profileimg" alt="Profile Image" class="profile-img rounded-full" />
      <span class="profile-name ml-3">{{ name }}</span>
    </div>

  </div>
  <div v-if="isPopupOpen" class="popup fixed inset-0 flex items-center justify-center z-50 ">
    <div class="backg absolute inset-0 bg-gray-800 opacity-50 w-full"></div>
    <EditPostModal v-if="isModalVisible" :show="isModalVisible" @close="closeModal" class="create-post-modal"
      :images="this.images" :postid="this.idpost" />

    <div class="detail-f bg-gray-100 rounded-lg shadow-lg z-50 grid grid-cols-1 md:grid-cols-3">
      <div class="md:col-span-2 bg-gray-100 rounded-md shadow flex flex-col justify-center items-center p-6 relative">

        <img class="detail-img rounded-lg shadow-lg mx-5" :src="images[currentImageIndex].src"
          :alt="images[currentImageIndex].alt" />
        <div v-if="images && images.length > 1" class="flex space-x-4 mt-4">
          <button @click="prevImage"
            class="absolute left-7 transform -translate-y-1/2 top-1/2 px-4 py-3 bg-gray-700 text-white rounded-full shadow-lg border-2 border-white hover:bg-black">
            <i class="fas fa-arrow-left"></i>
          </button>
          <button @click="nextImage"
            class="absolute right-7 transform -translate-y-1/2 top-1/2 px-4 py-3 bg-gray-700 text-white rounded-full shadow-lg border-2 border-white hover:bg-black">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>

      </div>
      <div class="md:col-span-1 bg-black rounded-r-lg shadow flex flex-col relative justify-between">
        <div class="text-white">
          <div class="profile-container flex items-center p-4 mt-[100px]">
            <router-link class="flex items-center" :to="`/profile/${studioid}`">
              <img :src=profileimg alt="Profile Image" class="profile-img rounded-full" />
              <span class="profile-name ml-3">{{ name }}</span>
            </router-link>

            <button v-if="isSameStudio" @click="openModal" class="more-details ml-[10px] mt-[8px]">
              <i class="fa fa-ellipsis-v" style="font-size:20px"></i>
            </button>
          </div>
          <button @click="togglePopup"
            class="absolute top-1 right-1 px-3 py-1 mt-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600">
            <i class="fas fa-times"></i>
          </button>
          <hr class="mx-4 mb-4">
          <div class="content-container">
            <h1 class="text-3xl mx-4 my-2">{{ title }}</h1>
            <p class="mx-4 ">{{ content }}</p>
          </div>
        </div>
        <div class="flex justify-between items-center mt-6">
          <div class="flex space-x-2 ml-5 mb-5">
            <button class="flex items-center px-4 py-2 bg-[#42afeb] text-white rounded-lg">
              <i class="fa fa-thumbs-up mr-2"></i> LIKE
            </button>
            <button class="flex items-center px-4 py-2 bg-[#ffcd29] text-black rounded-lg">
              <i class="fa fa-star mr-2 "></i> FAVORITE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditPostModal from './EditPostModal.vue';
import axios from 'axios';


export default {
  name: "ExploreCard",
  components: {
    EditPostModal
  },

  props: {
    idpost: {
      type: String,
      required: true
    },
    currentuserid: {
      type: String,
      required: true
    },
    studioid: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  },
  computed: {
    isSameStudio() {
      return this.currentuserid === this.studioid;
    }
  },
  data() {
    return {
      isModalVisible: false,
      isPopupOpen: false,
      currentImageIndex: 0,
      profileimg: "/assets/defaultProfile.png"
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      axios.get(`/user/studioChat/?id=${this.studioid}`).then((res) => {
        console.log(res)
        if (res.data["profile_image"] !== "") {
          this.profileimg = this.formatPath(res.data["profile_image"]);
        }
        // else{
        //   this.profileimg = "/public/assets/defaultProfile.png"
        // }
      }).catch(error => {
        console.error("Error fetching user profile:", error);
      });
      console.log(this.profileimg)
    },
    formatPath(profilePath) {
      if (typeof profilePath !== "string") {
        console.error("Invalid path: profilePath should be a string");
        return "";
      }
      const baseURL = axios.defaults.baseURL;
      const formattedPath = profilePath.replace(/^\.\//, "");
      const newPath = `${baseURL}${formattedPath}`;
      return newPath
    },
    togglePopup() {
      this.isPopupOpen = !this.isPopupOpen;
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
};
</script>

<style scoped>
.card {
  width: 320px;
  height: 370px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.card:hover {
  transform: scale(1.05) rotate(2deg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  background-color: #e2e1e1b0;
}

.tattoo-img {
  width: 100%;
  height: 285px;
  object-fit: cover;
  border-radius: 15px;
}

.profile-container {
  margin-top: 12px;
  margin-left: 3px;
  display: flex;
  align-items: center;
}

.profile-img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-name {
  font-size: 16px;
  font-weight: 1000;
}

.detail-f {
  width: 1240px;
  height: 600px;
}

.detail-img {
  width: 800px;
  height: 500px;
  object-fit: cover;
}

.create-post-modal {
  z-index: 1000;
  /* Ensure the modal appears above everything else */
}
</style>