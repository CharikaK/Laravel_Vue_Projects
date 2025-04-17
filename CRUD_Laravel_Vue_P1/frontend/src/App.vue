<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="dark:bg-slate-950 bg-slate-700">
    <!-- <HelloWorld msg="You did it!" /> -->

    <nav
      class="container max-w-md mx-auto flex items-center justify-between px-6 py-4"
    >
      <div class="flex space-x-2">
        <RouterLink class="text-slate-200" to="/">Home</RouterLink>
        <RouterLink class="text-slate-200" to="/dashboard"
          >Dashboard</RouterLink
        >
        <RouterLink class="text-slate-200" to="/dashboard/posts"
          >Posts</RouterLink
        >
      </div>

      <div class="flex space-x-2">
        <span v-if="!authStore.isLoggedIn">
          <RouterLink class="text-slate-200" to="/login">Login</RouterLink>
        </span>

        <RouterLink class="text-slate-200" to="/register">Register</RouterLink>
      </div>
    </nav>
  </div>

  <main class="max-w-6xl mx-auto bg-slate-100 dark:bg-slate-900 min-h-screen">
    <div class="mb-6">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
