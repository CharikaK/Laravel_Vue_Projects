import "./assets/main.css";
import router from "./router/router.js";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { plugin, defaultConfig } from "@formkit/vue";
import config from "../formkit.config";
//import "@formkit/themes/genesis";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

//createApp(App).mount('#app')
const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(plugin, defaultConfig(config));
app.use(router);
app.use(pinia);
app.use(ToastPlugin);
app.mount("#app");
