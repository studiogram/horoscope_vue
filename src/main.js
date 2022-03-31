import { createApp } from "vue";
import { createStore } from "vuex";

import App from "./App.vue";

const app = createApp(App);

const store = createStore({
  state() {
    return {
      serviceEmailJS: "service_xr6ludl",
      templateEmailJS: "template_cjp9562",
      idEmailJS: "qx2yJ0Nw4Kv8uP-tx",
    };
  },
});

app.use(store);
app.mount("#app");
