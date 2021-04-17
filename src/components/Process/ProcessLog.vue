<template>
  <div class="container">
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="衣服编号" prop="code" align="center"></el-table-column>
      <el-table-column label="所属流程" align="center">
        <template slot-scope="scope">{{scope.row.status | processStatus}}</template>
      </el-table-column>
      <el-table-column label="负责人" prop="staffName" align="center"></el-table-column>
      <el-table-column label="操作时间" align="center">
        <template slot-scope="scope">{{scope.row.create_time | parseTime}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getLogs } from "@/api/process";
import { filterStatus } from "@/views/order/process-filters";
export default {
  name: "process_log",
  props: ["itemId"],
  data() {
    return {
      list: []
    };
  },
  filters: {
    processStatus(status) {
      return filterStatus(status);
    }
  },
  methods: {
    fetchLogs() {
      if (this.itemId.length <= 0) {
        return;
      }
      getLogs(this.itemId).then(res => {
        this.list = res.data;
      });
    }
  },
  watch: {
    itemId() {
      this.fetchLogs();
    }
  },
  mounted() {
    this.fetchLogs();
  },
  created() {}
};
</script>
<style lang="scss" type="text/scss" scoped>
</style>