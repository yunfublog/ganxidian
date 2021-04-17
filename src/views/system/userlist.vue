<!--
 * @Author: 王康
 * @Date: 2021-04-11 20:34:35
 * @LastEditTime: 2021-04-11 20:39:54
 * @LastEditors: 王康
 * @Description: 
-->
<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="员工姓名" align="center" prop="name"></el-table-column>
      <el-table-column label="用工角色" align="center" prop="role"></el-table-column>
      <el-table-column label="员工手机号" align="center" prop="cellphone"></el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">{{scope.row.create_time | parseTime}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="btn-box">
            <el-button type="primary" @click="onEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="primary" @click="onDelete(scope.row)" size="small">删除</el-button>
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
import { getList, remove } from "@/api/staff";
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

    onEdit(item) {
      this.$router.push({ path: "/staff/edit", query: { id: item.id } });
    },

    onDelete(item) {
      this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        remove(item.id).then(() => {
          this.toast.success("删除成功");
          this.onSearch();
        });
      });
    },

    onCeate() {
      this.$router.push({ path: "/staff/create" });
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

