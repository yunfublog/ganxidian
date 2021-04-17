<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            src="http://mbb-pub.oss-cn-hangzhou.aliyuncs.com/img/201612/10/%E5%A4%B4%E5%83%8F.png"
            class="user-avatar"
          />
          <span>{{user.name}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="onModifyPwd">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" :visible.sync="isShowModal" width="50%" :modal-append-to-body="false">
      <el-form label-width="80px">
        <el-form-item label="新密码:">
          <el-input placeholder="新密码" v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:">
          <el-input placeholder="确认密码" v-model="rePassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowModal = false">取 消</el-button>
        <el-button type="primary" @click="onSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updatePwd } from "@/api/user";
import { getUser } from "@/utils/auth";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  data() {
    return {
      isShowModal: false,
      password: "",
      rePassword: ""
    };
  },

  components: {
    Breadcrumb,
    Hamburger
  },

  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),

    user() {
      return getUser();
    }
  },

  methods: {
    onModifyPwd() {
      this.isShowModal = true;
    },

    onSure() {
      if (this.password.length <= 0) {
        this.toast.showWarning("请输入密码");
        return;
      }
      if (this.rePassword.length <= 0) {
        this.toast.showWarning("请再次输入密码");
        return;
      }
      if (this.password != this.rePassword) {
        this.toast.showWarning("两次密码不一致！");
        return;
      }
      const params = { password: this.password };
      updatePwd(params).then(res => {
        this.toast.success("密码修改成功");
        this.isShowModal = false;
      });
    },

    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },

    async logout() {
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 95%;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          margin-right: 12px;
        }

        .el-icon-caret-bottom {
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
