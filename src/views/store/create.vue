<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="门店名称：">
        <el-input v-model="store.name" placeholder="门店名称" />
      </el-form-item>
      <el-form-item label="门店地址：">
        <el-input v-model="store.address" placeholder="门店地址" />
      </el-form-item>
      <el-form-item label="门店电话：">
        <el-input v-model="store.phone" placeholder="门店电话" />
      </el-form-item>
      <el-form-item label="管理员姓名：">
        <el-input v-model="manager.name" placeholder="管理员姓名" />
      </el-form-item>
      <el-form-item label="管理员手机号：">
        <el-input v-model="manager.cellphone" placeholder="门店管理员手机号" />
        <br />
        <p class="tips">备注：该手机号即为管理员登录系统账号，登录密码默认为手机号，为确保安全，可在管理后台自行更改密码。</p>
      </el-form-item>
      <el-button @click="onBack" class="back-btn">返&nbsp;&nbsp;回</el-button>
      <el-button type="primary" @click="onCreate" class="back-btn">创&nbsp;&nbsp;建</el-button>
    </el-form>
  </div>
</template>
<script>
import { create } from "@/api/stores";
export default {
  name: "store-create",
  data() {
    return {
      id: "",
      store: {
        name: "",
        phone: "", //门店电话
        address: ""
      },
      manager: {
        name: "", //姓名
        cellphone: "" //手机号
      }
    };
  },

  methods: {
    onBack() {
      this.$router.back();
    },

    onCreate() {
      if (this.store.name.length <= 0) {
        this.toast.warn("请输入门店名称");
        return;
      }
      if (this.store.address.length <= 0) {
        this.toast.warn("请输入门店地址");
        return;
      }
      if (this.store.phone.length <= 0) {
        this.toast.warn("请输入门店电话");
        return;
      }
      if (this.manager.name.length <= 0) {
        this.toast.warn("请输入管理员姓名");
        return;
      }
      if (this.manager.cellphone.length <= 0) {
        this.toast.warn("请输入管理员手机号");
        return;
      }
      const { store, manager } = this;
      const data = { store, manager };
      create(data).then(res => {
        this.toast.success("创建成功");
        this.$router.back();
      });
    }
  },

  created() {}
};
</script>
<style lang="scss" type="text/scss" scoped>
.line {
  text-align: center;
}
.el-form {
  width: 80%;
}

.back-btn {
  margin-left: 40px;
}
</style>