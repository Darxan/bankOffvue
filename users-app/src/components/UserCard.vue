<template>
  <div>
    <el-card shadow="hover" class="user_card">
      <div class="user_card">
        <img :src="user.avatar" :alt="user.name" class="card_image" lazy :fit="cover"/>
        <h3> {{ user.name }}</h3>
        <span>Phone: {{ user.phone }}</span>
        <span>Department: {{ user.department }}</span>
        <div>
          <el-button size="small" @click="openEditUserModal(user)" type="info"
          >Edit</el-button
          >
          <el-button size="small" @click="removeUser(user.id)" type="warning"
          >Delete</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="Edit user information" :visible.sync="dialogFormVisible">
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
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="editUserData">Confirm</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    user: { type: Object, required: true }
  },
  data: () => {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        id: null,
        name: "",
        avatar: "",
        email: "",
        phone: "",
        department: ""
      }
    };
  },
  async mounted() {
    this.users = await this.$store.getters.getUsersData;
  },
  methods: {
    ...mapActions(["updateUserInfo", "removeUserHandler"]),
    removeUser(id) {
      const result = this.removeUserHandler(id);
      if (result) {
        this.$message({
          message: "Successfully deleted!",
          type: "success",
          center: true
        });
      }
    },
    openEditUserModal(user) {
      this.dialogFormVisible = true;
      this.form = { ...user };
    },
    async editUserData() {
      const result = this.updateUserInfo(this.form);
      if (result) {
        this.$message({
          message: "Successfully updated!",
          type: "success",
          center: true
        });
        this.dialogFormVisible = false;
        // this.users = await this.$store.getters.getUsersData;
      }
    }
  }
};
</script>

<style>
.user_card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 0.3rem;
}
.card_image{
  max-width: 100px;
  max-height: 120px;
}
</style>
