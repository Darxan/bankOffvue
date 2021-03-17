<template>
  <div>
    <el-dialog
      title="Deposit history."
      width="30%"
      :visible.sync="stateDepositDialog"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      :lock-scroll="false"
    >
      <h3>Deposit count: {{ depositCount }}</h3>
      <div v-for="item in history" :key="item.id">
        <el-card shadow="hover" class="user_card" style="height: 62px;">
          <el-row :gutter="2">
            <el-col :span="8">
              <div>
                <span>Account ID: {{ item.account }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <p>Amount: {{ item.amount }}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <p>Date: {{ item.date | moment }}</p>
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
  name: "deposit_history",
  data() {
    return {
      formLabelWidth: "120px"
    };
  },
  props: {
    depositDialog: {
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
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  computed: {
    depositCount() {
      return this.history.length;
    },
    stateDepositDialog() {
      return this.depositDialog;
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeDepositDialog");
    }
  }
};
</script>

<style lang="scss" scoped></style>
