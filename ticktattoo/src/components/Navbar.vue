<template>
  <nav>
    <div>
      <ul>
        <li><img class="logo" src="../../public/assets/Logo.svg" alt="" /></li>
        <li><a href="/">HOME</a></li>
        <li><router-link :to="`/designer`">DESIGNER</router-link></li>
        <li><router-link :to="`/studio`">STUDIOS</router-link></li>
        <div class="dropdown">
          <li>CATEGORY</li>
          <div class="dropdown-content">
            <router-link :to="`/explore/Blackwork`"> Blackwork </router-link>
            <router-link :to="`/explore/Water Color`">
              Water Color
            </router-link>
            <router-link :to="`/explore/Geometric`"> Geometric </router-link>
            <router-link :to="`/explore/Pointillism`">
              Pointillism
            </router-link>
            <router-link :to="`/explore/Surrealism`"> Surrealism </router-link>
          </div>
        </div>
        <div class="searchbox">
          <div class="search-wrapper">
            <i class="fa-solid fa-magnifying-glass" style="color: black"></i>
            <input
              type="text"
              placeholder="Search..."
              @focus="toggleDropdown"
              @blur="hideDropdown"
              @keyup.enter="logSearch"
              @input="fetchSuggestions"
              v-model="search"
            />
          </div>
          <ul
            v-show="showDropdown && suggestions.length"
            class="search-dropdown absolute right-50 mt-14 p-2 text-white z-10 w-1/3 max-h-52 overflow-y-auto"
          >
            <li
              v-for="suggestion in suggestions"
              :key="suggestion.id"
              @mousedown.prevent="selectSuggestion(suggestion.name)"
              class="cursor-pointer w-full border-b-2 border-black py-1 hover:bg-black hover:text-white"
            >
              <div class="flex flex-row">
                <img
                  :src="
                    suggestion.image
                      ? formatPath(suggestion.image)
                      : '/assets/defaultProfile.png'
                  "
                  alt="Studio Image"
                  style="width: 40px; height: 40px; margin-left: 5px"
                  class="mr-4 rounded-full object-cover"
                />
                <span>{{ suggestion.name }}</span>
                <!-- <span>Park</span> -->
              </div>
            </li>
          </ul>
        </div>
      </ul>
    </div>
    <div>
      <ul>
        <li v-if="isLogin" @click="toggleNotifications">
          <i class="fa-solid fa-bell"></i>
          <div
            class="absolute top-6 right-41 bg-red-600 w-3 h-3 rounded-full"
            v-if="notificationCount > 0"
          ></div>
        </li>
        <div class="dropdown" v-if="isLogin">
          <li>
            <div class="logined-form">
              <img
                class="mx-auto rounded-full t-0 w-12 h-12 object-cover"
                :src="profile"
                alt="Profile Image"
              />
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </li>
          <div class="dropdown-content2">
            <router-link :to="`/profile/${userData.ID}`">
              My Profile
            </router-link>
            <a href="#" @click="Logout">Logout</a>
          </div>
        </div>
        <li v-else>
          <div class="login-btn" @click="openLogin">
            LOGIN
            <i class="fa-solid fa-user" style="color: #ffffff"></i>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <router-link :to="`/chat/${userData.ID}/1`"
    ><div
      class="fixed bottom-5 left-5 z-50 w-16 h-16 bg-gray-300 rounded-full justify-center flex items-center cursor-pointer"
    >
      <i class="fas fa-comments text-3xl text-black"></i></div
  ></router-link>
  <NotificationList
    v-show="showNotifications"
    @update-count="updateNotificationCount"
    @finishAct="showNotifications = !showNotifications"
  />

  <ParentComponent @is-login="Login" ref="parentComponent" />
</template>

<script>
import ParentComponent from "./ParentComponent.vue";
import NotificationList from "./NotificationList.vue";
import axios from "axios";
export default {
  name: "NavbarComponent",
  components: {
    ParentComponent,
    NotificationList,
  },

  data() {
    return {
      search: "",
      suggestions: [],
      maxSuggestions: 5,
      isLogin: false,
      showNotifications: false,
      notificationCount: 0,
      showDropdown: false,
      profile: "/assets/defaultProfile.png",
      userData: {},
    };
  },
  mounted() {
    this.checkLogin();
    this.fetchData();
    console.log(this.userData.ID);
  },
  methods: {
    async fetchData() {
      const userResponse = await axios.get("/user/userWithRole");
      this.userData = userResponse.data;
    },
    fetchSuggestions() {
      if (this.search.trim() === "") {
        this.suggestions = [];
        return;
      }
      axios
        .get(`/public/search?searchText=${this.search}`)
        .then((response) => {
          this.suggestions = response.data.map((item) => ({
            name: item.name,
            image: item.profile_path,
            id: item.ID,
          }));
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
      console.log("kuy", this.suggestions);
    },
    getUserProfile() {
      axios.get("/user/getProfile").then((res) => {
        if (res.data["profile_image"] != "") {
          this.profile = this.formatPath(res.data["profile_image"]);
          console.log(this.profile);
        }
      });
    },
    formatPath(profilePath) {
      if (typeof profilePath !== "string") {
        console.error("Invalid path: profilePath should be a string");
        return "";
      }
      const baseURL = axios.defaults.baseURL;
      const formattedPath = profilePath.replace(/^\.\//, "");
      const newPath = `${baseURL}${formattedPath}`;
      return newPath;
    },

    toggleDropdown() {
      this.showDropdown = true;
    },
    hideDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 100);
    },
    selectSuggestion(suggestion) {
      axios
        .post("/api/select-suggestion", { name: suggestion.name })
        .then((response) => {
          console.log("Suggestion sent to backend:", response.data);
          // this.$router.push({ name: 'StudioProfile', params: { name: suggestion.name } }); //ส่วน route หน้า
        })
        .catch((error) => {
          console.error("Error sending suggestion to backend:", error);
        });
    },
    logSearch() {
      console.log(this.search);
    },
    checkLogin() {
      axios
        .get("/public/checkLogin")
        .then((res) => {
          if (res.data["login"]) {
            this.getUserProfile();
            this.Login();
            this.$store.dispatch("login");
          }
        })
        .catch((err) => {
          console.error(
            "Error:",
            err.response ? err.response.data : err.message
          );
        });
    },
    openLogin() {
      this.$refs.parentComponent.openLoginPopup();
    },
    Login() {
      this.isLogin = true;
      console.log("in");
    },
    checkCookie() {
      const savedCookie = localStorage.getItem("Authorise");
      if (savedCookie) {
        alert(`Cookie from localStorage: ${savedCookie}`);
      } else {
        alert("No cookie found in localStorage");
      }
    },
    Logout() {
      axios
        .post("/public/logout")
        .then((res) => {
          console.log("response:", res.data);
          this.$router.push("/");
        })
        .catch((err) => {
          console.error(
            "Error:",
            err.response ? err.response.data : err.message
          );
        });
      this.isLogin = false;
      this.$store.dispatch("logout");
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    updateNotificationCount(count) {
      this.notificationCount = count;
      console.log("count: ", this.notificationCount);
    },
  },
  computed: {
    displayedSuggestions() {
      return this.suggestions.slice(0, this.maxSuggestions);
    },
    filteredSuggestions() {
      return this.suggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  watch: {
    search(newValue) {
      console.log("Search value:", newValue);
    },
    displayedSuggestions(newValue) {
      console.log(newValue);
    },
    suggestions(newValue) {
      console.log(newValue);
    },
  },
};
</script>
<style scoped>
nav {
  background-color: black;
  height: auto;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ul {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  align-items: center;
}

li {
  padding-right: 40px;
  cursor: pointer;
  letter-spacing: 3px;
}

nav li:hover {
  color: #595959;
}

.logo {
  width: 70px;
  height: 70px;
  margin-left: 20px;
}

.login-btn {
  padding: 5px 10px 5px 10px;
  border-radius: 14px;
  cursor: pointer;
}

.dropdown {
  margin-top: 20px;
  float: left;
  overflow: hidden;
  height: 55px;
}

.dropdown-content,
.dropdown-content2 {
  display: none;
  position: absolute;
  background-color: #595959;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 19px;
}
.dropdown-content2 {
  font-size: 1.2rem;
  min-width: 60px;
  margin-top: 6px;
}
.dropdown-content a,
.dropdown-content2 a {
  float: none;
  color: white;
  padding: 1px 14px;
  display: block;
  text-align: left;
  text-decoration: none;
  border-bottom: 2px solid black;
  margin: 10px;
}
.dropdown-content2 a {
  text-align: right;
  padding: 6px 8px;
}

.dropdown-content a:hover,
.dropdown-content2 a:hover {
  background-color: black;
}

.dropdown-content2 a:nth-child(2):hover {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.dropdown:hover .dropdown-content,
.dropdown:hover .dropdown-content2 {
  display: block;
}

.searchbox {
  display: flex;
  justify-content: center;
  color: black;
}

.search-wrapper {
  position: relative;
}

.search-wrapper input {
  width: 30vw;
  height: 30px;
  border-radius: 15px;
  padding-left: 40px;
  border: none;
}

.search-wrapper input:focus {
  border: none;
  outline: none;
}

.search-wrapper i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.search-dropdown {
  display: flex;
  flex-direction: column;
  background-color: #595959;
  width: 30vw;
}

.search-dropdown li:hover {
  color: white;
}

.profile {
  content: "";
  width: 36px;
  height: 36px;
  background-color: white;
  border-radius: 100px;
}

.logined-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.logined-form i {
  padding-left: 20px;
}
</style>
