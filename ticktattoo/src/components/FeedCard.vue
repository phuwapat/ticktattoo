<template>
  <div class="feed-card-container bg-use-grey rounded-lg mx-5 my-4 py-4">
    <div class="grid grid-cols-6 gap-2 mb-1">
      <FeedPicture
        v-for="(image, index) in images"
        :key="index"
        :imgSrc="formatPath(image)"
        :altText="image.alt"
      />
    </div>
    <div class="content">
      <div class="dest ml-6">
        <div class="flex justify-between items-center">
          <div class="text-lg font-semibold">
            Studio : {{ content }}
            <span class="text-sm text-gray-500">(สยามสแควร์ 4)</span>
            <span
              class="bg-yellow-500 text-white text-sm font-bold py-1 px-2 rounded-lg ml-2"
            >
              <i class="fa fa-star mr-2"></i>4.0
            </span>
          </div>
        </div>
        <div class="mt-2 text-sm text-gray-600 font-semibold flex items-center">
          Categories:
          <div class="categories-container flex ml-2">
            <div
              class="category-item border border-gray-300 rounded-lg px-1 py-0.5 mr-2 inline-block"
              v-for="(category, index) in categories"
              :key="index"
            >
              {{ category }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeedPicture from "./FeedPicture.vue";
import axios from "axios";

export default {
  name: "FeedCard",
  components: {
    FeedPicture,
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
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
      return newPath;
    },
  },
};
</script>

<style scoped>
.feed-card-container {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* เพิ่ม transition เพื่อให้เอฟเฟกต์ลื่นไหล */
}

.feed-card-container:hover {
  transform: scale(1.03); /* ขยายขนาดเล็กน้อยเมื่อ hover */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* เพิ่มเงาเมื่อ hover */
}

.category-item {
  background-color: #f9f9f9; /* สีพื้นหลัง */
  border: 1px solid #ccc; /* สีกรอบ */
  border-radius: 5px; /* มุมโค้ง */
  padding: 3px 8px; /* ปรับ padding ให้เล็กลง */
  margin-right: 5px; /* ระยะห่างระหว่างหมวดหมู่ */
  display: inline-block;
  font-size: 0.875rem; /* ขนาดตัวอักษร */
  color: #333; /* สีตัวอักษร */
}
</style>
