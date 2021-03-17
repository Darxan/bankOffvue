<template>
  <div class="about">
    <h1>
      Users account list.
      <el-button type="text">
        <el-checkbox v-model="hideZero"
          >Hide zero balance</el-checkbox
        ></el-button
      >
    </h1>
    <el-container class="centered" v-if="accountsData.length">
      <el-row class="user_list" :gutter="10">
        <el-col
          :sm="24"
          :md="12"
          :lg="6"
          v-for="item in accountsData"
          :key="item.id"
        >
          <UserCard :account="item" />
        </el-col>
      </el-row>
    </el-container>
    <el-container class="centered" v-else>
      <el-alert
        title="This is now active wallet create please"
        type="warning"
        show-icon
      >
      </el-alert>
    </el-container>
    <el-row class="add_button">
      <el-button size="small" type="warning" @click="depositHistoryHandler"
        >Deposit history</el-button
      >
      <el-button size="small" type="warning" @click="transactionHistoryHandler"
        >Transaction history</el-button
      >
      <el-button size="small" type="danger" @click="createNewWallet"
        >New Wallet</el-button
      >
    </el-row>

    <DepositList
      v-if="depositDialog"
      :depositDialog="depositDialog"
      :history="depositHistory"
      @closeDepositDialog="closeDepositDialog"
    />
    <TransactionHistory
      v-if="transactionDialog"
      :transactionDialog="transactionDialog"
      :history="transactionHistory"
      @closeDialog="closeTransactionDialog"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import UserCard from "../components/UserCard";
import DepositList from "../components/DepositHistoryComponent";
import TransactionHistory from "../components/TransactionHistoryComponent";
export default {
  name: "dashboard",
  data: () => {
    return {
      depositDialog: false,
      transactionDialog: false,
      hideZero: false,
      depositHistory: [],
      transactionHistory: []
    };
  },
  async mounted() {
    await this.$store.dispatch("getUserAccounts");
  },
  components: {
    UserCard,
    DepositList,
    TransactionHistory
  },
  methods: {
    ...mapActions(["getUserAccounts", "getTransactionHistory"]),

    async depositHistoryHandler() {
      this.depositHistory = await this.$store.dispatch("getDepositHistory");
      this.depositDialog = true;
    },
    async transactionHistoryHandler() {
      this.transactionHistory = await this.getTransactionHistory();
      this.transactionDialog = true;
    },
    closeDepositDialog() {
      this.depositDialog = false;
    },
    closeTransactionDialog() {
      this.transactionDialog = false;
    },
    createNewWallet() {
      this.$store.dispatch("createNewAccount");
    }
  },
  computed: {
    accountsData() {
      if (this.hideZero) {
        return this.$store.getters.getUsersData.filter(
          elem => elem.balance > 0
        );
      } else return this.$store.getters.getUsersData;
    }
  }
};
</script>

<style>
.centered {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 1366px;
  padding: 0 15px;
  width: 100%;
}
.user_list {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
}
.user_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
}
.el-card__body {
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.add_button {
  position: fixed;
  bottom: 10%;
  right: 5%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
