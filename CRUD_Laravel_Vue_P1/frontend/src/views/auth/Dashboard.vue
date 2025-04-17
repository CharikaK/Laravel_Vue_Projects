<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";

const auth = useAuthStore();
onMounted(()=>{
  if(!auth.isLoggedIn) auth.getUser();
})
auth.getUser(); // to assign the user using the cookie, when the user is logged in
</script>

<template>
  <div>
    <h1 class="text-3xl text-slate-200">Dashboard</h1>
    <div class="flex items-center justify-between">
      <div>
        <p class="text-lg text-slate-200">
          Welcome back, {{ auth.user?.name }}
        </p>
        <p class="text-sm text-slate-200">{{ auth.user?.email }}</p>
      </div>
      <button @click="auth.logout" class="btn btn-primary">Logout</button>
    </div>
  </div>
</template>
