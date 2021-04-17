<template>
  <div class="app-container">
    <div class="form-box">
      <el-tabs v-model="status" @tab-click="onTabClick">
        <el-tab-pane
          v-for="item in orderTabs"
          :label="item.label"
          :name="item.status"
          :key="item.status"
        ></el-tab-pane>
      </el-tabs>
      <el-form inline class="form" :model="listForm" ref="listForm">
        <el-form-item label="订单编号:" prop="orderId">
          <el-input placeholder="请输入订单编号" v-model="listForm.orderId"></el-input>
        </el-form-item>
        <el-form-item label="衣服编号:" prop="code">
          <el-input placeholder="请输入衣服编号" v-model="listForm.code"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名:" prop="userName">
          <el-input placeholder="请输入客户姓名" v-model="listForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="客户手机号:" prop="userPhone">
          <el-input placeholder="请输入客户手机号" v-model="listForm.userPhone"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button @click="onReset" size="small">重&nbsp;&nbsp;置</el-button>
          <el-button type="warning" @click="onSearch" size="small">查&nbsp;&nbsp;询</el-button>
          <el-button size="small" v-show="status==8000" @click="onExport">导&nbsp;&nbsp;出</el-button>
        </el-form-item>
        <el-form-item label>
          <el-button size="small" type="primary" @click="onCeate">创建订单</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="订单编号" align="center" prop="orderId" />
      <el-table-column label="衣服编号" align="center" prop="code" />
      <el-table-column label="衣服名称" align="center" prop="name" />
      <el-table-column label="衣服价格" align="center" prop="price" />
      <el-table-column label="数量" align="center" prop="quantity" />
      <el-table-column label="客户姓名" align="center" prop="userName" />
      <el-table-column label="客户手机号" align="center" prop="userPhone" />
      <el-table-column label="负责人姓名" align="center">
        <template slot-scope="scope">{{scope.row.staffName || '--'}}</template>
      </el-table-column>
      <el-table-column label="货架号" align="center">
        <template slot-scope="scope">{{scope.row.shelves || '--'}}</template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="memo" />
      <el-table-column label="时间" align="center" width="240">
        <template slot-scope="scope">
          <div>创建时间：{{scope.row.create_time | parseTime}}</div>
          <div v-if="scope.row.complete_time">完成时间：{{scope.row.complete_time | parseTime}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="btn-box">
            <el-button type="text" @click="onOperate(scope.row)" size="small">操作</el-button>
            <el-button type="text" @click="onLogs(scope.row)" size="small">查看记录</el-button>
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
    <el-dialog title="更改流程" :visible.sync="isShowModal" width="40%" :modal-append-to-body="false">
      <el-form label-width="150px">
        <el-form-item label="切换流程：">
          <el-select v-model="form.status" placeholder="切换流程：">
            <el-option label="待处理" :value="1000"></el-option>
            <el-option label="检查" :value="2000"></el-option>
            <el-option label="去渍" :value="3000"></el-option>
            <el-option label="洗涤" :value="4000"></el-option>
            <el-option label="熨烫" :value="5000"></el-option>
            <el-option label="烘干" :value="6000"></el-option>
            <el-option label="检查" :value="7000"></el-option>
            <el-option label="包装上架" :value="8000"></el-option>
            <el-option label="已完成" :value="10000"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择负责人：">
          <el-select v-model="form.staffId" placeholder="选择负责人">
            <el-option v-for="item in staffList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货架号：" v-if="form.status == 8000">
          <el-input placeholder="请输入货架号：" v-model="form.shelves"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowModal = false">取 消</el-button>
        <el-button type="primary" @click="onModalSure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="流程记录"
      :visible.sync="isShowLogModal"
      width="50%"
      :modal-append-to-body="false"
      @closed="onLogsClose"
    >
      <ProcessLog :itemId="logOperateId" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowLogModal=false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, remove, operate, getBadge,getExcel } from "@/api/process";
import { getList as getStaffList } from "@/api/staff";
import { generateTabs, configStates } from "./process-tool";
import ProcessLog from "@/components/Process/ProcessLog";

export default {
  components: { ProcessLog },
  data() {
    return {
      orderTabs: generateTabs(),
      status: "1000",
      staffList: [],
      list: [],
      total: 0,
      page: 1,
      limit: 10,
      isShowModal: false,
      isShowLogModal: false,
      operateId: "", //当前在操作的衣服id
      logOperateId: "", //当前在操作的衣服id
      listForm: {
        orderId: "",
        code: "",
        userName: "",
        userPhone: ""
      },
      form: {
        staffId: "",
        status: "",
        shelves: "" //货架号
      }
    };
  },

  methods: {
    onTabClick() {
      this.cache.saveSelectOrderStatus(this.status);
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

    onExport() {
       const params = {
        status: this.status,
        orderId: this.listForm.orderId,
        code: this.listForm.code,
        userName: this.listForm.userName,
        userPhone: this.listForm.userPhone,
      };
      if (this.status == "0") {
        delete params.status;
      }
      this.tool.deleteEmptyKey(params);
      getExcel(params).then(res => {
        const url = res.data;
        window.location.href = url;
      });
    },

    onLogs(item) {
      this.logOperateId = item.id;
      this.isShowLogModal = true;
    },

    onLogsClose() {
      this.logOperateId = "";
      this.isShowLogModal = false;
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
      const ret = this.staffList.find(item => {
        return item.id == this.form.staffId;
      });
      this.form.staffName = ret.name;
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
        orderId: this.listForm.orderId,
        code: this.listForm.code,
        userName: this.listForm.userName,
        userPhone: this.listForm.userPhone,
        page: this.page,
        limit: this.limit
      };
      if (this.status == "0") {
        delete params.status;
      }
      this.tool.deleteEmptyKey(params);
      getList(params).then(response => {
        this.list = response.data.rows;
        this.total = response.data.count;
      });
    },

    fetchStaffList() {
      getStaffList().then(res => {
        this.staffList = res.data.rows;
      });
    },

    fetchBadge() {
      getBadge().then(res => {
        let list = res.data || [];
        this.orderTabs = configStates(list);
      });
    },

    initData() {
      this.status = this.cache.fetchSelectOrderStatus() || "1000";
    }
  },

  created() {
    this.initData();
    this.fetchBadge();
    this.onSearch();
    this.fetchStaffList();
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
    width: 180px;
  }
}

.btn-box {
  display: flex;
  margin: 4px 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  .el-button {
    margin: 0 4px;
  }
}
</style>

