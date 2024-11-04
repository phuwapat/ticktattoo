<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
  />
  <div>
    <Navbar />
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view />
</template>

<script>
// import Footer from './components/Footer.vue';
import Navbar from "./components/Navbar.vue";
// import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    // Footer,
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
@import url("https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Inria Serif", serif;
}
.no-scroll {
  overflow: hidden;
}
</style>
