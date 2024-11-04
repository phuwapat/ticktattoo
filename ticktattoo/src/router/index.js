import FeedDesignerPage from "@/views/FeedDesignerPage.vue";
import FeedStudio from "@/views/FeedStudioPage.vue";
import BookingPage from "@/views/Booking.vue";
import HomePage from "@/views/Home.vue";
import ProfilePage from "@/views/Profile.vue";
import EditProfilePage from "@/views/EditProfile.vue";
import ViewDetailPage from "@/views/ViewDetail.vue";
import ViewProfilePage from "@/views/ViewProfile.vue";
import FormPost from "@/views/Test.vue";
import ExplorePost from "@/views/ExplorePost.vue";
import ChatMSN from "@/views/Chat.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/booking/:userId/:chatPartnerId",
    name: "Booking",
    component: BookingPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/Studio",
    name: "FeedST",
    component: FeedStudio,
  },
  {
    path: "/Designer",
    name: "FeedDS",
    component: FeedDesignerPage,
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    component: EditProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/viewdetail/:userId",
    name: "ViewDetail",
    component: ViewDetailPage,
  },
  {
    path: "/profile/:userId",
    name: "ViewProfile",
    component: ViewProfilePage,
  },
  {
    path: "/test",
    name: "test",
    component: FormPost,
  },
  {
    path: "/explore/:category?",
    name: "ExplorePost",
    component: ExplorePost,
    props: (route) => ({ selectedCategory: route.params.category || "ALL" }),
  },
  {
    path: "/chat/:userId/:chatPartnerId",
    name: "chat",
    component: ChatMSN,
    meta: { requiresAuth: true },
  },
  // {
  //     path:'/map',
  //     name:'GoogleMap',
  //     component: MapPage
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  console.log("watch 2", to.meta.requiresAuth);

  try {
    const res = await axios.get("/public/checkLogin");
    const isLoggedIn = res.data["login"];

    store.commit("setLogin", isLoggedIn);
    console.log("watch 1", isLoggedIn);

    if (to.meta.requiresAuth && !isLoggedIn) {
      next({ name: "Home" });
    } else {
      next();
    }
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
    next();
  }
});

export default router;
