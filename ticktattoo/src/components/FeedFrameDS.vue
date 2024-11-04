<template>
  <router-link>
    <div class="feed-f">
    <FeedCardDS
      v-for="(card, index) in feedData" 
      :key="index" 
      :content="card.content" 
      :categories="card.categories" 
      :images="card.images"
    />
    </div>
  </router-link>
</template>

<script>
import FeedCardDS from './FeedCardDS.vue';

export default {
    name:"FeedFrameDS",
    components:{
        FeedCardDS
    },
    data() {
    return {
      feedData: [
        {
          content: "Dj.Nino",
          categories: ["Surrealism", "Pointillism"],
          images: [
            { src: "/assets/Categories/91.jpg", alt: "1" },
            { src: "/assets/Categories/92.jpg", alt: "2" },
            { src: "/assets/Categories/93.png", alt: "3" },
            { src: "/assets/Categories/94.jpg", alt: "4" },
            { src: "/assets/Categories/95.png", alt: "5" },
            { src: "/assets/Categories/96.jpg", alt: "6" }
          ]
        },
        {
          content: "Future and Friend",
          categories: ["Blackwork", "Water Color"],
          images: [
            { src: "/assets/Categories/Dotwork.jpg", alt: "1" },
            { src: "/assets/Categories/Minimal.jpg", alt: "2" },
            { src: "/assets/Categories/Tribal.jpg", alt: "3" },
          ]
        },
        {
          content: "PookantakuaShop",
          categories: ["Geometric"],
          images: [
            { src: "/assets/Categories/Quote.jpg", alt: "1" },
            { src: "/assets/Categories/Realistic.jpg", alt: "2" },
            { src: "/assets/Categories/95.png", alt: "4" },
            { src: "/assets/Categories/96.jpg", alt: "5" }
          ]
        },
      ]
    };
  }
}
</script>

<style scoped>

</style>