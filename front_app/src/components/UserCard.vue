<template>
  <div>
    <el-card shadow="hover" class="user_card">
      <el-row :gutter="10" style="width: 100%">
        <el-col :span="4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
            :alt="account.id"
            class="card_image"
            lazy
            fit="contain"
          />
        </el-col>
        <el-col :span="6" style="text-align: left">
          <div>
            <p>ID: {{ account.id }}</p>
            <p>Balance: {{ account.balance }}</p>
          </div>
        </el-col>
        <el-col :span="14" style="text-align: right">
          <el-tooltip class="item" effect="light" content="Deposit" placement="left-start">
            <el-button
              @click="openDepositModal(account)"
              type="info"
              icon="el-icon-bottom"
              circle
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="Shopping" placement="top">
            <el-button
              icon="el-icon-shopping-cart-2"
              @click="openTransactionModal(account)"
              circle
              type="primary"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="Delete" placement="right-end">
            <el-button
              icon="el-icon-delete"
              @click="removeAccount(account.id)"
              circle
              type="danger"
            ></el-button>
          </el-tooltip>

        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="Deposit Account"
      :visible.sync="depositFormVisible"
      :close-on-click-modal="false"
      width="30%"
      :show-close="false"
    >
      <el-form :model="form" ref="form">
        <el-form-item label="Account id" :label-width="formLabelWidth">
          <el-input
            v-model="form.account"
            autocomplete="off"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="Amount:" :label-width="formLabelWidth">
          <el-input v-model="form.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="dialog-footer">
            <el-button @click="closeModal">Cancel</el-button>
            <el-button type="primary" @click="deposit(account.id)"
              >Deposit</el-button
            >
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="Create Transaction"
      :visible.sync="shopFormVisible"
      :close-on-click-modal="false"
      width="30%"
      :show-close="false"
    >
      <el-form :model="form" ref="form">
        <el-form-item label="Account id" :label-width="formLabelWidth">
          <el-input
            v-model="form.account"
            autocomplete="off"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="Merchant name" :label-width="formLabelWidth">
          <el-input v-model="form.merchant" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Amount:" :label-width="formLabelWidth">
          <el-input v-model="form.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="dialog-footer">
            <el-button @click="closeModal">Cancel</el-button>
            <el-button type="primary" :disabled="!disabledButton" @click="createTransactionHandler(account.id)"
            >Create Transaction</el-button
            >
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
const isNumber = val => {
  return typeof val === "number";
};
import messageMixin from "../mixins/messageMixin";
export default {
  mixins: [messageMixin],
  props: {
    account: { type: Object, required: true }
  },
  data: () => {
    return {
      depositFormVisible: false,
      shopFormVisible: false,
      formLabelWidth: "100px",
      form: {
        account: null,
        merchant: null,
        amount: null
      }
    };
  },
  computed: {
    responseMessage() {
      return this.$store.getters.getMessage;
    },
    disabledButton(){
      return this.form.account && this.form.amount && this.form.merchant;
    }
  },
  methods: {
    ...mapActions([
      "fillingInBalance",
      "removeWalletAction",
      "createTransaction"
    ]),
    removeAccount(id) {
      const result = this.removeWalletAction(id);
      if (result) {
        this.showMessage("Successfully deleted!");
      }
    },
    openDepositModal(account) {
      this.depositFormVisible = true;
      this.form.account = account.id;
    },
    openTransactionModal(account) {
      this.shopFormVisible = true;
      this.form.account = account.id;
    },
    closeModal() {
      this.depositFormVisible = false;
      this.shopFormVisible = false;
      this.form.account = null;
      this.form.amount = null;
      this.form.merchant = null;
    },
    async createTransactionHandler(){
      if (this.form.account && isNumber(+this.form.amount)) {
        const result = await this.createTransaction(this.form);
        if (result) {
          this.showMessage(this.responseMessage, "success");
          this.closeModal();
        } else {
          this.showMessage(this.responseMessage, "error");
        }
      }
    },
    async deposit() {
      if (this.form.account && isNumber(+this.form.amount)) {
        try {
          const result = await this.fillingInBalance(this.form);
          if (result.amount > 0) {
            this.showMessage(`Successfully your deposit ${result.amount}!`);
            this.closeModal();
          } else {
            this.showMessage(`${result.amount}`, "warning");
          }
        } catch (e) {
          this.showMessage(`${e.message}`, "danger");
          this.closeModal();
        }
      }
    }
  }
};
</script>

<style>
p {
  margin: 0 auto;
}
.user_card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 0.3rem;
}
.card_image {
  max-width: 30px;
  max-height: 30px;
}
</style>
