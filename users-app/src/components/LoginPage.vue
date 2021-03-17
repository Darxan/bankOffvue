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
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
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

export default {
  data() {
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the email"));
      }
      setTimeout(() => {
        if (!Number.isE(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < 18) {
            callback(new Error("Age must be greater than 18"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        email: ""
      },
      users: [],
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["register"]),
   async submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register({
            email: this.ruleForm.email,
            password1: this.ruleForm.pass,
            password2: this.ruleForm.checkPass
          }).then(response => {
            if (response) {
            this.$router.push("/dashboard");
            this.$message({
              message: "Successfully authorization!",
              type: "success",
              center: true
            });
          } else if (!response) {
            this.$message({
              message: "Email or password invalid",
              type: "error",
              center: true
            });
          }
          });
        }
          
      });
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
