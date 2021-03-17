import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import transaction from "./transaction";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // isAuthenticated: false
  },
  mutations: {},
  actions: {},
  modules: {
    users,
    transaction
  }
});