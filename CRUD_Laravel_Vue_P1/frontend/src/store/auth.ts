import { defineStore } from "pinia";
import type { LoginForm, User } from "@/types";
import { ref } from "vue";
import axiosInstance from "@/lib/axios";
import router from "@/router/router";
import { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // ref() = This comes from Vue's Composition API — it's used to create a reactive reference to a value.
    // When the value changes, the UI will reactively update
    // <> = data type. In here User interface | null types
    // () = initially user is null
    const user = ref<User | null>(null);
    const isLoggedIn = ref<boolean>(false);

    // to use in the Login.vue
    const login = async (payload: LoginForm, node?: FormKitNode) => {
      await axiosInstance.get("/sanctum/csrf-cookie", {
        baseURL: "http://localhost:8000",
      });

      try {
        await axiosInstance.post("/login", payload);
        await getUser(); // isLoggedIn = true
        router.push("/dashboard"); // redirecting
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
          node?.setErrors([], e.response.data.errors);
        }
      }
    };

    // to use in the Dashboard.vue
    const getUser = async () => {
      if(isLoggedIn.value)return // Otherwise we can see it is hitting the endpoint to get user all the time
      try {
        const response = await axiosInstance.get("/user");
        user.value = response.data;
        isLoggedIn.value = true;
      } catch (e) {
        console.error(`Error from dashboard - user ${e}`);
      }
    };

    const cleanState = () => {
      user.value = null;
      isLoggedIn.value = false;
    };
    const logout = async () => {
      try {
        await axiosInstance.post("/logout");
        /* user.value ={
          name:'',
          email:''
      } */
        // instead of above we can say below to clear the values
        user.value = null;
        isLoggedIn.value = false;
      } catch (e) {
        console.error(`Error from Dashboard ${e}`);
      }
    };

    // returning properties and the methods
    return {
      user,
      isLoggedIn,
      login,
      getUser,
      logout,
      cleanState,
    };
  },
  {
    persist: true, // this is to keep our states persistence during refresh
  }
);
