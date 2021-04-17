<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="订单编号：">
        <div>{{form.id}}</div>
      </el-form-item>
      <el-form-item label="客户姓名：">
        <div>{{form.userName}}</div>
      </el-form-item>
      <el-form-item label="客户手机号：">
        <div>{{form.userPhone}}</div>
      </el-form-item>
      <el-form-item label="订单金额：">
        <div>{{form.amount}}元</div>
      </el-form-item>
      <el-form-item label="收衣时间：">
        <div>{{form.receive_time | parseTime}}</div>
      </el-form-item>
      <el-form-item label="取衣时间：">
        <div>{{form.take_time | parseTime}}</div>
      </el-form-item>
      <el-form-item label="客户备注：">
        <div>{{form.userMemo}}</div>
      </el-form-item>
      <el-form-item label="系统备注：">
        <div>{{form.memo}}</div>
      </el-form-item>
      <el-form-item label="订单项：">
        <el-table :data="form.items" border fit highlight-current-row>
          <el-table-column label="衣物编号" align="center" prop="code" />
          <el-table-column label="衣物名称" align="center" prop="name" />
          <el-table-column label="数量" align="center" prop="quantity" />
          <el-table-column label="衣物价格" align="center" prop="price" />
          <el-table-column label="衣物备注" align="center" prop="memo" />
          <el-table-column label="衣物状态" align="center">
            <template slot-scope="scope">{{scope.row.status | processStatus}}</template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="订单凭证：" v-if="pictures.length > 0">
        <a :href="item" v-for="item in pictures" :key="item" target="_blank">
          <img :src="item" alt class="proof" />
        </a>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCancel">返&nbsp;&nbsp;回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo } from "@/api/order";
import { filterStatus } from "./process-filters";
export default {
  data() {
    return {
      id: "",
      isShowModal: false,
      pictures: [],
      form: {
        userName: "",
        userPhone: "",
        userMemo: "",
        memo: "",
        items: []
      },
      itemForm: {
        code: "",
        name: "",
        quantity: 1,
        memo: ""
      }
    };
  },
  filters: {
    processStatus(status) {
      return filterStatus(status);
    }
  },
  methods: {
    onAdd() {
      this.isShowModal = true;
    },

    onDelete(index) {
      this.$confirm("确认删除该条目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.items.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    onModalSure() {
      if (this.itemForm.code.length <= 0) {
        this.toast.warn("请输入编号");
        return;
      }
      if (this.itemForm.name.length <= 0) {
        this.toast.warn("请输入衣物名称");
        return;
      }
      let item = Object.assign({}, this.itemForm);
      this.form.items.push(item);
      this.isShowModal = false;
    },

    onSubmit() {
      const { userName, userPhone, userMemo, memo, items } = this.form;
      if (userName.length <= 0) {
        this.toast.warn("请输入客户姓名!");
        return;
      }
      if (userPhone.length <= 0) {
        this.toast.warn("请输入客户手机号!");
        return;
      }
      if (items.length <= 0) {
        this.toast.warn("请添加订单项!");
        return;
      }
      create(this.form).then(res => {
        this.toast.success("创建成功");
        this.$router.back();
      });
    },

    fetchInfo() {
      getInfo(this.id).then(res => {
        this.form = res.data;
        if (this.form.pictures) {
          let pictures = JSON.parse(this.form.pictures);
          this.pictures = pictures.map(url => {
            return url;
          });
        }
      });
    },

    onCancel() {
      this.$router.back();
    }
  },

  created() {
    this.id = this.$route.query.id;
    this.fetchInfo();
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
.dialog-form {
  width: 95%;
}
.el-select {
  width: 100%;
}

.proof {
  width: 150px;
  height: 150px;
  margin-right: 15px;
}
</style>

