<template>
  <div class="categories-f bg-use-grey rounded-lg mx-5 my-4 p-4">
    <div class="title">
      <h1 class="text-2xl ml-7 pb-2 font-medium">Categories</h1>
    </div>
    <div class="image-row">
      <CategoriesPic
        imgSrc="/assets/blackwork-img.jpg"
        altText="Blackwork"
        linkRt="/explore/Blackwork"
      />
      <CategoriesPic
        imgSrc="/assets/water-color-img.jpg"
        altText="Water Color"
        linkRt="/explore/Water Color"
      />
      <CategoriesPic
        imgSrc="/assets/geometric-img.jpg"
        altText="Geometric"
        linkRt="/explore/Geometric"
      />
      <CategoriesPic
        imgSrc="/assets/Pointillism-img.jpg"
        altText="Pointillism"
        linkRt="/explore/Pointillism"
      />
      <CategoriesPic
        imgSrc="/assets/Surrealism-img.jpg"
        altText="Surrealism"
        linkRt="/explore/Surrealism"
      />
    </div>
  </div>
</template>

<script>
import CategoriesPic from "./CategoriesPic.vue";

export default {
  name: "CategoriesPage",
  components: {
    CategoriesPic,
  },
};
</script>

<style scoped>
.image-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
