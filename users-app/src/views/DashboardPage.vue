<template>
  <div class="about">
    <h1>Users contact list.</h1>
    <el-row :gutter="20" class="user_list">
      <el-col :span="14">
        <el-input
          placeholder="Search user name"
          v-model="search"
          clearable>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="user_list" :gutter="20">
      
      <el-col :span="7" v-for="item in searchUserName" :key="item.id">
        <UserCard :user="item" />
      </el-col>
    </el-row>
    <el-row class="add_button">
      <el-button size="small" type="warning" @click="dialogFormVisible = !dialogFormVisible"
        >ADD NEW USER</el-button
      >

      <el-button size="small" type="danger" @click="logOut">Log out</el-button>
    </el-row>
    <CreateUser
      v-if="dialogFormVisible"
      :dialogFormVisible="dialogFormVisible"
      @closemodal="closemodal"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import UserCard from "../components/UserCard";
import CreateUser from "../components/CreateUser";

export default {
  name: "users-page",
  data: () => {
    return {
      users: [],
      dialogFormVisible: false,
      search: "",
    };
  },
  async mounted() {
    await this.$store.dispatch("fetchUserData");
  },
  components: {
    UserCard,
    CreateUser
  },
  
  methods: {
    ...mapActions(["updateUserInfo", "removeUserHandler", "logout"]),
    openEditUserModal(user) {
      this.dialogFormVisible = true;
      this.form = { ...user };
    },
    closemodal() {
      this.dialogFormVisible = false;
    },
    logOut() {
      const response = this.logout();
      if (response) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    getUsers() {
      return this.$store.getters.getUsersData;
    },
    searchUserName() {
      return this.getUsers.filter(elem => {
        return elem.name.trim().toLowerCase().includes(this.search.trim().toLowerCase())
      });
    }
  },
};
</script>

<style>
.user_list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
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
