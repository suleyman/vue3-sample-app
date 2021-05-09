import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./config/i18n";
import { store } from "./store";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);
app.use(Antd);
app.use(router);
app.use(store);
app.use(i18n);
app.mount("#app");
