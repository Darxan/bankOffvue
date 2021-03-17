import useHttp from "../mixins/http.mixins";

const TOKEN = localStorage.getItem("token");

export default {
  state: {
    isAuthenticated: !!TOKEN,
    userToken: TOKEN || null,
    accounts: [],
    message: null
  },
  mutations: {
    SET_DATA(state, payload) {
      state.accounts = payload;
    },
    REMOVE_ACCOUNT(state, id) {
      state.accounts = state.accounts.filter(acc => acc.id !== id);
    },
    SET_MESSAGE(state, payload) {
      state.message = payload;
    },
    SET_USER_TOKEN(state, payload) {
      state.userToken = payload;
      state.isAuthenticated = true;
    }
  },
  actions: {
    async register({ commit }, payload) {
      try {
        const response = await useHttp(
          `/rest-auth/registration/`,
          "POST",
          payload
        );
        if (response.status === 201) {
          const data = await response.json();
          await commit("SET_USER_TOKEN", data.key);
          commit("SET_MESSAGE", "Success Welcome!");
          await localStorage.setItem("token", data.key);
          return true;
        } else {
          let data = await response.json();
          commit("SET_MESSAGE", data.email[0]);
          return false;
        }
      } catch (e) {
        return new Error(e.message || "Что то пошло не так...");
      }
    },
    async getUserAccounts({ commit, state }) {
      try {
        const response = await useHttp(
          `/api/bank/account/`,
          "GET",
          null,
          { Authorization: `Token ${state.userToken}` }
        );
        if (response.ok) {
          const data = await response.json();
          commit("SET_DATA", data);
        }
      } catch (e) {
        return new Error(e.message || "Error system...");
      }
    },
    async createNewAccount({ dispatch, state }, payload) {
      try {
        const response = await useHttp(
          `/api/bank/account/`,
          "POST",
          payload,
          { Authorization: `Token ${state.userToken}` }
        );
        dispatch("getUserAccounts");
        return await response.json();
      } catch (e) {
        return new Error(e.message || "System error...");
      }
    },
    async fillingInBalance({ dispatch, state }, payload) {
      try {
        const response = await useHttp(
          `/api/bank/action/`,
          "POST",
          payload,
          { Authorization: `Token ${state.userToken}`}
        );
        const data = await response.json();
        await dispatch("getUserAccounts");
        return data;
      } catch (e) {
        return new Error(e.message || "System error...");
      }
    },
    async getDepositHistory({ state }) {
      try {
        const response = await useHttp(
          `/api/bank/action/`,
          "GET",
          null,
          { Authorization: `Token ${state.userToken}` }
        );
        return await response.json();
      } catch (e) {
        return new Error(e.message || "System error...");
      }
    },

    async createTransaction({ state, dispatch, commit }, payload) {
      try {
        const response = await useHttp(
          `/api/bank/transaction/`,
          "POST",
          payload,
          { Authorization: `Token ${state.userToken}` }
        );
        if (response.ok) {
          const result = await response.json();
          commit("SET_MESSAGE", `Your transaction ${result.amount} successfully!` );
          await dispatch("getUserAccounts");
          return true;
        } else if (response.status === 400) {
          const result = await response.json();
          let message = result.amount || result.error;
          commit("SET_MESSAGE", message);
          return false;
        }
      } catch (e) {
        commit("SET_MESSAGE", "Invalid token");
        return false;
      }
    },
    // eslint-disable-next-line no-unused-vars
    removeWalletAction({ commit, dispatch, state }, payload) {
      try {
        useHttp(
          `/api/bank/account/${payload}/`,
          "DELETE",
          null,
          { Authorization: `Token ${state.userToken}` }
        ).then(res => {
          dispatch("getUserAccounts");
          return res.json();
        });
        commit("REMOVE_ACCOUNT", payload);
      } catch (e) {
        return new Error(e.message || "System error...");
      }
    }
  },
  getters: {
    getUsersData: state => state.accounts,
    isAuthorized: state => state.isAuthenticated,
    getMessage: state => state.message
  }
};
