import "../styles/styles.css";

import "./components/app-bar";
import "./components/footer-bar";
import swRegister from "./utils/sw-register";
import NotificationHelper from "./utils/notification-helper";

import App from "./pages/app";

const app = new App({
  content: document.querySelector("#main-content"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
  NotificationHelper.init();
});
