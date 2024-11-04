<template>
  <div class="popup">
    <div class="popup-content">
      <span class="close-btn" @click="closePopup">&times;</span>
      <div class="split left">
        <p>Welcome Back</p>
        <h1>Login</h1>
        <form @submit.prevent="submitForm">
          <div class="flex flex-row relative">
            <label class="mr-2" for="username">Username</label>
            <p v-if="checkError" class="text-red-500 text-base">
              Invalid username or password
            </p>
          </div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            v-model="username"
            required
            autocomplete="off"
          />
          <div class="flex flex-row relative">
            <label class="mr-2" for="password">password</label>
            <p v-if="checkError" class="text-red-500 text-base">
              Invalid username or password
            </p>
          </div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            v-model="password"
            required
            autocomplete="off"
          />
          <button type="submit">Login</button>
        </form>
        <p class="signup-text">
          Don't have an account yet? &nbsp;<a href="#" @click="openSelect"
            >Sign up for free</a
          >
        </p>
      </div>
      <div class="split right"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPopup",
  data() {
    return {
      username: "",
      password: "",
      checkError: false,
    };
  },
  methods: {
    async submitForm() {
      console.log(`Username: ${this.username}, Password: ${this.password}`);
      const payload = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("/public/login", payload)
        .then((res) => {
          console.log("response:", res.headers);
          this.$store.dispatch("login");
          this.$emit("isLogin");
          this.$router.push({ path: "/" }).then(() => {
            window.location.reload();
          });
          this.closePopup();
        })
        .catch((err) => {
          console.error(
            "Error:",
            err.response ? err.response.data : err.message
          );
          this.checkError = true;
        });
    },
    openSelect() {
      this.$emit("open-select");
    },
    closePopup() {
      this.$emit("close-popup");
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background-color: white;
  border-radius: 40px;
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: space-between;
}

.split {
  height: 100%;
  width: 35%;
  padding-top: 20px;
  display: flex;
  border-radius: 40px;
}

.left {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.left h1 {
  text-align: left;
  width: 100%;
  margin: 0;
  font-size: 3.5rem;
  font-weight: 400;
  margin-bottom: 20px;
}

.left p {
  text-align: left;
  width: 100%;
  margin: 0;
}

.left .signup-text {
  text-align: center;
  color: gray;
}

a {
  color: black;
  text-decoration: none;
}

.right {
  background-image: url("../../public/assets/login-img.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

form {
  display: inherit;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
}

input {
  height: 45px;
  width: 100%;
  border-radius: 4px;
  color: white;
  background-color: black;
  border: none;
  margin-bottom: 20px;
  padding-left: 10px;
}

input:focus {
  background-color: black;
  color: white;
  outline: none;
}

::placeholder {
  color: white;
}

button {
  width: 25%;
  height: 40px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: auto;
  display: block;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
}

.close-btn {
  position: relative;
  left: 2%;
  top: 2%;
  font-size: 2rem;
  cursor: pointer;
  height: fit-content;
}
</style>
