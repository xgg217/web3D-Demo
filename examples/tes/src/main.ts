import "./assets/main.css";
import "element-plus/dist/index.css";

// import 'highlight.js/styles/atom-one-dark.css'
// import 'highlight.js/lib/common'
// import hljsVuePlugin from '@highlightjs/vue-plugin'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.use(hljsVuePlugin);

app.mount("#app");
