<template>
  <div class="h-[840px] flex">
    <div class="w-1/4 bg-white border-r border-gray-200">
      <div class="h-full overflow-y-auto">
        <div v-for="(chat, index) in History" :key="index">
          <router-link :to="`/chat/${myid}/${chat.receiver_id}`">
            <div
              class="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            >
              <img
                :src="
                  chat.receiver_image !== ''
                    ? formatPath(chat.receiver_image)
                    : '/assets/defaultProfile.png'
                "
                alt="Profile"
                class="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p class="text-sm font-bold">{{ chat.receiver_name }}</p>
                <p class="text-xs text-gray-500">
                  Last Message: {{ chat.last_message }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div
      v-if="chatPartnerId == '1'"
      class="w-3/4 flex flex-col items-center mt-[120px]"
    >
      <img src="/assets/No-Post.png" alt="No Posts" class="no-posts-img" />
      <p class="no-posts-message">Start Conversation</p>
    </div>
    <div v-else class="w-3/4 flex flex-col">
      <div class="p-4 bg-white border-b border-gray-200 flex items-center">
        <!-- mock รูปฝ่ายตรงข้าม กับ ชื่อ-->
        <img
          :src="image ? formatPath(image) : '/assets/defaultProfile.png'"
          alt="Profile"
          class="w-10 h-10 rounded-full mr-4"
        />
        <p class="text-lg font-bold">{{ username }}</p>
      </div>

      <div class="flex-1 p-4 bg-gray-100 overflow-y-auto">
        <div
          v-for="(chat, index) in formattedChats"
          :key="index"
          :class="chat.sender === 'me' ? 'text-right' : ''"
          class="mb-4"
        >
          <span
            v-if="chat.message !== ''"
            :class="
              chat.sender === 'me'
                ? 'bg-gray-300 text-gray-800'
                : 'bg-gray-200 text-gray-600'
            "
            class="inline-block px-4 py-2 rounded-lg max-w-xs"
          >
            {{ chat.message }}
          </span>
          <div
            v-if="chat.image"
            :class="chat.sender === 'me' ? 'text-right' : ''"
          >
            <img
              :src="chat.image.filePath"
              :alt="'Image for message ' + chat.id"
              :class="[
                'inline-block px-4 py-2 rounded-lg max-w-xs cursor-pointer mt-2 border',
                chat.sender === 'me'
                  ? 'bg-gray-300 border-gray-300 text-gray-800'
                  : 'bg-gray-200 border-gray-200 text-gray-600',
              ]"
              @click="openImageModal(chat.image.filePath)"
            />
          </div>
        </div>
      </div>

      <form @submit.prevent="submitForm">
        <div class="p-4 bg-white border-t border-gray-200 flex items-center">
          <div class="mr-4 p-2 rounded-full bg-gray-300">
            <input
              type="file"
              class="hidden"
              id="tattoo-design"
              @change="uploadTattooDesign"
            />
            <label for="tattoo-design" class="cursor-pointer">
              <i class="fa-regular fa-image fa-2x"></i>
            </label>
          </div>

          <input
            type="text"
            class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Type a message..."
            v-model="formData.sendmessage"
          />

          <button
            type="submit"
            class="ml-4 p-2 rounded-full bg-blue-500 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12H4.5m0 0l7.5-7.5m-7.5 7.5l7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </form>

      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <div class="relative">
          <button
            @click="closeImageModal"
            class="absolute top-2 right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-800"
          >
            ✕
          </button>
          <img
            :src="modalImage"
            alt="Enlarged image"
            class="max-w-md max-h-md rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { reactive } from "vue";
export default {
  name: "ChatMSN",
  data() {
    return {
      myid: "",
      chatPartnerId: "",
      chats: [],
      History: [],
      data: [],
      username: "",
      image: "",
      isModalOpen: false,
      activeChat: {
        profileImg: "/assets/Profile.jpg",
        name: "Tagtoo Studio",
        messages: [
          { text: "ดีครับ", sender: "me" },
          { text: "ดีครับ", sender: "them" },
          { text: "สนใจสักหรอครับพี่", sender: "them" },
          { text: "สนใจครับ", sender: "me" },
        ],
      },
    };
  },

  setup() {
    const formData = reactive({
      sendmessage: "",
      imgTattoo: [],
      //เวลายิง
      receiverid: "",
    });

    const uploadTattooDesign = (event) => {
      const newFiles = Array.from(event.target.files);
      const totalTattooFiles = formData.imgTattoo.concat(newFiles);
      formData.imgTattoo = totalTattooFiles;
    };

    const submitForm = () => {
      // Build form data
      const formDataToSend = new FormData();
      formDataToSend.append("receiver_id", formData.receiverid);
      formDataToSend.append("message", formData.sendmessage);
      formData.imgTattoo.forEach((file) => {
        formDataToSend.append("image", file);
      });

      console.log(formData);
      // Log formData
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      axios
        .post("/user/chat/send", formDataToSend, {
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
    };

    return {
      formData,
      uploadTattooDesign,
      submitForm,
    };
  },
  methods: {
    async fetchChats() {
      try {
        if (!this.chatPartnerId) {
          throw new Error("Chat partner ID is not set");
        }
        const role = await axios.get("/user/userWithRole");
        let path;

        if (role.data.role === "studio") {
          path = `studio/chat/history?receiver_id=${this.chatPartnerId}`;
        } else if (role.data.role === "user") {
          path = `user/chat/history?receiver_id=${this.chatPartnerId}`;
        } else if (role.data.role === "designer") {
          path = `designer/chat/history?receiver_id=${this.chatPartnerId}`; // Define the path for designer notifications
        } else {
          console.error("Unknown role:", role.data.role);
          // Optionally, handle unexpected roles here
        }
        const partner_res = await axios.get("/user/userWithRole");
        partner_res.data;

        let path_history;
        if (role.data.role === "studio") {
          path_history = `studio/chat/list`;
        } else if (role.data.role === "user") {
          path_history = `user/chat/list`;
        } else if (role.data.role === "designer") {
          path_history = `designer/chat/list`; // Define the path for designer notifications
        } else {
          console.error("Unknown role:", role.data.role);
          // Optionally, handle unexpected roles here
        }
        const history_list = await axios.get(path_history);
        console.log(history_list.data, "history_list");
        this.History = history_list.data.chats;

        const response = await axios.get(path);
        // Process chat data
        this.chats = response.data.chats.map((chat) => ({
          id: chat.id,
          senderId: chat.sender_id,
          receiverId: chat.receiver_id,
          message: chat.message,
          timestamp: chat.Timestamp,
          image: chat.image
            ? {
                id: chat.image.id,
                chatId: chat.image.chat_id,
                filePath: this.formatPath(chat.image.file_path),
                fileType: chat.image.file_type,
                fileSize: chat.image.file_size,
                imageType: chat.image.image_type,
              }
            : null,
        }));
      } catch (error) {
        console.error(
          "Error fetching chats:",
          error.response ? error.response.data : error.message
        );
      }
    },
    openImageModal(imageUrl) {
      this.modalImage = imageUrl;
      this.isModalOpen = true;
    },
    closeImageModal() {
      this.modalImage = null;
      this.isModalOpen = false;
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
    async fetchProfileName() {
      try {
        const response = await axios.get(
          `/public/profile?id=${this.chatPartnerId}`
        );
        console.log("detail", response.data["Details"]);
        this.username = response.data["Details"]["username"];
        this.image = response.data["Details"]["profile"]["image_url"];
        console.log;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
  created() {
    this.myid = this.$route.params.userId;
    this.chatPartnerId = this.$route.params.chatPartnerId;
    this.formData.receiverid = this.chatPartnerId;
    this.fetchChats();
    this.fetchProfileName();
    console.log(this.chatPartnerId);
    console.log(this.chatPartnerId === "1");
  },
  beforeRouteUpdate(to, from, next) {
    this.myid = this.$route.params.userId;
    this.chatPartnerId = this.$route.params.chatPartnerId;
    this.formData.receiverid = this.chatPartnerId;
    this.fetchProfileName();
    this.fetchChats(); // Fetch data based on the new category
    next(); // Proceed with the route update
  },

  computed: {
    formattedChats() {
      return this.chats
        .map((chat) => ({
          ...chat,
          sender: chat.receiverId === this.myid ? "them" : "me",
        }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    },
  },
};
</script>
<style scoped>
.scrollarea {
  min-height: 500px;
}

.no-posts-img {
  width: 700px;
  height: auto;
}

.no-posts-message {
  font-size: 25px;
  color: #555;
  margin-top: 20px;
}
</style>
