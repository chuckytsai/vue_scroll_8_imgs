import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);

// 以store為資料倉庫
app.use(store).mount("#app");
