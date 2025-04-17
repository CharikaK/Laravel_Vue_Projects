import router from "@/router/router";
import { useAuthStore } from "@/store/auth";
import axios from "axios";
import {useToast} from 'vue-toast-notification';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  withXSRFToken: true,
});
//backend > config> cors.php > 'supports_credentials' => true,
// laravel sanctum document

// Displaying error messages
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const auth = useAuthStore();
    const $toast = useToast();
    switch (error.response.status) {
      case 401: // cookies deleted
        auth.cleanState();
        $toast.error("Unauthorized");
        router.push("/login");
        break;
      case 404:
        $toast.error("Page Not Found");
        router.push("/404");
        break;
      case 419:
        auth.cleanState();
        router.push("login");
        break;
      case 500:
        $toast.error("Internal Server Error");
        router.push("/500");
        break;
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
