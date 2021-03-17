<template>
  <div>
    <el-dialog
      title="Deposit history."
      width="30%"
      :visible.sync="transactionHistoryModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      :lock-scroll="false"
    >
      <div
        class="user_card"
        style="display: flex; justify-content: flex-end; align-items: center;"
      >
        Transaction count: {{ transactionCount }}
      </div>

      <div v-for="item in history" :key="item.id">
        <el-card shadow="hover" >
          <el-row  style="display: flex; align-items: center; justify-content: center; height: 20px; width: 100%">
            <el-col :span="12">
              <div>
                <span>Acc.ID: {{ item.account }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <span>Merchant: {{ item.merchant }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <p>Amount: {{ item.amount }}</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <span>Date: {{ item.date | moment }}</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <span class="dialog-footer">
        <el-button @click="closeModal">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "transaction_history",
  data() {
    return {
      formLabelWidth: "120px"
    };
  },
  props: {
    transactionDialog: {
      type: Boolean,
      default: false
    },
    history: {
      type: [Array, Object],
      required: true
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("M d YYYY, h:mm");
    }
  },
  computed: {
    transactionCount() {
      return this.history.length;
    },
    transactionHistoryModal() {
      return this.transactionDialog;
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeDialog");
    }
  }
};
</script>
