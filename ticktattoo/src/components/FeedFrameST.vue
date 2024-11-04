<template>
  <router-link>
    <div class="feed-f">
      <FeedCard
        v-for="(card, index) in feedData"
        :key="index"
        :content="card.studio_name"
        :categories="card.category"
        :images="card.StudioImage"
      />
    </div>
  </router-link>
</template>

<script>
import FeedCard from "./FeedCard.vue";
import axios from "axios";

export default {
  name: "FeedFrameST",
  components: {
    FeedCard,
  },
  data() {
    return {
      feedData: [
        {
          content: "Tattoo&Brother",
          categories: ["Surrealism", "Pointillism"],
          images: [
            { src: "/assets/Categories/91.jpg", alt: "1" },
            { src: "/assets/Categories/92.jpg", alt: "2" },
            { src: "/assets/Categories/93.png", alt: "3" },
            { src: "/assets/Categories/94.jpg", alt: "4" },
            { src: "/assets/Categories/95.png", alt: "5" },
            { src: "/assets/Categories/96.jpg", alt: "6" },
          ],
        },
      ],
    };
  },
  methods: {
    async fetchStudioPreview() {
      try {
        const response = await axios.get("/public/studioPreview");
        console.log("Studio Preview Data:", response.data);
        // คุณสามารถทำการจัดเก็บข้อมูลที่ได้รับจาก API ลงในตัวแปรใน data() ของคุณ เช่น:
        this.feedData = response.data; // สมมติว่าคุณมี studioPreviewData ใน data() ของคุณ
      } catch (error) {
        console.error("Error fetching studio preview:", error);
      }
    },
  },
  mounted() {
    this.fetchStudioPreview();
    console.log(this.feedData, "sadasd");
  },
};
</script>

<style scoped></style>
