import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/",
    name: "login",
    meta: { requiresLogged: true },
    component: () => import("../components/Register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});
export default router;
