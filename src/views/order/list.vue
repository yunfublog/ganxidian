<template>
  <div class="app-container">
    <div class="form-box">
      <el-tabs v-model="status" @tab-click="onTabClick">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="未完成" name="1000"></el-tab-pane>
        <el-tab-pane label="已完成" name="2000"></el-tab-pane>
        <el-tab-pane label="已删除" name="-1000"></el-tab-pane>
      </el-tabs>
      <el-form inline class="form" :model="listForm" ref="listForm">
        <el-form-item label="订单编号:" prop="id">
          <el-input placeholder="请输入订单编号" v-model="listForm.id"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名:" prop="userName">
          <el-input placeholder="请输入客户姓名" v-model="listForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="客户手机号:" prop="userPhone">
          <el-input placeholder="请输入客户手机号" v-model="listForm.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="创建日期:" prop="times">
          <el-date-picker
            v-model="listForm.times"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd hh:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-button @click="onReset">重&nbsp;&nbsp;置</el-button>
          <el-button type="warning" @click="onSearch">查&nbsp;&nbsp;询</el-button>
          <el-button type="primary" @click="onExport">导&nbsp;&nbsp;出</el-button>
          <el-button type="primary" @click="onCeate">创建订单</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="订单编号" align="center" prop="id" />
      <el-table-column label="客户姓名" align="center" prop="userName" />
      <el-table-column label="客户手机号" align="center" prop="userPhone" />
      <el-table-column label="衣物数量" align="center" prop="total" />
      <el-table-column label="客户备注" align="center" prop="userMemo" />
      <el-table-column label="系统备注" align="center" prop="memo" />
      <el-table-column label="时间" align="center" width="240">
        <template slot-scope="scope">
          <div>创建时间：{{scope.row.create_time | parseTime}}</div>
          <div>收衣时间：{{scope.row.receive_time | parseTime}}</div>
          <div>取衣时间：{{scope.row.take_time | parseTime}}</div>
          <div v-if="scope.row.complete_time">完成时间：{{scope.row.complete_time | parseTime}}</div>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.amount}}元</div>
        </template>
      </el-table-column>
      <el-table-column label="凭证数量" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.picCount>0">{{scope.row.picCount}}</span>
          <span v-else class="count-warn">{{scope.row.picCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="btn-box">
            <el-button type="text" @click="onPrint(scope.row)" size="small">打印</el-button>
            <el-button type="text" @click="onShow(scope.row)" size="small">查看</el-button>
          </div>
          <div class="btn-box">
            <el-button type="text" @click="onEdit(scope.row)" size="small">编辑</el-button>
            <el-button
              v-if="scope.row.status != -1000"
              type="text"
              @click="onDelete(scope.row)"
              size="small"
            >删除</el-button>
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
    <el-dialog title="打印预览" :visible.sync="isShowModal" width="40%" :modal-append-to-body="false">
      <PrintModal @cancel="isShowModal=false" :order="operateOrder"></PrintModal>
    </el-dialog>
  </div>
</template>
  </div>
</template>

<script>
import { getList, remove, getExcel } from "@/api/order";
import PrintModal from "@/components/Order/PrintModal";
import dayjs from "dayjs";

export default {
  components: { PrintModal },
  data() {
    return {
      status: "1000",
      list: [],
      total: 0,
      page: 1,
      limit: 10,
      isShowModal: false,
      operateOrder: {},
      listForm: {
        id: "",
        userName: "",
        userPhone: "",
        times: []
      }
    };
  },

  methods: {
    onTabClick() {
      this.onSearch();
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

    onPrint(item) {
      this.operateOrder = item;
      this.isShowModal = true;
    },

    onExport() {
      const params = {
        status: this.status,
        id: this.listForm.id,
        userName: this.listForm.userName,
        userPhone: this.listForm.userPhone
      };
      if (this.status == "0") {
        delete params.status;
      }
      const times = this.listForm.times;
      if (times.length > 0) {
        params.startTime = dayjs(times[0]).format("YYYY-MM-DD 00:00:00");
        params.endTime = dayjs(times[1]).format("YYYY-MM-DD 23:59:59");
      }
      this.tool.deleteEmptyKey(params);
      getExcel(params).then(res => {
        const url = res.data;
        window.location.href = url;
      });
    },

    onOperate(item) {
      this.operateId = item.id;
      this.form.staffId = item.staffId;
      this.form.status = item.status;
      this.form.shelves = item.shelves;
      this.isShowModal = true;
    },

    onModalSure() {
      if (this.form.status == null || this.form.status.length <= 0) {
        this.toast.warn("请选择流程");
        return;
      }
      if (this.form.staffId == null || this.form.staffId.length <= 0) {
        this.toast.warn("请选择流程负责人");
        return;
      }
      operate(this.operateId, this.form).then(res => {
        this.toast.success("操作成功");
        this.isShowModal = false;
        this.onSearch();
        this.fetchBadge();
      });
    },

    onShow(item) {
      this.$router.push({ path: "/order/info", query: { id: item.id } });
    },

    onEdit(item) {
      this.$router.push({ path: "/order/edit", query: { id: item.id } });
    },

    onCeate() {
      this.$router.push({ path: "/order/create" });
    },

    onDelete(item) {
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          remove(item.id).then(() => {
            this.toast.success("删除成功");
            this.onSearch();
            this.fetchBadge();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    fetchList() {
      const params = {
        status: this.status,
        id: this.listForm.id,
        userName: this.listForm.userName,
        userPhone: this.listForm.userPhone,
        page: this.page,
        limit: this.limit
      };
      if (this.status == "0") {
        delete params.status;
      }
      const times = this.listForm.times;
      if (times.length > 0) {
        params.startTime = dayjs(times[0]).format("YYYY-MM-DD 00:00:00");
        params.endTime = dayjs(times[1]).format("YYYY-MM-DD 23:59:59");
      }
      this.tool.deleteEmptyKey(params);
      getList(params).then(response => {
        this.list = response.data.rows;
        this.list.forEach(obj => {
          let total = 0;
          obj.items.forEach(i => {
            total += i.quantity;
          });
          obj.total = total;
        });
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
.el-select,
.el-input {
  width: 90%;
}

.form {
  .el-select,
  .el-input {
    width: 200px;
  }
  .el-date-editor {
    width: 400px;
  }
}

.btn-box {
  display: flex;
  margin: 4px 0;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  text-align: center;
  .el-button {
    margin: 0 4px;
  }
}

.print-box {
  width: 320px;
}

.count-warn {
  color: red;
}
</style>

