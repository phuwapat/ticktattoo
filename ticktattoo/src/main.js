/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router"; // Import the router
import store from "./store/index.js";

axios.defaults.baseURL = "http://127.0.0.1:8080/";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

createApp(App).use(router).use(store).mount("#app");
