<script setup lang="ts">
import { useRoute } from "vue-router";
import axiosInstance from "@/lib/axios";
import { watch, ref } from "vue";
import type { Post } from "@/types";

const route = useRoute();

const post = ref<Post | null>(null); // I am keeping this to demonstrate another way using the post.

// This must be taken from usePostStore. but I am keeping it here to demonstrate another way using the getPost function.
const getPost = async (slug: string | string[]) => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/posts/${slug}`);
    post.value = data.data;
  } catch (e) {
    console.error(e);
  }
};

watch(
  () => route.params.slug,
  (slug) => getPost(slug),
  { immediate: true }
);
</script>

<template>
  <section>
    <div>
      <h1 class="text-3xl text-slate-200 p-4">{{ post?.title }}</h1>
      <span class="text-sm text-slate-200 p-4"
        >Created as: {{ post?.createdAt }}</span
      >
    </div>
    <div class="flex flex-col items-center">
      <div
        class="max-w-md max-auto bg-slate-950 rounded-lg p-4 dark:text-white"
      >
        {{ post?.body }}
      </div>
    </div>
  </section>
</template>
