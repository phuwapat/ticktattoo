<template>
  <div class="popup">
    <div class="popup-content">
      <span class="close-btn" @click="closePopup">&times;</span>
      <div class="content">
        <p>Hi There! &nbsp;{{ role }}</p>
        <h1>Sign Up</h1>
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="username">Username</label>
              <input type="text" id="username" v-model="formData.username" />
              <p v-if="errors.username" class="text-red-600 pl-2">
                {{ errors.username }}
              </p>
            </div>

            <div class="flex flex-col">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                v-model="formData.password"
              />
              <p v-if="errors.password" class="text-red-600 pl-2">
                {{ errors.password }}
              </p>
            </div>

            <div class="flex flex-col">
              <label for="firstname">Firstname</label>
              <input type="text" id="firstname" v-model="formData.firstname" />
              <p v-if="errors.firstname" class="text-red-600 pl-2">
                {{ errors.firstname }}
              </p>
            </div>

            <div class="flex flex-col">
              <label for="lastname">Lastname</label>
              <input type="text" id="lastname" v-model="formData.lastname" />
              <p v-if="errors.lastname" class="text-red-600 pl-2">
                {{ errors.lastname }}
              </p>
            </div>

            <div class="flex flex-col">
              <label for="gender">Gender</label>
              <select id="gender" v-model="formData.gender">
                <option value="" disabled selected>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <p v-if="errors.gender" class="text-red-600 pl-2">
                {{ errors.gender }}
              </p>
            </div>

            <div class="flex flex-col">
              <label for="phone">Phone number</label>
              <input type="text" id="phone" v-model="formData.phone" />
              <p v-if="errors.phone" class="text-red-600 pl-2">
                {{ errors.phone }}
              </p>
            </div>

            <div class="flex flex-col">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="formData.email" />
              <p v-if="errors.email" class="text-red-600 pl-2">
                {{ errors.email }}
              </p>
            </div>

            <div v-if="role == 'STUDIO'" class="flex flex-col">
              <label for="studioName">Studio name</label>
              <input
                type="text"
                id="studioName"
                v-model="formData.studioName"
              />
              <p v-if="errors.studioName" class="text-red-600 pl-2">
                {{ errors.studioName }}
              </p>
            </div>
            <button type="submit" class="col-span-2">Register</button>
          </div>
        </form>
        <p class="signup-text">
          Already Have An Account? &nbsp;<a href="#" @click="openLogin"
            >Sign In</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { z } from "zod";
import axios from "axios";

export default {
  name: "RegisterPopup",
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = reactive({
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
      gender: "",
      email: "",
      studioName: "",
    });

    const errors = ref({});
    const thaiPhoneNumberRegex = /^0[2-9]\d{8}$/;
    // Validation schema based on role
    const bookingSchema = z.object({
      username: z.string().min(1, "Username must include more than 1 letter"),
      password: z.string().min(1, "Password must include more than 1 letter"),
      firstname: z.string().min(1, "firstname must include more than 1 letter"),
      lastname: z.string().min(1, "firstname must include more than 1 letter"),
      gender: z.string().min(1, "gender must be select"),
      email: z.string().email("Invalid email address"),
      phone: z.string().regex(thaiPhoneNumberRegex, "Invalid phone number"),
      studioName: z
        .string()
        .min(1, "Please provide a valid studioName")
        .optional(), // Optional based on role
    });

    const validateForm = () => {
      try {
        // Conditionally remove location validation for non-STUDIO roles
        if (props.role !== "STUDIO") {
          delete formData.studioName;
        }
        bookingSchema.parse(formData);
        errors.value = {};
        return true;
      } catch (e) {
        errors.value = e.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        return false;
      }
    };

    const submitForm = () => {
      if (!validateForm()) {
        console.log("Validation failed:", errors.value);
        return;
      }

      const formDataToSend = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        first_name: formData.firstname,
        last_name: formData.lastname,
        gender: formData.gender,
        tel: formData.phone,
        register_as: props.role.toLowerCase(),
      };
      if (props.role === "STUDIO") {
        formDataToSend.studio_name = formData.studioName;
      }

      axios
        .post("/public/register", formDataToSend)
        .then((res) => {
          console.log("response:", res.data);
          closePopup();
        })
        .catch((err) => {
          console.error(
            "Error:",
            err.response ? err.response.data : err.message
          );
        });
    };

    const closePopup = () => {
      emit("close-popup");
      console.log("check in");
    };

    const openLogin = () => {
      emit("open-login");
    };

    return {
      formData,
      errors,
      submitForm,
      closePopup,
      openLogin,
    };
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background-color: white;
  border-radius: 40px;
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  position: relative;
}

.content {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content h1 {
  text-align: left;
  width: 100%;
  margin: 0;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 20px;
}

.content p {
  text-align: left;
  width: 100%;
  margin: 0;
}

.content .signup-text {
  text-align: center;
  color: gray;
}

a {
  color: black;
  text-decoration: none;
}

form {
  display: inherit;
  flex-direction: column;
  width: 100%;
}

input,
select {
  height: 45px;
  width: 100%;
  border-radius: 4px;
  color: white;
  background-color: black;
  border: none;
  margin-bottom: 20px;
  padding-left: 10px;
}

input:focus {
  background-color: black;
  color: white;
  outline: none;
}

::placeholder {
  color: white;
}

button {
  width: 25%;
  height: 40px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: auto;
  display: block;
  font-size: 1.5rem;
  margin-bottom: 20px;
}
button:hover {
  background-color: rgb(161, 161, 161);
}

p {
  font-size: 1rem;
}

.close-btn {
  position: absolute;
  left: 2%;
  top: 2%;
  font-size: 2rem;
  cursor: pointer;
  height: fit-content;
}
</style>
