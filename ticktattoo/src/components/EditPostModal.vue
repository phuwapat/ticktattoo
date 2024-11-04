<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
      <h2 class="text-xl font-bold flex justify-center">Edit Post</h2>
      <hr class="m-2" />
      <div class="profile flex">
        <img
          src="/assets/Profile.jpg"
          alt=""
          class="rounded-full w-16 inline-block mr-5 ml-3"
        />
        <span class="name text-3xl font-semibold mt-3">Future</span>
      </div>
      <div class="input mt-3">
        <form @submit.prevent="submitForm">
          <div class="select-none mb-3">
            <input
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="text"
              placeholder="Enter Title Post"
              v-model="formData.title"
            />
            <div class="flex">
              <p v-if="errors.title" class="text-red-600 ml-1">
                {{ errors.title[0] }}
              </p>
            </div>
          </div>

          <div class="select-none mb-3">
            <textarea
              placeholder="Enter Description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              v-model="formData.description"
            ></textarea>
            <div class="flex">
              <p v-if="errors.description" class="text-red-600 ml-1">
                {{ errors.description[0] }}
              </p>
            </div>
          </div>
          <!-- <div v-for="(image, index) in images" :key="index" class="flex items-center mb-4"> -->
            <!-- Checkbox for each image -->
            <!-- <input 
              type="checkbox" 
              class="form-checkbox h-5 w-5 text-indigo-600 mr-4" 
              v-model="selectedImages[index]" 
            /> -->
            <!-- Display the image -->
            <!-- {{ image.src }}
          </div> -->

          <div class="mb-4 relative">
            <div class="bg-gray-100 p-4 rounded-lg text-center">
              <input
                type="file"
                class="hidden"
                id="tattoo-design"
                @change="uploadTattooDesign"
                multiple
              />
              <label for="tattoo-design" class="cursor-pointer">
                <div class="flex flex-col items-center">
                  <i class="fa-regular fa-image fa-5x"></i>
                  <p>Drop photo or select</p>
                </div>
              </label>
              <p v-if="tattooFileLimitExceeded" class="text-red-600">
                You can only upload up to 5 files.
              </p>
            </div>
            <ul class="flex flex-col items-start">
              <li v-for="(file, index) in formData.imgTattoo" :key="index">
                {{ file.name }}
              </li>
            </ul>
            <div class="flex flex-row">
              <p v-if="errors.imgTattoo" class="text-red-600 ml-1">
                {{ errors.imgTattoo[0] }}
              </p>
            </div>
          </div>
          <div class="text-left mb-2 text-lg">Category:</div>
          <div class="grid grid-cols-3 text-left">
            <div
              v-for="category in categories"
              :key="category"
              class="flex items-center"
            >
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :value="category"
                  v-model="formData.category"
                  class="form-checkbox h-4 w-4"
                />
                <span>{{ category }}</span>
              </label>
            </div>
          </div>
          <div class="bt grid grid-cols-3 gap-5">
            <button
              @click="closeModal"
              class="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
            <button
              @click="deletepost()"
              class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { z } from "zod";
import axios from "axios";

export default {
  name: "EditPostModal",
  data() {
    return {// Initialize selectedImages in data
      categories: [
        "Blackwork",
        "Water Color",
        "Geometric",
        "Pointillism",
        "Surrealism",
      ],
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    postid: {
      type: String, // เปลี่ยนเป็น String แทน Array เพื่อใช้ในการสร้าง URL
      required: true,
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },

    deletepost() {
      axios
        .delete(`/studio/post/${this.postid}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("Post deleted successfully:", response.data);
          this.$emit('close'); // Close the modal after deletion
        })
        .catch((error) => {
          console.error("Error deleting post:", error.response ? error.response.data : error.message);
        });
    }
  },
  setup(props, { emit }) {
  const formData = reactive({
    title: "",
    description: "",
    imgTattoo: [],
    category: [],
  });

  const errors = ref({});
  const tattooFileLimitExceeded = ref(false);
  const selectedImages = ref(props.images.map(() => true));

  const bookingSchema = z.object({
    title: z.string().min(1, "Please enter a title"),
    description: z.string().min(1, "Please enter a description"),
    imgTattoo: z
      .array(z.instanceof(File))
      .min(1, "Upload at least 1 tattoo design")
      .max(5, "You can only upload up to 5 files"),
  });

  const uploadTattooDesign = (event) => {
    const newFiles = Array.from(event.target.files);
    const totalTattooFiles = formData.imgTattoo.concat(newFiles);

    if (totalTattooFiles.length > 5) {
      tattooFileLimitExceeded.value = true;
    } else {
      tattooFileLimitExceeded.value = false;
      formData.imgTattoo = totalTattooFiles;
    }
  };

  const submitForm = () => {
    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      errors.value = result.error.flatten().fieldErrors;
    } else {
      errors.value = {}; // Clear errors if form is valid

      const selectedImageList = props.images.filter((_, index) => selectedImages.value[index]);
      formData.imgTattoo = [...formData.imgTattoo, ...selectedImageList];

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.description);

      formData.imgTattoo.forEach((file) => {
        formDataToSend.append("images", file);
      });

      formData.category.forEach((item) => {
        formDataToSend.append("category", item);
      });
      console.log(formData);
      axios
        .put(`/studio/postUpdate/${props.postid}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log("response:", res.data);
          emit('close'); // Use emit here to close the modal
        })
        .catch((err) => {
          console.error(
            "Error:",
            err.response ? err.response.data : err.message
          );
        });
    }
  };

  return {
    formData,
    errors,
    tattooFileLimitExceeded,
    uploadTattooDesign,
    submitForm,
    selectedImages,
  };
},
};
</script>


<style scoped>
.name {
  font-size: 16px; /* adjust text size as needed */
}

@keyframes modal-fade-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.bg-white {
  animation: modal-fade-in 0.5s ease-in-out;
}

button {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
  background-color: #3490dc; /* Change color */
}

button:active {
  transform: scale(0.95);
  background-color: #2779bd; /* Darken when clicked */
}

</style>
