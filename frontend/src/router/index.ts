import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/useAuthStore";
const LoginPage = () => import("../pages/LoginPage.vue");
const DashboardPage = () => import("../pages/DashboardPage.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardPage,
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isInitialized) {
    await authStore.handleLogin();
  }

  if (!authStore.user && to.name !== "login") {
    return next({ name: "login" });
  }

  next();
});

export default router;
