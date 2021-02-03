import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/tailwind.css";
import { projectAuth } from "@/firebase/config";

Vue.config.productionTip = false;

let app = null;

// Wait until Fire has finished it's auth before creating the app
projectAuth.onAuthStateChanged(() => {
  // Init app if not already created
  if (!app) {
    app = new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
