import { createApp } from "vue";
import App from "./App.vue";
import { initAnalytics } from "@/lib/analytics";
import "./styles.css";

initAnalytics();
createApp(App).mount("#app");
