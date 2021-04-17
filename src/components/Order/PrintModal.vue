<template>
  <div>
    <div class="container">
      <div class="content" ref="print" v-if="user.store">
        <section class="header">
          <div>{{user.store.name}}</div>
          <div>洗衣单</div>
        </section>
        <div class="gap">=============================================</div>
        <section class="part1">
          <div class="item">洗衣单号：{{order.id}}</div>
          <!-- <div class="item">订单金额：{{order.amount}}元</div> -->
          <div class="item">取衣日期：{{order.take_time | parseTime}}</div>
          <div class="item">客户姓名：{{order.userName}}</div>
          <div class="item">客户电话：{{order.userPhone}}</div>
        </section>
        <div class="gap">=============================================</div>
        <section class="part2">
          <table class="items-table">
            <tr>
              <td>编号</td>
              <td>名称</td>
              <td>数量</td>
              <td>价格</td>
            </tr>
            <tr v-for="item of order.items" :key="item.id">
              <td>{{item.code}}</td>
              <td>{{item.name}}</td>
              <td>{{item.quantity}}</td>
              <td>{{item.price}}</td>
            </tr>
          </table>
          <div class="item">合计：共 {{totalCount}} 件</div>
        </section>
        <div class="gap">=============================================</div>
        <section class="part3">
          <div>订单备注:</div>
          <div class="memo">{{order.userMemo}}</div>
        </section>
        <div class="gap">=============================================</div>
        <section class="part4">
          <div class="item">应收金额：{{order.amount}}元</div>
          <div class="item">交易时间：{{order.create_time | parseTime}}</div>
          <div class="item">门店联系电话：</div>
          <div class="item tel">{{user.store.phone}}</div>
        </section>
      </div>
    </div>
    <div class="footer">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onPrint">确定打印</el-button>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
import { getUser } from "@/utils/auth";
export default {
  name: "print_modal",
  props: ["order"],
  data() {
    return {
      user: {}
    };
  },
  computed: {
    totalCount() {
      if (this.order) {
        let count = 0;
        this.order.items.forEach(item => {
          return count += item.quantity;
        });
        return count;
      } else {
        return 0;
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit("cancel");
    },
    onPrint() {
      this.$print(this.$refs.print);
      setTimeout(() => {
        this.$emit("cancel");
      }, 2000);
    }
  },
  mounted() {
    this.user = getUser();
  },
  created() {}
};
</script>
<style lang="scss" type="text/scss" scoped>
.container {
  background-color: #f5f5f5;
  height: 400px;
  padding: 20px;
  overflow-y: scroll;
}

.content {
  margin: 0 auto;
  background-color: white;
  width: 280px;
  padding: 20px;
  padding-bottom: 100px;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 11px;
  .header {
    text-align: center;
    width: 100%;
    div {
      margin: 6px 0;
    }
  }
  .gap {
    overflow-x: hidden;
    margin: 20px 0;
  }

  .item {
    margin: 8px 0;
  }

  .items-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 10px 0;
    td,
    th {
      text-align: center;
      height: 30px;
      width: 25%;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
    }
  }

  .memo {
    margin-top: 8px;
    font-size: 13px;
  }
}

.footer {
  text-align: right;
  margin-top: 20px;
}

.tel{
  font-size: 15px;
}
</style>