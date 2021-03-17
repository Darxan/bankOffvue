import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "home",
    component: Home
  },
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
    component: () => import("../components/LoginPage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

// router.beforeEach((to, from, next) => {
//   if (store.state.isAuthenticated) {
//     next();
//   } else {
//     next("/");
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.IsAuthenticated) {
//       next("/");
//     } else {
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.requiresLogged)) {
//     if (store.getters.IsAuthenticated) {
//       next("/users");
//     } else {
//       next("/");
//     }
//   } else {
//     next();
//   }
// });
export default router;
