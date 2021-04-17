<template>
  <div class="app-container">
    <div class="form-box">
      <el-tabs v-model="status" @tab-click="onTabClick">
        <el-tab-pane label="待处理" name="1000"></el-tab-pane>
        <el-tab-pane label="已接单" name="1100"></el-tab-pane>
        <el-tab-pane label="已取货" name="2000"></el-tab-pane>
      </el-tabs>
    </div>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="取货编号" align="center" prop="id" />
      <el-table-column label="取货地址" align="center">
        <template slot-scope="scope">{{scope.row.address.detail}}</template>
      </el-table-column>
      <el-table-column label="客户姓名" align="center">
        <template slot-scope="scope">{{scope.row.address.userName}}</template>
      </el-table-column>
      <el-table-column label="客户手机号" align="center">
        <template slot-scope="scope">{{scope.row.address.userPhone}}</template>
      </el-table-column>
      <el-table-column label="用户备注" align="center" prop="memo" />
      <el-table-column label="预约上门时间" align="center">
        <template slot-scope="scope">{{scope.row.book_time | parseTime}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="btn-box">
            <el-button
              v-if="scope.row.status == 1000"
              type="primary"
              @click="onReceive(scope.row)"
              size="small"
            >确认接单</el-button>
            <el-button
              v-if="scope.row.status == 1100"
              type="primary"
              @click="onConfirm(scope.row)"
              size="small"
            >确认取货</el-button>
            <el-button
              v-if="scope.row.status == 2000"
              type="primary"
              @click="onReject(scope.row)"
              size="small"
            >撤回取货</el-button>
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
import { getList, update } from "@/api/booking";
export default {
  data() {
    return {
      status: "1000",
      list: [],
      total: 0,
      page: 1,
      limit: 10
    };
  },

  methods: {
    onTabClick() {
      this.onSearch();
    },

    onPageChange() {
      this.fetchList();
    },

    onReceive(item) {
      this.$confirm("此操作将更改为已处理, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const params = { status: 1100 };
        this.onUpdate(item.id, params);
      });
    },

    onConfirm(item) {
      this.$confirm("此操作将更改为已取货, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const params = { status: 2000 };
        this.onUpdate(item.id, params);
      });
    },

    onReject(item) {
      this.$confirm("此操作将更改为已处理, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const params = { status: 1100 };
        this.onUpdate(item.id, params);
      });
    },

    onUpdate(id, params) {
      update(id, params).then(res => {
        this.toast.success("更新成功");
        this.onSearch();
      });
    },

    onSearch() {
      this.page = 1;
      this.fetchList();
    },

    fetchList() {
      const params = {
        status: this.status,
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
    this.fetchList();
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

