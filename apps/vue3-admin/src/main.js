import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");

/** @type {import('./types').DatabaseConfig} */
const dbConfig = {
  host: 111,
  // ...
};
console.log(dbConfig);
