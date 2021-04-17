<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="员工姓名：">
        <el-input v-model="form.name" placeholder="员工姓名" />
      </el-form-item>
      <el-form-item label="员工手机号：">
        <el-input v-model="form.cellphone" placeholder="员工手机号" />
      </el-form-item>
      <el-form-item label="员工角色：">
        <el-input v-model="form.role" placeholder="员工角色" />
      </el-form-item>
      <el-form-item label="员工年龄：">
        <el-input v-model="form.age" placeholder="员工年龄" type="number">
          <template slot="append">岁</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创 建</el-button>
        <el-button @click="onCancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/staff";
export default {
  data() {
    return {
      form: {
        name: "",
        cellphone: "",
        role: "",
        age: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.name.length <= 0) {
        this.toast.warn("请输入员工姓名!");
        return;
      }
      if (this.form.cellphone.length <= 0) {
        this.toast.warn("请输入员工手机号!");
        return;
      }
      if (this.form.role.length <= 0) {
        this.toast.warn("请输入员工角色!");
        return;
      }
      const { name, cellphone, role } = this.form;
      const data = { name, cellphone, role };
      create(data).then(res => {
        this.toast.success("创建成功!");
        this.$router.back();
      });
    },

    onCancel() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.el-form {
  width: 70%;
}
.el-select {
  width: 100%;
}
</style>

