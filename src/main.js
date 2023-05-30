import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";

const app = createApp(App);

// 以store為資料倉庫
app.use(store).use(router).mount("#app");
