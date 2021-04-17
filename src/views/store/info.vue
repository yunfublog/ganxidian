<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="任务名称：">
        <div>xxx</div>
      </el-form-item>
      <el-form-item label="参考工资：">
        <div>xxx 元/人</div>
      </el-form-item>
      <el-form-item label="用工描述：">
        <div>xxx</div>
      </el-form-item>
      <el-form-item label="用工要求：">
        <div>xxx</div>
      </el-form-item>
      <el-form-item label="用工区域：">
        <div>xxx</div>
      </el-form-item>
      <el-form-item label="招收人数：">
        <div>xxx</div>
      </el-form-item>

      <el-form-item label="招工期间：">
        <div>xxxxx 至 xxxx</div>
      </el-form-item>

      <el-form-item label="用工期间：">
        <div>xxxxx 至 xxxx</div>
      </el-form-item>

      <!-- <el-form-item>
        <el-button @click="onBack" type="primary">返&nbsp;&nbsp;回</el-button>
      </el-form-item>-->
    </el-form>
    <div class="user-box">
      <h2>录用人员:</h2>
      <el-table :data="info.users" border fit highlight-current-row>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">xxxx</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">xxxx</template>
        </el-table-column>
        <el-table-column label="电话" align="center">
          <template slot-scope="scope">xxxx</template>
        </el-table-column>
        <el-table-column label="身份证号" align="center">
          <template slot-scope="scope">xxxx</template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="onBack">返&nbsp;&nbsp;回</el-button>
    </div>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "store-info",
  data() {
    return {
      id: "",
      info: {}
    };
  },

  methods: {
    onBack() {
      this.$router.back();
    },
    
    // fetchInfo() {
    //   getInfo(this.id).then(res => {
    //     this.info = res.data;
    //   });
    // }
  },

  created() {
    this.id = this.$route.query.id;
    // this.fetchInfo();
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
.line {
  text-align: center;
}
.el-form {
  width: 80%;
}

.user-box {
  padding-left: 34px;
}

.el-table{
  margin-bottom: 25px;
}

</style>