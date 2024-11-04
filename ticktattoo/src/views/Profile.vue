<template>
  <div class="profile-page">
    <!-- Background and Profile Header -->
    <div
      v-if="this.$route.params.id === userId"
      class="owner-profile-page relative min-h-screen bg-gray-100"
      :class="role"
    >
      <!-- Map (only for Studio) -->
      <div v-show="role === 'studio'" class="map-container">
        <div class="map-placeholder">Map goes here</div>
      </div>
      <div v-show="role === 'designer' || role === 'user'" class="bg-container">
        <div class="bg-tattoo"></div>
      </div>

      <div class="text-center w-full relative -top-36">
        <div class="flex flex-col">
          <img
            class="mx-auto rounded-full t-0 w-64 h-64 object-cover border border-gray-300"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaddILQkLdcENBnMQyl7RyvmSlVizrlW42Lg&s"
            alt="Profile Image"
          />
          <h2 class="text-3xl font-bold mt-4">{{ name }}</h2>
        </div>

        <!-- Buttons Section -->
        <div class="button-container">
          <button
            @click="viewDetail"
            class="px-4 py-2 w-44 bg-orange-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500"
          >
            View Detail
          </button>
          <button
            @click="editProfile"
            class="px-4 py-2 w-44 bg-blue-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500"
          >
            Edit Profile
          </button>
          <button
            v-show="role === 'studio' || role === 'designer'"
            @click="openModal"
            class="px-4 py-2 w-44 bg-[#f7cd03] text-white rounded transition duration-300 ease-in-out transform hover:bg-white hover:text-[#f7cd03] hover:border hover:border-[#f7cd03]"
          >
            Create Post
          </button>
          <button
            v-if="showBookings"
            v-show="role === 'studio'"
            @click="getBookings"
            class="px-4 py-2 w-44 bg-green-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-white hover:text-green-500 hover:border hover:border-green-500"
          >
            Manage Booking
          </button>
          <button
            v-else
            v-show="role === 'studio'"
            @click="manageBooking"
            class="px-4 py-2 w-44 bg-green-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-white hover:text-green-500 hover:border hover:border-green-500"
          >
            Back to Gallery
          </button>
        </div>

        <!-- Tattoo Image Gallery or Booking Management -->
        <div>
          <CreatePostModal
            v-if="isModalVisible"
            :show="isModalVisible"
            :id="this.$route.params.id"
            @close="closeModal"
          />
          <div v-show="role === 'studio' || role === 'designer'">
            <div v-show="showBookings" class="gallery">
              <TattooCard
                v-for="(image, index) in images"
                :key="index"
                :imgSrc="image.src"
                :altText="image.alt"
              />
            </div>

            <div v-show="!showBookings" class="bookingmncard">
              <BookingMnCard
                v-for="(booking, index) in bookings"
                :key="index"
                :numid="booking.booking_id"
                :userName="booking.user.username"
                :status="booking.status"
                :date="booking.reservation_at"
                @approve="approveBooking"
                @cancel="cancelBooking"
              />
            </div>
          </div>

          <!-- Return no bookings available if there are no bookings -->
          <div
            v-show="!showBookings && (!bookings || bookings.length === 0)"
            class="no-bookings"
          >
            <p>No bookings available</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="other-profile-page">
      <div v-show="role === 'studio'" class="map-container">
        <div class="map-placeholder">Map goes here</div>
      </div>
      <div v-show="role === 'designer' || role === 'user'" class="bg-container">
        <div class="bg-tattoo"></div>
      </div>

      <div class="text-center w-full relative -top-36">
        <div class="flex flex-col">
          <img
            class="mx-auto rounded-full t-0 w-64 h-64 object-cover border border-gray-300"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaddILQkLdcENBnMQyl7RyvmSlVizrlW42Lg&s"
            alt="Profile Image"
          />
          <h2 class="text-3xl font-bold mt-4">{{ name }}</h2>
        </div>

        <!-- Buttons Section -->

        <div class="button-container">
          <button
            @click="viewDetail"
            class="px-4 py-2 w-44 bg-orange-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 hover:translate-y-1"
          >
            View Detail
          </button>
          <button
            @click="chat"
            class="px-4 py-2 w-44 bg-[#f7cd03] text-white rounded transition duration-300 ease-in-out transform hover:bg-white hover:text-[#f7cd03] hover:border hover:border-[#f7cd03] hover:translate-y-1"
          >
            Chat
          </button>
          <button
            @click="createbooking"
            class="px-4 py-2 w-44 bg-blue-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 hover:translate-y-1"
          >
            Booking
          </button>
        </div>

        <!-- Tattoo Image Gallery or Booking Management -->
        <div>
          <div v-show="role === 'studio' || role === 'designer'">
            <div v-show="showBookings" class="gallery">
              <TattooCard
                v-for="(image, index) in images"
                :key="index"
                :imgSrc="image.src"
                :altText="image.alt"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TattooCard from "@/components/TattooCard.vue";
// import ButtonComponent from "@/components/Button.vue";
import BookingMnCard from "@/components/BookingMnCard.vue";

import axios from "axios";
import CreatePostModal from "@/components/CreatePostModal.vue";
export default {
  name: "ProfilePage",
  components: {
    TattooCard,
    // ButtonComponent,
    BookingMnCard,
    CreatePostModal,
  },
  mounted() {
    this.getUserDetail();
    this.getUserId();
    console.log(this.userId);
  },
  data() {
    return {
      userId: {},
      role: "",
      name: "",
      showBookings: true,
      isModalVisible: false,
      images: [
        { src: "/assets/Categories/91.jpg", alt: "1" },
        { src: "/assets/Categories/92.jpg", alt: "2" },
        { src: "/assets/Categories/93.png", alt: "3" },
        { src: "/assets/Categories/94.jpg", alt: "4" },
        { src: "/assets/Categories/95.png", alt: "5" },
        { src: "/assets/Categories/96.jpg", alt: "6" },
      ],
      bookings: [],
    };
  },

  methods: {
    async getUserId() {
      try {
        const userResponse = await axios.get("/user/userWithRole");
        console.log(userResponse.data, "asdasdassd");
        this.userId = userResponse.data["ID"];
        console.log(userResponse.data, "after");
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    },
    getUserDetail() {
      axios
        .get(`/public/profile?id=${this.$route.params.id}`)
        .then((res) => {
          var response_data = res.data["Details"];
          console.log(response_data);
          this.role = response_data["role"];
          this.name =
            response_data["first_name"] + "  " + response_data["last_name"];
          // this.setUserData(response_data)
        })
        .catch((err) => {
          console.error(
            "Error:",
            err.response ? err.response.data : err.message
          );
        });
    },
    createbooking() {
      console.log("Edit Profile clicked");
      this.$router.push(`/booking/${this.userId}/${this.$route.params.id}`);
    },
    chat() {
      console.log("Edit Profile clicked");
      this.$router.push(`/chat/${this.userId}/${this.$route.params.id}`);
    },
    viewDetail() {
      console.log("View Detail clicked");
      this.$router.push(`/viewdetail/${this.$route.params.id}`);
    },
    editProfile() {
      console.log("Edit Profile clicked");
      this.$router.push("/editprofile");
    },
    createPost() {
      console.log("Create Post clicked");
    },
    manageBooking() {
      this.showBookings = !this.showBookings; // Toggle the showBookings state
      console.log("Manage Booking clicked:", this.showBookings);
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    getBookings() {
      this.showBookings = !this.showBookings;
      axios
        .get("/studio/bookings")
        .then((res) => {
          console.log("Response data:", res.data.bookings);
          this.bookings = res.data.bookings;
        })
        .catch((err) => console.error("Error fetching bookings:", err));
    },
    approveBooking(bookingId) {
      console.log("booking_id", bookingId);
      axios
        .put(`/studio/bookings/${bookingId}/confirm`)
        .then(() => {
          const booking = this.bookings.find((b) => b.id === bookingId);
          if (booking) booking.status = "Approved";
        })
        .catch((err) => console.error("Error approving booking:", err));
    },
    cancelBooking(bookingId) {
      axios
        .delete(`/studio/bookings/${bookingId}`)
        .then(() => {
          this.bookings = this.bookings.filter((b) => b.id !== bookingId);
        })
        .catch((err) => console.error("Error canceling booking:", err));
    },
  },
};
</script>

<style scoped>
.profile-header {
  text-align: center;
  margin: 20px;
}

.profile-picture {
  border-radius: 50%;
  width: 150px;
  height: 150px;
}

.map-container {
  height: 300px;
  background-color: #e3e3e3;
}

.bg-container {
  height: 300px;
  background-color: #e3e3e3;
  border-bottom: 8px solid white;
  background: linear-gradient(135deg, #6b7280, #f3f4f6);
}

.bg-tattoo {
  width: 120%;
  height: 100%;
  background-image: url("https://images.ctfassets.net/cnu0m8re1exe/7Bm0KvDGVSttBQc0DdLsi9/27d66dab9bf0896634aa52db0a611702/Untitled_design.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: -4px;
  filter: blur(2px);
}

.gallery {
  display: flex;
  justify-content: space-around;
}

.bookingmncard {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(250px, 1fr)
  ); /* Adjusts to screen size */
  gap: 20px; /* Space between cards */
  padding: 20px 50px;
  justify-content: center;
  max-width: 1280; /* Set a max-width to contain the grid */
  margin: 0 auto;
}

.booking-card {
  width: 100%; /* Full width within the grid */
}

.button-container {
  text-align: center;
  margin: 20px;
}

/* Button animations */
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}

button:hover {
  transform: scale(1.05); /* Slight zoom */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
  transform: translateY(-3px);
}

button:active {
  transform: scale(0.95); /* Scale down when clicked */
  background-color: rgba(
    255,
    255,
    255,
    0.473
  ); /* Change background color on click */
}

.profile-page {
  animation: fade-in 1s ease-in;
}
</style>
