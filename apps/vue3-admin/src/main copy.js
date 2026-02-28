//// @ts-check
/**
 * @typedef {Object} DatabaseConfig
 * @property {string} host - 数据库主机地址
 * @property {number} port - 数据库端口
 * @property {string} username - 用户名
 * @property {string} password - 密码
 * @property {string} database - 数据库名称
 * @property {boolean} [ssl] - 是否启用 SSL（可选）
 */

// import { createApp } from "vue";
// import "./style.css";
// import App from "./App.vue";

// createApp(App).mount("#app");

/** @type {DatabaseConfig} */
const dbConfig = {
  host: 111,
  port: 3306,
  username: "root",
  password: "secret",
  database: "myapp",
  ssl: true,
};
console.log(dbConfig);
