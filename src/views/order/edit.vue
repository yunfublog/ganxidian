<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="客户姓名：">
        <el-input v-model="form.userName" placeholder="客户姓名" disabled />
      </el-form-item>
      <el-form-item label="客户手机号：">
        <el-input v-model="form.userPhone" placeholder="客户手机号" disabled />
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
      <!-- <el-form-item label="订单项：">
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
      <el-form-item label>
        <el-table :data="form.items" border fit highlight-current-row>
          <el-table-column label="衣物编号" align="center" prop="code" />
          <el-table-column label="衣物名称" align="center" prop="name" />
          <el-table-column label="数量" align="center" prop="quantity" />
          <el-table-column label="衣物备注" align="center" prop="memo" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="onDelete(scope.$index)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>-->

      <el-form-item label="添加凭证:">
        <el-upload
          :action="host"
          :headers="headers"
          list-type="picture-card"
          :file-list="fileList"
          :on-remove="onUploadRemove"
          :on-success="onUploadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate">更&nbsp;&nbsp;新</el-button>
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
import { getInfo, update } from "@/api/order";
import { getToken } from "@/utils/auth";
import { uploadUrl } from "@/api/common";
import dayjs from "dayjs";
export default {
  data() {
    return {
      id: "",
      isShowModal: false,
      host: "",
      headers: {},
      fileList: [],
      form: {
        userName: "",
        userPhone: "",
        receive_time: "", //收衣时间
        take_time: "", //取衣时间
        userMemo: "",
        memo: "",
        items: [],
        amount:"", //订单金额
      },
      itemForm: {
        code: "",
        name: "",
        quantity: 1,
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
      this.form.items.push(item);
      this.isShowModal = false;
    },

    onUpdate() {
      const { userMemo, memo, receive_time, take_time,amount } = this.form;
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
      let data = { userMemo, memo,amount };
      data.take_time = dayjs(take_time).format("YYYY-MM-DD HH:mm:ss");
      data.receive_time = dayjs(receive_time).format("YYYY-MM-DD HH:mm:ss");
      if (this.fileList.length > 0) {
        let fileList = this.fileList.map(item => {
          if (item.response && item.response.data) {
            return item.response.data;
          } else if (item.url) {
            return item.url;
          }
        });
        let pictures = JSON.stringify(fileList);
        data.pictures = pictures;
      }
      update(this.id, data).then(res => {
        this.toast.success("更新成功");
        this.$router.back();
      });
    },

    fetchInfo() {
      getInfo(this.id).then(res => {
        this.form = res.data;
        if (this.form.pictures) {
          let pictures = JSON.parse(this.form.pictures);
          this.fileList = pictures.map(url => {
            return { url };
          });
        }
      });
    },

    onCancel() {
      this.$router.back();
    },

    onUploadSuccess(response, file, fileList) {
      this.fileList = fileList;
    },

    onUploadRemove(file, fileList) {
      this.fileList = fileList;
    },

    initData() {
      this.headers = { token: getToken() };
      const origin = window.location.origin;
      this.host = `${origin}${uploadUrl}`;
    }
  },

  created() {
    this.id = this.$route.query.id;
    this.fetchInfo();
    this.initData();
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

.upload-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.upload-item {
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  margin-right: 12px;
}
</style>

