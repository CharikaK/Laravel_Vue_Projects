<script setup lang="ts">
import { AxiosError } from "axios";
import axiosInstance from "../../lib/axios";
import type { RegistrationForm } from "@/types";
import { reactive } from "vue";
import router from "@/router/router";
import { useAuthStore } from "@/store/auth";

const auth = useAuthStore();

// Scalability of the code can be compared with Login and Registration Views
// This Register View is created using default Vue Template + Tailwind NOT with FormKit.
// Therefore we need reactive RegistrationForm as the payload, errors object to store errors
// and store response errors within the catch block

const form = reactive<RegistrationForm>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = reactive({
  name: [],
  email: [],
  password: [],
});
const register = async (payload: RegistrationForm) => {
  await axiosInstance.get("/sanctum/csrf-cookie", {
    baseURL: "http://localhost:8000",
  });

  // clear the errors
  errors.name = [];
  errors.email = [];
  errors.password = [];
  try {
    console.log("Registering....");
    await axiosInstance.post("/register", payload);
    await auth.getUser(); // not the isLogged = true(auth.ts) for the router.js to show the dashboard
    router.push("/dashboard");
  } catch (e) {
    console.error(e);

    if (e instanceof AxiosError && e.response?.status === 422) {
      errors.name = e.response.data.errors.name;
      errors.email = e.response.data.errors.email;
      errors.password = e.response.data.errors.password;
    }
  }
};
</script>

<template>
  <div>
    <h1 class="text-3xl text-slate-200 p-4">Register</h1>

    <form class="max-w-sm mx-auto p-4" @submit.prevent="register(form)">
      <div class="mb-5">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your name</label
        >
        <input
          type="name"
          id="name"
          v-model="form.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="first last"
        />
        <template v-if="errors.name?.length">
          <span
            v-for="error in errors.name"
            :key="error"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </span>
        </template>
      </div>
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label
        >
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
        />
        <template v-if="errors.email?.length">
          <span
            v-for="error in errors.email"
            :key="error"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </span>
        </template>
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          type="password"
          id="password"
          v-model="form.password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <template v-if="errors.password?.length">
          <span
            v-for="error in errors.password"
            :key="error"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </span>
        </template>
      </div>
      <div class="mb-5">
        <label
          for="password_confirmation"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Password confirmation</label
        >
        <input
          type="password"
          id="password_confirmation"
          v-model="form.password_confirmation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register
      </button>
    </form>
  </div>
</template>
