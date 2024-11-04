<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
      <h2 class="text-xl font-bold flex justify-center">Create Post</h2>
      <hr class="m-2" />
      <div class="profile flex"></div>
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

          <div class="bt grid grid-cols-2 gap-5">
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
              Post
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
  name: "CreatePostModal",
  data() {
    return {
      data: { Details: {} },
      categories: [
        "Blackwork",
        "Water Color",
        "Geometric",
        "Pointillism",
        "Surrealism",
      ], // ค่าเริ่มต้นเป็น ALL
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async fetchProfileName() {
      try {
        const response = await axios.get(`/public/profile?id=${this.id}`);
        console.log("detail", response.data);
        this.data = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },

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
    submitForm() {
      const bookingSchema = z.object({
        title: z.string().min(1, "Please enter a title"),
        description: z.string().min(1, "Please enter a description"),
        imgTattoo: z
          .array(z.instanceof(File))
          .min(1, "Upload at least 1 tattoo design")
          .max(5, "You can only upload up to 5 files"),
      });

      const result = bookingSchema.safeParse(this.formData);
      if (!result.success) {
        this.errors = result.error.flatten().fieldErrors;
      } else {
        this.errors = {}; // Clear errors if form is valid

        // Build form data
        const formDataToSend = new FormData();
        formDataToSend.append("title", this.formData.title);
        formDataToSend.append("content", this.formData.description);
        this.formData.imgTattoo.forEach((file) => {
          formDataToSend.append("images", file);
        });
        this.formData.category.forEach((item) => {
          formDataToSend.append("category", item);
        });

        console.log(this.formData);
        // Log formData
        for (let pair of formDataToSend.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        axios
          .post("/studio/postCreate", formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          })
          .then((res) => {
            console.log("response:", res.data);
          })
          .catch((err) => {
            console.error(
              "Error:",
              err.response ? err.response.data : err.message
            );
          });
      }
      this.closeModal();
    },
  },
  setup() {
    const formData = reactive({
      title: "",
      description: "",
      imgTattoo: [],
      category: [],
    });

    const errors = ref({});
    const tattooFileLimitExceeded = ref(false);

    // const bookingSchema = z.object({
    //   title: z.string().min(1, "Please enter a title"),
    //   description: z.string().min(1, "Please enter a description"),
    //   imgTattoo: z
    //     .array(z.instanceof(File))
    //     .min(1, "Upload at least 1 tattoo design")
    //     .max(5, "You can only upload up to 5 files"),
    // });

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

    return {
      formData,
      errors,
      tattooFileLimitExceeded,
      uploadTattooDesign,
      // submitForm,
    };
  },
  mounted() {
    this.userId = this.$route.params.chatPartnerId; // ดึงค่า id จาก route params
    this.fetchProfileName();
    console.log("Response From Outside", this.userData); // เรียกฟังก์ชันดึงข้อมูล
  },
};
</script>

<style scoped>
.name {
  font-size: 16px; /* adjust text size as needed */
}
</style>
