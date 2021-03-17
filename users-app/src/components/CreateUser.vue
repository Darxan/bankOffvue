<template>
  <div>
    <el-dialog title="Create user card." :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="Full name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Avatar" :label-width="formLabelWidth">
          <el-input v-model="form.avatar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Department" :label-width="formLabelWidth">
          <el-input v-model="form.department" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="dialog-footer">
            <el-button @click="closeModal">Cancel</el-button>
            <el-button type="primary" @click="createUserCardHandler"
              >Save</el-button
            >
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "user-create",
  data() {
    return {
      formLabelWidth: "120px",
      lastId: 9,
      form: {
        id: this.lengthData,
        name: "",
        avatar: "",
        email: "",
        phone: "",
        department: ""
      }
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lengthData() {
      return this.$store.getters.getUsersDataLength + 1;
    }
  },
  methods: {
    ...mapActions(["createDepositAccount"]),
    createUserCardHandler() {
      // if(!this.form.avatar){
      //   this.form.avatar = "https://s3.amazonaws.com/uifaces/faces/twitter/charlesrpratt/128.jpg"
      // }
      this.form.id = this.lengthData;
      const result = this.createDepositAccount();
      this.$emit("closemodal");
      if (result) {
        this.$message({
          message: "Successfully created!",
          type: "success",
          center: true
        });
      } else {
        alert("error");
      }
    },
    closeModal() {
      this.$emit("closemodal");
    }
  }
};
</script>

<style lang="scss" scoped></style>
