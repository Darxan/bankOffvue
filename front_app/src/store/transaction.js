import useHttp from "../mixins/http.mixins";

const contentHeader = { ["Content-Type"]: `application/json` };

const TOKEN = localStorage.getItem("token");

export default {
  state: {},
  mutations: {},
  actions: {
    async createTransaction({ dispatch }, payload) {
      try {
        const response = await useHttp(
          `/api/bank/transaction/`,
          "POST",
          payload,
          { Authorization: `Token ${TOKEN}` }
        );
        await dispatch("getUserAccounts");
        return await response.json();
      } catch (e) {
        return new Error(e.message || "System error...");
      }
    },
    async getTransactionHistory() {
      try {
        const response = await useHttp(
            `/api/bank/transaction/`,
            "GET",
            null,
            {Authorization: `Token ${TOKEN}`}
        );
        const data = await response.json();
        console.log(data);
        return await data;
      } catch (e) {
        return new Error(e.message || "System error...");
      }
    }
  },
  getters: {}
};
