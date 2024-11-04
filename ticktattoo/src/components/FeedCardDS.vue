<template>
  <div class="feed-card-container bg-use-grey rounded-lg mx-5 my-4 py-4">
    <div class="grid grid-cols-6 gap-2 mb-1">
      <FeedPicture 
        v-for="(image, index) in images" 
        :key="index" 
        :imgSrc="image.src" 
        :altText="image.alt" 
      />
    </div>
    <div class="content">
      <div class="dest ml-6">
        <div class="flex justify-between items-center">
          <div class="text-lg font-semibold">
            Designer : {{ content }}
          </div>
        </div>
        <!-- Categories -->
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
import FeedPicture from './FeedPicture.vue';

export default {
  name: "FeedCardDS",
  components: {
    FeedPicture
  },
  props: {
    content: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  }
}
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