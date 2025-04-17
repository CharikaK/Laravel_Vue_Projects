import { createRouter, createMemoryHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/auth/Dashboard.vue";
import PostIndex from "@/views/posts/PostIndex.vue";
import PostCreate from "@/views/posts/PostCreate.vue";
import PostEdit from "@/views/posts/PostEdit.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import { useAuthStore } from "@/store/auth";
import PostView from "@/views/posts/PostView.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { requireAuth: true }, // if authorized
    },
    {
      path: "/dashboard/posts",
      name: "PostIndex",
      component: PostIndex,
      meta: { requireAuth: true }, // if authorized
    },
    {
      path: "/dashboard/posts/create",
      name: "PostCreate",
      component: PostCreate,
      meta: { requireAuth: true }, // if authorized
    },
    {
      path: "/dashboard/posts/:slug",
      name: "PostView",
      component: PostView,
      meta: { requireAuth: true }, // if authorized
      props: true,
    },
    {
      path: "/dashboard/posts/:slug/edit",
      name: "PostEdit",
      component: PostEdit,
      meta: { requireAuth: true }, // if authorized
      props: true,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { requireGuest: true },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { requireGuest: true },
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/404.vue"),
    },
    {
      path: "/500",
      name: "500",
      component: () => import("@/views/500.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.matched.some((record) => record.meta.requireAuth) && !auth.isLoggedIn)
    next({ name: "Login" });
  else if (
    to.matched.some((record) => record.meta.requireGuest) &&
    auth.isLoggedIn
  )
    next({ name: "Dashboard" });
  else next();
});
export default router;
