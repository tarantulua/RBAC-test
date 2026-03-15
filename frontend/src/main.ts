import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/useAuthStore";
import type { RoleName, UserPermissionsSlug } from "./types/user";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.config.globalProperties.$can = (role: RoleName | RoleName[]) => {
  const authStore = useAuthStore();
  return authStore.can(role);
};

app.config.globalProperties.$hasPermission = (
  permission: UserPermissionsSlug,
) => {
  const authStore = useAuthStore();
  return authStore.hasPermission(permission);
};

app.mount("#app");
