import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "element-plus/theme-chalk/base.css";
import "element-plus/dist/index.css";
import "./assets/css/index.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
