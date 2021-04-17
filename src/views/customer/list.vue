<template>
  <div class="app-container">
    <div>
      <el-form inline class="form" :model="listForm" ref="listForm">
        <el-form-item label="客户姓名:" prop="name">
          <el-input placeholder="请输入客户姓名" v-model="listForm.name"></el-input>
        </el-form-item>
        <el-form-item label="客户手机号:" prop="cellphone">
          <el-input placeholder="请输入客户手机号" v-model="listForm.cellphone"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button @click="onReset">重&nbsp;&nbsp;置</el-button>
          <el-button type="primary" @click="onSearch">查&nbsp;&nbsp;询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="客户名称" align="center" prop="name" />
      <el-table-column label="客户手机号" align="center" prop="cellphone" />
      <el-table-column label="客户级别" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.level == 1000">普通会员</span>
          <span v-else-if="scope.row.level == 2000">vip会员</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center">
        <template slot-scope="scope">{{scope.row.create_time | parseDate}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="btn-box">
            <el-button type="primary" @click="onResetPwd(scope.row)" size="small">重置密码</el-button>
            <el-button type="primary" @click="onChangeLevel(scope.row)" size="small">更改级别</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="next-page-div">
      <el-pagination
        small
        layout="total,prev, pager, next"
        :page-size="limit"
        :total="total"
        :current-page.sync="page"
        @current-change="onPageChange"
      ></el-pagination>
    </div>

    <el-dialog title="更改级别" :visible.sync="isShowModal" width="35%" :modal-append-to-body="false">
      <el-form label-width="80px">
        <el-form-item label="会员级别:">
          <el-radio-group v-model="form.level">
            <el-radio :label="1000">普通会员</el-radio>
            <el-radio :label="2000">vip会员</el-radio>
          </el-radio-group>
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
import { getList, update,resetPwd } from "@/api/customer";
export default {
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      limit: 10,
      isShowModal: false,
      isOperateId: "",
      listForm: {
        name: "",
        cellphone: ""
      },
      form: {
        level: ""
      }
    };
  },

  methods: {
    onTabClick() {
      this.page = 1;
      this.fetchList();
    },

    onPageChange() {
      this.fetchList();
    },

    onReset() {
      this.$refs["listForm"].resetFields();
    },

    onSearch() {
      this.page = 1;
      this.fetchList();
    },

     //重置登录密码
    onResetPwd(item) {
      this.$confirm("此操作将重置该用户登录密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          resetPwd(item.id).then(res=>{
            this.toast.success("重置成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    },

    onChangeLevel(item) {
      this.isOperateId = item.id;
      this.form.level = item.level;
      this.isShowModal = true;
    },

    //确认提交
    onModalSure() {
      update(this.isOperateId, this.form).then(res => {
        this.isShowModal = false;
        this.toast.success("更改成功");
        this.onSearch();
      });
    },

    fetchList() {
      const params = {
        page: this.page,
        limit: this.limit,
        name: this.listForm.name,
        cellphone: this.listForm.cellphone
      };
      this.tool.deleteEmptyKey(params);
      getList(params).then(response => {
        this.list = response.data.rows;
        this.total = response.data.count;
      });
    }
  },

  created() {
    this.onSearch();
  }
};
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  .el-button {
    margin-left: 0;
    margin-top: 8px;
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>

