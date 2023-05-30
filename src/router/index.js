import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import IdPage from "../pages/IdPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      // 預設網頁通往首頁
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: HomePage,
    },
    {
      // :orderId(\\d+)只能數字
      path: "/attraction/:orderId(\\d+)",
      name: "IdPage",
      component: IdPage,
    },
  ],
});

export default router;
