<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="门店名称：">
        <el-input v-model="form.name" placeholder="门店名称" />
      </el-form-item>
      <el-form-item label="门店地址：">
        <el-input v-model="form.address" placeholder="门店地址" />
      </el-form-item>
      <el-form-item label="门店电话：">
        <el-input v-model="form.phone" placeholder="门店电话" />
      </el-form-item>
      <el-button @click="onBack" class="back-btn">返&nbsp;&nbsp;回</el-button>
      <el-button type="primary" @click="onUpdate" class="back-btn">保&nbsp;&nbsp;存</el-button>
    </el-form>
  </div>
</template>
<script>
import { getInfo, update } from "@/api/stores";
export default {
  name: "store-edit",
  data() {
    return {
      id: "",
      form: {
        name: "",
        address: "",
        phone: ""
      }
    };
  },

  methods: {
    onBack() {
      this.$router.back();
    },

    onUpdate() {
      if (this.form.name.length <= 0) {
        this.toast.warn("请输入门店名称");
        return;
      }
      if (this.form.address.length <= 0) {
        this.toast.warn("请输入门店地址");
        return;
      }
      update(this.id, this.form).then(res => {
        this.toast.success("编辑成功");
        this.$router.back();
      });
    },

    fetchInfo() {
      getInfo(this.id).then(res => {
        this.form.name = res.data.name;
        this.form.address = res.data.address;
        this.form.phone = res.data.phone;
      });
    }
  },

  created() {
    this.id = this.$route.query.id;
    this.fetchInfo();
  }
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