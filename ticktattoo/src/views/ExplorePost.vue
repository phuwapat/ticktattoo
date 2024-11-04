<template>
  <div class="Explore-F">
    <div v-if="isLoading" class="no-posts-container">
      <p class="no-posts-message">Loading...</p>
    </div>
    <div
      v-else-if="!feedData || feedData.length === 0"
      class="no-posts-container"
    >
      <img src="/assets/No-Post.png" alt="No Posts" class="no-posts-img" />
      <p class="no-posts-message">No Post At This Time</p>
    </div>
    <div
      v-else
      class="card-f grid custom:grid-cols-4 2xl:grid-cols-5 md:grid-cols-3 ml-[50px]"
    >
      <div class="categories col-span-full">
        <div class="flex space-x-4 py-4 justify-start ml-[15px]">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="{
              'bg-[#474747] text-white': selectedCategory === category,
              'bg-gray-200 text-gray-700': selectedCategory !== category,
            }"
            class="px-4 py-2 rounded-md font-semibold text-xl"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div v-for="post in filteredFeedData" :key="post.name">
        <div class="flex items-center">
          <ExploreCard
            :name="post.name"
            :title="post.title"
            :content="post.content"
            :images="post.images"
            :idpost="post.postid"
            :currentuserid="userData.ID"
            :studioid="post.postownerid"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ExploreCard from "@/components/ExploreCard.vue";

export default {
  name: "ExplorePost",
  components: {
    ExploreCard,
  },
  data() {
    return {
      categories: [
        "ALL",
        "Blackwork",
        "Water Color",
        "Geometric",
        "Pointillism",
        "Surrealism",
      ],
      selectedCategory: "ALL",
      feedData: [],
      userData: {},
      isLoading: true,
    };
  },
  computed: {
    filteredFeedData() {
      if (this.selectedCategory === "ALL") {
        return this.feedData;
      } else {
        return this.feedData.filter((post) =>
          post.category.includes(this.selectedCategory)
        );
      }
    },
  },
 created() {
    const category = this.$route.params.category || "ALL";
    this.selectedCategory = category;
    this.fetchData();
  },
  beforeRouteUpdate(to, from, next) {
    const category = to.params.category || "ALL";
    this.selectedCategory = category;
    this.fetchData(); // Fetch data based on the new category
    next(); // Proceed with the route update
  },
  methods: {
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
    selectCategory(category) {
    this.selectedCategory = category;
    const categoryPath = category === "ALL" ? "/explore" : `/explore/${category}`;
    this.$router.push({ path: categoryPath });
    },

    async fetchData() {
      try {
        // Fetch posts
        const feedResponse = await axios.get("/public/posts");
        this.feedData = feedResponse.data.map((post) => ({
          postownerid: post.Studio.UserID,
          postid: post.ID,
          name: post.Studio.studio_name,
          title: post.title,
          content: post.content,
          category: post.category,
          images: post.images.map((image) => ({
            src: this.formatPath(image.file_path),
            alt: "image",
          })),
        }));
        console.log(this.feedData);

       // Fetch user data
        const userResponse = await axios.get("/user/userWithRole");
        this.userData = userResponse.data;

        // console.log("Feed Data:", this.feedData);
        // console.log("User Data:", this.userData);

        this.$emit("is-login", true);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.no-posts-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.no-posts-img {
  width: 700px;
  height: auto;
}

.no-posts-message {
  font-size: 25px;
  color: #555;
  margin-top: 20px;
}
</style>