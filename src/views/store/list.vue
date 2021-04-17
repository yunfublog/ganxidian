<template>
  <div class="app-container">
    <div class="form-box">
      <el-form inline>
        <el-form-item label>
          <el-button type="primary" @click="onCeate" size="small">创建门店</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="门店编号" align="center" prop="id" />
      <el-table-column label="门店名称" align="center" prop="name" />
      <el-table-column label="门店电话" align="center" prop="phone" />
      <el-table-column label="门店地址" align="center" prop="address" />
      <el-table-column label="管理员账号" align="center">
        <template slot-scope="scope">{{scope.row.manager.account}}</template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">{{scope.row.create_time | parseDate}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="btn-box">
            <el-button type="primary" @click="onResetPwd(scope.row)" size="small">重置密码</el-button>
            <el-button type="primary" @click="onEdit(scope.row)" size="small">编辑门店</el-button>
            <el-button type="primary" @click="onDelete(scope.row)" size="small">删除门店</el-button>
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
  </div>
</template>

<script>
import { getList, remove, resetPwd } from "@/api/stores";

export default {
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      limit: 10
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

    //重置登录密码
    onResetPwd(item) {
      this.$confirm("此操作将重置该门店管理员登录密码, 是否继续?", "提示", {
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

    onEdit(item) {
      this.$router.push({ path: "/store/edit", query: { id: item.id } });
    },

    onDelete(item) {
      this.$confirm("此操作将永久删除该门店, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          remove(item.id).then(() => {
            this.toast.success("删除成功");
            this.onSearch();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    onCeate() {
      this.$router.push({ path: "/store/create" });
    },

    onSearch() {
      this.page = 1;
      this.fetchList();
    },

    fetchList() {
      const params = {
        page: this.page,
        limit: this.limit
      };
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
