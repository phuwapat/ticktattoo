<template>
    <div class="image-container">
        <router-link :to="linkRt">
        <img :src="imgSrc" :alt="altText" class="image" />
        <div class="text-overlay">{{ altText }}</div>
        </router-link>
        

    </div>
</template>

<script>
export default {
    name:'CategoriesPic',
    props: {
    imgSrc: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: 'image'
    },
    linkRt:{
        type: String,
        required: true
    }
  }

}
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image {
  display: block;
  width: 250px;
  height: 150px;
  border-radius: 10px;
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
.text-overlay {
  position: absolute;
  top: 0px; 
  left: 0px; 
  color: white; 
  font-size: 17px;
  padding: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
</style>