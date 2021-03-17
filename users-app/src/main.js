import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;
// Axios.baseURL = "http://127.0.0.1:8000";

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthorized) {
      next("/");
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresLogged)) {
    if (store.getters.isAuthorized) {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
