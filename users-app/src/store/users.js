import {useHttp} from '../mixins/http.mixin'

const TOKEN = localStorage.getItem('token')
const url = "http://127.0.0.1:8000"
const setTokenToHeaders = {
  Authorization: `Token ${TOKEN}`
}
export default {
  state: {
    isAuthenticated: !!TOKEN,
    userToken: TOKEN || null,
    users: []
  },
  mutations: {
    UPDATE_DATA(state, payload) {
      state.users = payload;
    },
    UPDATE_USER_INFO(state, payload) {
      state.users.map(user => {
        if (user.id === payload.id) {
          user.name = payload.name;
          user.username = payload.username;
          user.avatar = payload.avatar;
          user.phone = payload.phone;
          user.email = payload.email;
          user.department = payload.department;
        }
      });
    },
    REMOVE_USER(state, payload) {
      state.users = state.users.filter(item => item.id !== payload);
    },
    CREATE_USER_CARD(state, payload) {
      state.users.push(payload);
    },
    CHANGE_STATE_USER(state, payload) {
      state.isAuthenticated = payload;
    },
    FETCH_DATA(state, data) {
      state.users = data;
    },
    LOG_OUT(state) {
      state.isAuthenticated = false;
    },
    SET_USER_TOKEN(state, payload) {
      state.userToken = payload;
      state.isAuthenticated = true;
    }
  },
  actions: {
    async register({commit}, payload) {
      try {
        console.log(payload)
       const response = await fetch("http://127.0.0.1:8000/rest-auth/registration/", {
         method: "POST",
         headers: headers,
         body: JSON.stringify(payload),
         
       })
        const data = await response.json()
        commit("SET_USER_TOKEN", data.key)
        localStorage.setItem("token", data.key)
        return true
      } catch(e) {
        return new Error(e.message || "Что то пошло не так...")
      }
    },
    async getAllUserDepositAccounts({commit}) {
      try {
        const response = await useHttp(`/api/bank/account/`, "GET", null, {setTokenToHeaders})
        commit("UPDATE_DATA", response)
        console.log(response)
      } catch (e) {
        return new Error(e.message || "Error system...")
      }
    },
    async createDepositAccount({commit, dispatch}, payload) {
      try{
        const response = await useHttp(`/api/bank/account/`, "POST", payload, {setTokenToHeaders})
        console.log(response)
        dispatch('getAllUserDepositAccounts')
        return true

      }catch(e){
        return new Error(e.message || "System error...")
      }
    },
    logout({ commit }) {
      commit("LOG_OUT", null);
      localStorage.removeItem("isAuthentication");
      return true;
    },
    login({ commit }, payload) {
      console.log(payload)
      if (payload.email === "admin@admin.com" && payload.password === "123") {
        commit("CHANGE_STATE_USER", true);
        localStorage.setItem("isAuthentication", true);
        return true;
      } else return false;
    },
    updateUserInfo({ commit }, payload) {
      console.log("payload", payload);
      commit("UPDATE_USER_INFO", payload);
      return true;
    },
    removeUserHandler({ commit }, payload) {
      if (payload > 0) {
        commit("REMOVE_USER", payload);
        return true;
      }
    },
    createUserCard({ commit }, payload) {
      console.log("payload", payload);
      if (payload) {
        commit("CREATE_USER_CARD", payload);
        return true;
      } else return false;
    }
  },
  getters: {
    getUsersData: state => state.users,
    getUsersDataLength: state => state.users.length,
    isAuthorized: state => state.isAuthenticated
  }
};
