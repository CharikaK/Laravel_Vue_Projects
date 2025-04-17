import { defineStore } from "pinia";
import type { LoginForm, User } from "@/types";
import { ref } from "vue";
import axiosInstance from "@/lib/axios";
import router from "@/router/router";
import { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";
import type { Post, LaravelResponseCollection, postForm } from "@/types"; // Import the Post type

export const usePostStore = defineStore(
  "post",
  () => {
    const postCollection = ref<LaravelResponseCollection<Post> | null>(null); // to store the posts
    const post = ref<Post | null>(null); // to store a single post
    const isLoading = ref<boolean>(false); // to show loading state

    const getPosts = async (page: number) => {
      isLoading.value = true;
      try {
        const { data } = await axiosInstance.get(
          `/dashboard/posts?page=${page}`
        );
        postCollection.value = data;
      } catch (e) {
        console.error(`Error from post - getPosts ${e}`);
      } finally {
        isLoading.value = false;
      }
    };

    const getPost = async (slug: string) => {
      isLoading.value = true;
      try {
        const { data } = await axiosInstance.get(`/dashboard/posts/${slug}`);
        post.value = data.data;
      } catch (e) {
        console.error(`Error from post - getPost ${e}`);
      } finally {
        isLoading.value = false;
      }
    };

    // payload is the input values
    // node is we are taking input values from the form
    const createPost = async (payload: postForm, node?: FormKitNode) => {
      try {
        await axiosInstance.post("/dashboard/posts", payload);

        router.push("/dashboard/posts");
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
          // Handle validation errors
          node?.setErrors([], e.response.data.errors);
        }
      }
    };

    const updatePost = async (
      slug: string,
      payload: postForm,
      node?: FormKitNode
    ) => {
      try {
        await axiosInstance.put(`/dashboard/posts/${slug}`, payload);
        await router.push("/dashboard/posts");
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
          // Handle validation errors
          //console.error("Validation errors:", e.response?.data.errors);
          node?.setErrors([], e.response.data.errors); // Set the errors in the formkit
        }
      }
    };

    return {
      postCollection,
      post,
      isLoading,
      getPosts,
      getPost,
      createPost,
      updatePost,
    };
  },

  {
    persist: {
      storage: sessionStorage,
      pick: ["user", "isLoggedIn"], // Only persist these properties
    },
  }
);
