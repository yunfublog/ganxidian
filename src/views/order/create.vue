<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="客户姓名：">
        <el-input v-model="form.userName" placeholder="客户姓名" />
      </el-form-item>
      <el-form-item label="客户手机号：">
        <el-input v-model="form.userPhone" placeholder="客户手机号" />
      </el-form-item>
      <el-form-item label="订单金额：">
        <el-input v-model="form.amount" placeholder="订单金额" type="number">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="收衣时间：">
        <el-date-picker
          type="datetime"
          v-model="form.receive_time"
          placeholder="收衣时间"
          default-time="12:00:00"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="取衣时间：">
        <el-date-picker
          type="datetime"
          v-model="form.take_time"
          placeholder="取衣时间"
          default-time="12:00:00"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="客户备注：">
        <el-input v-model="form.userMemo" placeholder="客户备注" type="textarea" rows="3" />
      </el-form-item>
      <el-form-item label="系统备注：">
        <el-input v-model="form.memo" placeholder="系统备注" type="textarea" rows="3" />
      </el-form-item>
      <el-form-item label="订单项：">
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
      <el-form-item label>
        <el-table :data="form.items" border fit highlight-current-row>
          <el-table-column label="衣物编号" align="center" prop="code" />
          <el-table-column label="衣物名称" align="center" prop="name" />
          <el-table-column label="数量" align="center" prop="quantity" />
          <el-table-column label="衣物价格" align="center" prop="price" />
          <el-table-column label="衣物备注" align="center" prop="memo" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="onDelete(scope.$index)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创&nbsp;&nbsp;建</el-button>
        <el-button @click="onCancel">取&nbsp;&nbsp;消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="添加订单项" :visible.sync="isShowModal" width="40%" :modal-append-to-body="false">
      <el-form label-width="100px" class="dialog-form">
        <el-form-item label="衣物编号:">
          <el-input placeholder="衣物编号" v-model="itemForm.code"></el-input>
        </el-form-item>
        <el-form-item label="衣物名称:">
          <el-input placeholder="衣物名称" v-model="itemForm.name"></el-input>
        </el-form-item>
        <el-form-item label="数量:">
          <el-input placeholder="数量" ty v-model="itemForm.quantity"></el-input>
        </el-form-item>
        <el-form-item label="衣物价格:">
          <el-input placeholder="衣物价格" ty v-model="itemForm.price"></el-input>
        </el-form-item>
        <el-form-item label="衣物备注:">
          <el-input placeholder="衣物备注" v-model="itemForm.memo" type="textarea" rows="2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowModal = false">取 消</el-button>
        <el-button type="primary" @click="onModalSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { create } from "@/api/order";
import { getUser } from "@/utils/auth";
import dayjs from "dayjs";
export default {
  data() {
    return {
      isShowModal: false,
      form: {
        userName: "",
        userPhone: "",
        receive_time: "", //收衣时间
        take_time: "", //取衣时间
        userMemo: "",
        memo: "",
        items: [],
        amount: ""
      },
      itemForm: {
        code: "",
        name: "",
        quantity: 1,
        price: "",
        memo: ""
      }
    };
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
      const user = getUser();
      item.code = `s${user.store.id}-${item.code}`;
      this.form.items.push(item);
      this.isShowModal = false;
    },

    onSubmit() {
      const {
        userName,
        userPhone,
        userMemo,
        receive_time,
        amount,
        take_time,
        memo,
        items
      } = this.form;
      if (userName.length <= 0) {
        this.toast.warn("请输入客户姓名!");
        return;
      }
      if (userPhone.length <= 0) {
        this.toast.warn("请输入客户手机号!");
        return;
      }
      if (amount == null || amount.length <= 0) {
        this.toast.warn("请输入订单金额!");
        return;
      }
      if (receive_time == null || receive_time.length <= 0) {
        this.toast.warn("请选择收衣时间!");
        return;
      }
      if (take_time == null || take_time.length <= 0) {
        this.toast.warn("请选择取衣时间!");
        return;
      }
      if (items.length <= 0) {
        this.toast.warn("请添加订单项!");
        return;
      }
      this.form.take_time = dayjs(this.form.take_time).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.form.receive_time = dayjs(this.form.receive_time).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      create(this.form).then(res => {
        this.toast.success("创建成功");
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
  width: 60%;
}
.dialog-form {
  width: 95%;
}
.el-select,
.el-date-editor {
  width: 100%;
}
</style>

