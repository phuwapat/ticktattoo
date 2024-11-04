<template>
    <div>
      <div class="image-container ml-4">
          <img :src="imgSrc" :alt="altText" class="image" />
      </div>
    </div>
</template>

<script>
export default {
    name:"TattooCard",
    props: {
    imgSrc: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: 'image'
    },
    }
}
</script>

<style scoped>

.image-container {
  display: inline-block;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.image {
  display: block;
  width: 200px;
  height: 180px;
  border-radius: 10px;
  box-shadow: 10cap;
  border: 2px;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-container:hover {
  transform: scale(1.05); /* Slight zoom on hover */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
}

.image:hover {
  transform: scale(1.1); /* More zoom on the image itself */
}
</style>