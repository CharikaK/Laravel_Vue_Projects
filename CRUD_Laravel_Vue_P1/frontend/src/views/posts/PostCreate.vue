<script setup lang="ts">
import { usePostStore } from "@/store/post";
import { FormKitNode } from "@formkit/core";
const { createPost } = usePostStore();
</script>
<template>
  <div>
    <div>
      <h1 class="text-3xl text-slate-200 p-4">Create Post</h1>
      <div class="max-w-md mx-auto bg-slate-950 rounded-lg p-4">
        <FormKit type="form" submit-label="Create" @submit="createPost">
          <FormKit type="text" label="Title" name="title" />
          <FormKit type="textarea" label="Body" name="body" />
        </FormKit>
      </div>
    </div>
  </div>
</template>
