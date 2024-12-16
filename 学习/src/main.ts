import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { ElLoading } from "element-plus";

const app = createApp(App);

app.use(router);

app.directive("loading", ElLoading.directive);

app.mount("#app");
