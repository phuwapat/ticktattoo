<template>
  <div
    class="bg-white text-white min-h-screen flex items-center justify-center"
  >
    <div class="w-3/5 max-w-screen-lg bg-black rounded-lg p-10 mt-6 mb-6">
      <form @submit.prevent="submitForm">
        <div class="flex border-b-2 pb-5 items-center mb-6">
          <img
            class="w-20 h-20 rounded-full mr-4"
            :src="image ? formatPath(image) : '/assets/defaultProfile.png'"
            alt="Avatar"
          />
          <div>
            <h2 class="text-xl font-semibold">
              {{ username }}
            </h2>
            <p class="text-sm">THIS IS MY DESCRIPTION</p>
          </div>
        </div>

        <div class="mb-16 relative">
          <div class="flex flex-row">
            <label class="block text-xl mb-2 select-none pointer-events-none"
              >ลายที่คุณต้องการสัก ?</label
            >
            <p v-if="errors.imgTattoo" class="text-red-600 pl-2 pt-1">
              {{ errors.imgTattoo[0] }}
            </p>
          </div>
          <div class="bg-gray-700 p-4 rounded-lg text-center">
            <input
              type="file"
              class="hidden"
              id="tattoo-design"
              @change="uploadTattooDesign"
            />
            <label for="tattoo-design" class="cursor-pointer">
              <div
                class="flex flex-col items-center select-none pointer-events-none"
              >
                <i class="fa-regular fa-image fa-5x"></i>
                <p>Drop photo or select</p>
              </div>
            </label>
            <p v-if="tattooFileLimitExceeded" class="text-red-600">
              You can only upload up to 5 files.
            </p>
          </div>
          <ul class="flex flex-col items-start select-none">
            <li v-for="(file, index) in formData.imgTattoo" :key="index">
              {{ file.name }}
            </li>
          </ul>
          <router-link
            :to="`/chat/${this.$route.params.userId}/${this.$route.params.chatPartnerId}`"
          >
            <button
              class="bg-green-600 text-white py-2 px-4 mt-2 rounded-lg absolute right-0"
            >
              ต้องการให้ร้านออกแบบให้?
            </button>
          </router-link>
        </div>

        <div class="mb-6">
          <div class="flex flex-row align-center">
            <label class="block text-xl mb-2 select-none pointer-events-none"
              >ขนาดที่ต้องการสัก ?</label
            >
            <p v-if="errors.size" class="text-red-600 pl-2 pt-1">
              {{ errors.size[0] }}
            </p>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <button
              type="button"
              v-for="(size, index) in sizes"
              :key="index"
              @click="selectSize(index)"
              :class="{
                'bg-green-600': selectedSize === index,
                'bg-gray-700': selectedSize !== index,
              }"
              class="p-4 rounded-lg text-center"
            >
              <p>{{ size }}</p>
            </button>
          </div>
        </div>

        <div class="mb-6">
          <div class="flex flex-row">
            <label class="block text-xl mb-2 select-none pointer-events-none"
              >ตำแหน่งที่ต้องการสัก ?</label
            >
            <p v-if="errors.imgPosition" class="text-red-600 pl-2 pt-1">
              {{ errors.imgPosition[0] }}
            </p>
          </div>
          <div class="bg-gray-700 p-4 rounded-lg text-center">
            <input
              type="file"
              class="hidden"
              id="tattoo-position"
              @change="uploadTattooPosition"
            />
            <label for="tattoo-position" class="cursor-pointer">
              <div
                class="flex flex-col items-center select-none pointer-events-none"
              >
                <i class="fa-regular fa-image fa-5x"></i>
                <p>Drop photo or select</p>
              </div>
            </label>
            <p v-if="positionFileLimitExceeded" class="text-red-600">
              You can only upload up to 5 files.
            </p>
          </div>
          <ul class="flex flex-col items-start select-none">
            <li v-for="(file, index) in formData.imgPosition" :key="index">
              {{ file.name }}
            </li>
          </ul>
        </div>

        <div class="mb-6 select-none">
          <div class="flex flex-row">
            <label class="block text-xl mb-2">คำอธิบายเพิ่มเติม</label>
            <p v-if="errors.description" class="text-red-600 pl-2 pt-1">
              {{ errors.description[0] }}
            </p>
          </div>
          <input
            class="w-full p-3 rounded-lg bg-gray-700"
            type="text"
            rows="2"
            placeholder="ข้อมูลเพิ่มเติม"
            v-model="formData.description"
          />
        </div>

        <div class="mb-6">
          <div class="flex flex-row">
            <label class="block text-xl mb-2 select-none pointer-events-none"
              >เบอร์ติดต่อ</label
            >
            <p v-if="errors.tel" class="text-red-600 pl-2 pt-1">
              {{ errors.tel[0] }}
            </p>
          </div>
          <div
            class="flex flex-row items-center space-x-2 bg-gray-700 p-3 rounded-lg text-black select-none"
          >
            <input
              type="text"
              class="bg-transparent outline-none w-full text-white"
              id="phone"
              placeholder="087 888 8888"
              v-model="formData.tel"
            />
          </div>
        </div>

        <div class="mb-6 select-none pointer-events-none">
          <h3 class="text-xl">กฎการจองของร้าน</h3>
          <ul
            class="text-base flex flex-col list-disc text-left items-start pl-5"
          >
            <li>ร้านค้าสามารถปฏิเสธการจอง</li>
            <li>
              เมื่อรับสักตอนยืนยันการจองแล้วจะต้องจ่ายเงินตามที่ตกลงก่อนที่จองสำเร็จ
            </li>
            <li>บลา บลา บลา</li>
          </ul>
        </div>

        <div class="mb-6">
          <h3 class="text-xl select-none pointer-events-none">
            คำแนะนำจากผู้สัก
          </h3>
          <ul
            class="text-base flex flex-col list-disc text-left items-start pl-5 select-none pointer-events-none"
          >
            <li>การสักเป็นสิ่งที่ควรระวังด้วย</li>
            <li>สักกับบ่ต้องสวย</li>
          </ul>
          <div class="mt-2 select-none flex flex-row">
            <input
              type="checkbox"
              id="over-18"
              class="mr-2"
              v-model="formData.checkBox1"
            />
            <label for="over-18" class="text-base select-none"
              >อายุมากกว่า 18 ปี</label
            >
            <p v-if="errors.checkBox1" class="text-red-600 pl-2">
              {{ errors.checkBox1[0] }}
            </p>
          </div>
          <div class="mt-2 select-none flex flex-row">
            <input
              type="checkbox"
              id="agree"
              class="mr-2"
              v-model="formData.checkBox2"
            />
            <label for="agree" class="text-base select-none"
              >ฉันยอมรับข้อตกลงทั้งหมด</label
            >
            <p v-if="errors.checkBox2" class="text-red-600 pl-2">
              {{ errors.checkBox2[0] }}
            </p>
          </div>
        </div>

        <div class="mb-6 select-none">
          <div class="flex flex-row">
            <label class="block text-xl mb-2">เลือกวันที่</label>
            <p v-if="errors.date" class="text-red-600 pl-2 pt-1">
              {{ errors.date[0] }}
            </p>
          </div>
          <input
            type="date"
            class="w-full bg-gray-700 p-3 rounded-lg text-white"
            v-model="formData.date"
          />
        </div>

        <div class="flex justify-end gap-5">
          <button class="bg-red-600 text-white py-2 px-4 rounded-lg">
            ยกเลิกการจอง
          </button>
          <button
            type="submit"
            class="bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            ยืนยันการจอง
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/js/utils.js";
import { ref, onMounted, reactive } from "vue";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "BookingPage",
  data() {
    return {
      data: [],
      username: "",
      image: "",
    };
  },
  setup() {
    const formData = reactive({
      description: "",
      tel: "",
      checkBox1: false,
      checkBox2: false,
      date: "",
      imgTattoo: [],
      imgPosition: [],
      size: "",
      userData: [],
    });

    const errors = ref({});
    const router = useRouter();
    const iti = ref(null);
    const tattooFileLimitExceeded = ref(false);
    const positionFileLimitExceeded = ref(false);
    const sizes = ["5 CM", "5 - 15 CM", "15 - 30 CM", "OVER 30 CM"];
    const selectedSize = ref(null);

    const bookingSchema = z.object({
      description: z.string().min(1, "Please enter a description"),
      tel: z.string().length(10, "Invalid phone number"),
      size: z.string().min(1, "Please select a size"),
      date: z.string().min(1, "Please select a date"),
      imgTattoo: z
        .array(z.instanceof(File))
        .min(1, "Upload at least 1 tattoo design")
        .max(5, "You can only upload up to 5 files"),
      imgPosition: z
        .array(z.instanceof(File))
        .min(1, "Upload at least 1 position design")
        .max(5, "You can only upload up to 5 files"),
      checkBox1: z
        .boolean()
        .refine((val) => val === true, "You must be over 18"),
      checkBox2: z
        .boolean()
        .refine((val) => val === true, "You must agree to the terms"),
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

    const uploadTattooPosition = (event) => {
      const newFiles = Array.from(event.target.files);
      const totalPositionFiles = formData.imgPosition.concat(newFiles);

      if (totalPositionFiles.length > 5) {
        positionFileLimitExceeded.value = true;
      } else {
        positionFileLimitExceeded.value = false;
        formData.imgPosition = totalPositionFiles;
      }
    };

    const selectSize = (index) => {
      selectedSize.value = index;
      formData.size = sizes[index];
    };

    onMounted(() => {
      const input = document.querySelector("#phone");
      iti.value = intlTelInput(input, {
        onlyCountries: ["th"],
        initialCountry: "th",
      });
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js";
      script.async = true;
      document.body.appendChild(script);
    });
    const clearForm = () => {
      formData.description = "";
      formData.tel = "";
      formData.checkBox1 = false;
      formData.checkBox2 = false;
      formData.date = "";
      formData.imgTattoo = [];
      formData.imgPosition = [];
      formData.size = "";
      selectedSize.value = null;
      errors.value = {};
      tattooFileLimitExceeded.value = false;
      positionFileLimitExceeded.value = false;
    };
    const submitForm = (userId) => {
      const result = bookingSchema.safeParse(formData);
      if (!result.success) {
        errors.value = result.error.flatten().fieldErrors;
        console.log(errors.value);
      } else {
        console.log("Form is valid:", result.data);

        const formDataToSend = new FormData();

        formDataToSend.append("studio_id", userId);
        formDataToSend.append("detail", formData.description);
        formDataToSend.append("user_tel", formData.tel);
        formDataToSend.append("get_size", formData.size);
        formDataToSend.append("reservation_at", formData.date);
        formDataToSend.append("checkBox1", formData.checkBox1);
        formDataToSend.append("checkBox2", formData.checkBox2);

        formData.imgTattoo.forEach((file) => {
          formDataToSend.append("tattoo_reference_image", file);
        });

        formData.imgPosition.forEach((file) => {
          formDataToSend.append("position_image", file);
        });

        for (let pair of formDataToSend.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        axios
          .post("/user/bookings", formDataToSend, {
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
        clearForm();
        router.push("/");
      }
    };

    return {
      formData,
      errors,
      iti,
      tattooFileLimitExceeded,
      uploadTattooDesign,
      uploadTattooPosition,
      positionFileLimitExceeded,
      selectSize,
      sizes,
      selectedSize,
      submitForm,
    };
  },
  methods: {
    async fetchProfileName() {
      try {
        const response = await axios.get(`/public/profile?id=${this.userId}`);
        console.log("detail", response.data["Details"]);
        this.username = response.data["Details"]["username"];
        this.image = response.data["Details"]["profile"]["image_url"];
        console.log;
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
  },
  created() {
    this.userId = this.$route.params.chatPartnerId; // ดึงค่า id จาก route params
    this.fetchProfileName();
    console.log("Response From Outside", this.userData); // เรียกฟังก์ชันดึงข้อมูล
  },
};
</script>

<style scoped>
li {
  letter-spacing: 0;
}
.iti {
  --iti-path-flags-1x: url("../../node_modules/intl-tel-input/build/img/flags.webp");
  --iti-path-flags-2x: url("../../node_modules/intl-tel-input/build/img/flags@2x.webp");
  --iti-path-globe-1x: url("../../node_modules/intl-tel-input/build/img/globe.webp");
  --iti-path-globe-2x: url("../../node_modules/intl-tel-input/build/img/globe@2x.webp");
}
</style>
