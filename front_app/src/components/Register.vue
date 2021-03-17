<template>
  <el-container class="container">
    <el-card shadow="hover">
      <el-form
        label-position="left"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.password1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            Login
          </el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>
<script>
import { mapActions } from "vuex";
import messageMixin from "../mixins/messageMixin";
export default {
  mixins: [messageMixin],
  data() {
    return {
      ruleForm: {
        email: "",
        password1: "",
        password2: ""
      },
      users: [],
      rules: {
        email: [
          {
            required: true,
            message: "Please enter you email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please enter a valid email address",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter your password",
            trigger: "blur"
          },
          { min: 6, message: "Your password is too short!" }
        ]
      }
    };
  },
  computed: {
    responseMessage() {
      return this.$store.getters.getMessage;
    }
  },
  methods: {
    ...mapActions(["register"]),
    async submitForm() {
      const response = await this.register({ ...this.ruleForm });
      if (response) {
        this.showMessage(this.responseMessage, "success");
        await this.$router.push("/dashboard");
        location.reload();
      } else {
        this.showMessage(this.responseMessage, "error");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
}
.demo-ruleForm {
  background-color: #fff;
  padding: 30px;
  width: 300px;
}
</style>
