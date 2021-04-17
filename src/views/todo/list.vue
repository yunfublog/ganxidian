<template>
  <div class="app-container">
    <div class="form-box">
      <el-tabs v-model="status" @tab-click="onTabClick">
        <el-tab-pane label="未完成" name="0"></el-tab-pane>
        <el-tab-pane label="已完成" name="1"></el-tab-pane>
      </el-tabs>
      <el-form inline>
        <el-form-item label>
          <el-button type="primary" @click="onCeate" size="small">添加便签</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="便签内容" align="left" prop="title" width="auto"></el-table-column>
      <el-table-column label="截止日期" align="center" width="150px">
        <template slot-scope="scope">{{scope.row.dead_time | parseDate}}</template>
      </el-table-column>
      <el-table-column label="创建日期" align="center" width="150px">
        <template slot-scope="scope">{{scope.row.create_time | parseDate}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280px">
        <template slot-scope="scope">
          <div class="btn-box">
            <el-button type="primary" @click="onComplete(scope.row)" size="small">确认完成</el-button>
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

    <el-dialog title="添加便签" :visible.sync="isShowModal" width="50%" :modal-append-to-body="false">
      <el-form label-width="80px">
        <el-form-item label="截止日期:">
          <el-date-picker
            v-model="form.dead_time"
            type="date"
            placeholder="截止日期:"
            style="width: 100%;"
            format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="便签内容:">
          <el-input placeholder="便签内容" v-model="form.title" type="textarea" rows="12"></el-input>
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
import { getList, create, remove, update } from "@/api/todo";
import dayjs from "dayjs";

export default {
  data() {
    return {
      status: "0",
      list: [],
      total: 0,
      page: 1,
      limit: 10,
      isShowModal: false,
      isEdit: false,
      isOprateId: "",
      form: {
        title: "",
        dead_time: ""
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

    onEdit(item) {
      this.isOprateId = item.id;
      this.form.title = item.title;
      this.form.dead_time = item.dead_time;
      this.isEdit = true;
      this.isShowModal = true;
    },

    onDelete(item) {
      this.$confirm("此操作将永久删除该便签, 是否继续?", "提示", {
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

    onComplete(item){
      this.$confirm("此操作将更改便签为已完成, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const data = {status:"1"};
        update(item.id, data).then(res => {
          this.toast.success("提交成功");
          this.onSearch();
        });
      });
    },

    onCeate() {
      this.isEdit = false;
      this.isShowModal = true;
    },

    onModalSure() {
      if (this.form.title.length <= 0) {
        this.toast.warn("请输入便签内容");
        return;
      }
      if (this.form.dead_time.length <= 0) {
        this.toast.warn("请选择截止日期");
        return;
      }
      const data = {
        title: this.form.title,
        dead_time: dayjs(this.form.dead_time).format("YYYY-MM-DD")
      };
      if (this.isEdit) {
        update(this.isOprateId, data).then(res => {
          this.isShowModal = false;
          this.toast.success("编辑成功");
          this.onSearch();
        });
      } else {
        create(data).then(res => {
          this.isShowModal = false;
          this.toast.success("创建成功");
          this.onSearch();
        });
      }
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
    this.onSearch();
  }
};
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  text-align: center;
  .el-button {
    margin-left: 12px;
    margin-right: 12px;
    /* margin-top: 8px; */
    /* &:first-child {
      margin-top: 0;
    } */
  }
}
</style>

