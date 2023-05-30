import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import IdPage from "../pages/IdPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/attraction/:id", component: IdPage },
  ],
});

export default router;
