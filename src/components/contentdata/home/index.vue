<template>
  <section class="index">
    <div class='part1'>
      <div class='col1'>
        <div>
          <p class="num">{{newOrder}}</p>
          <p class="col-title">新订单</p>
        </div>
        <div>
          <Icon type="ios-calendar-outline vicon"></Icon>
        </div>
        <div class="more"><router-link :to="{ name: 'orderList', params:{ status: 0 }}" >更多详情</router-link><Icon type="android-arrow-forward"></Icon></div>
      </div>

      <div class='col2'>
        <div>
          <p class="num">{{newMoney}}</p>
          <p class="col-title">新销售额</p>
        </div>
        <div>
          <Icon type="stats-bars vicon"></Icon>
        </div>
        <div class="more"><router-link :to="{ name: 'orderList', params:{ status: 0 }}" >更多详情</router-link><Icon type="android-arrow-forward"></Icon></div> 
      </div>

      <div class='col3'>
        <div>
          <p class="num">{{users}}</p>
          <p class="col-title">总用户</p>
        </div>
        <Icon type="ios-people vicon"></Icon>
        <div class="more"><router-link :to="{ name: 'userList'}" >更多详情</router-link><Icon type="android-arrow-forward"></Icon></div>
      </div>

      <div class='col4'>
        <div>
          <p class="num">{{allOrders}}</p>
          <p class="col-title">总订单</p>
        </div>
        <div>
          <Icon type="connection-bars vicon"></Icon>
        </div>
        <div class="more"><router-link :to="{ name: 'orderList'}" >更多详情</router-link><Icon type="android-arrow-forward"></Icon></div>        
      </div>
    </div>
      <div class="total">
        <div>
          <h5>订单统计</h5>
          <div class="total-item">
            <div>
              <p>{{todayOrder}}</p>
              <p>今日订单</p>
            </div>
            <div>
              <p>{{yestdayOrder}}</p>
              <p>昨日订单</p>
            </div>
            <div>
              <p>{{weekOrder}}</p>
              <p>本周订单</p>
            </div>
            <div>
              <p>{{monthOrder}}</p>
              <p>本月订单</p>
            </div>
          </div>
        </div>
        <div>
          <h5>用户统计</h5>
          <div class="total-item">
            <div>
              <p>{{todayUser}}</p>
              <p>今日用户</p>
            </div>
            <div>
              <p>{{yestdayUser}}</p>
              <p>昨日用户</p>
            </div>
            <div>
              <p>{{weekUser}}</p>
              <p>本周用户</p>
            </div>
            <div>
              <p>{{monthUser}}</p>
              <p>本月用户</p>
            </div>
          </div>
        </div>
        <div>
          <h5>财务统计</h5>
          <div class="total-item">
            <div>
              <p>{{todyMoney}}</p>
              <p>今日财务</p>
            </div>
            <div>
              <p>{{yestMoney}}</p>
              <p>昨日财务</p>
            </div>
            <div>
              <p>{{tWeekMoney}}</p>
              <p>本周财务</p>
            </div>
            <div>
              <p>{{tMonthMoney}}</p>
              <p>本月财务</p>
            </div>
          </div>
        </div>
        <div>
          <h5>商品统计</h5>
          <div class="total-item">
            <div>
              <p>{{todayTrade}}</p>
              <p>今日商品</p>
            </div>
            <div>
              <p>{{yestdayTrade}}</p>
              <p>昨日商品</p>
            </div>
            <div>
              <p>{{weekTrade}}</p>
              <p>本周商品</p>
            </div>
            <div>
              <p>{{monthTrade}}</p>
              <p>本月商品</p>
            </div>
          </div>
        </div>
      </div>
      <div class='systemInfo'>
        <h5>系统信息</h5>
        <div>
          系统版本：7.4.24 <br>
          系统授权：已授权 <br>
          更新时间：2017.5.13 <br>
          服务器系统：WINNT <br>
          当前时间：{{now}} <br>
          官网网址：<a href="http://www.wemallshop.com">http://www.wemallshop.com</a> <br>
        </div>
      </div>
  </section>
</template>

<script>

export default {
    name: 'index',
    data () {
      return {
          now: new Date().toLocaleString(),
          newOrder: 0,
          newMoney: 0,
          users: 0,
          allOrders: 0,
          today: new Date() - new Date().getHours() * 3600 * 1000,
          yestDay: new Date() - new Date().getHours() * 3600 * 1000 - 24 * 3600 * 1000,
          tWeek: new Date() - new Date().getDay() * 24 * 3600 * 1000,
          tMonth: new Date() - new Date().getDate() * 24 * 3600 * 1000,
          todayOrder: 0,
          yestdayOrder: 0,
          weekOrder: 0,
          monthOrder: 0,
          todayUser: 0,
          yestdayUser: 0,
          weekUser: 0,
          monthUser: 0,
          todyMoney: 0,
          yestMoney: 0,
          tWeekMoney: 0,
          tMonthMoney: 0,
          todayTrade: 0,
          yestdayTrade: 0,
          weekTrade: 0,
          monthTrade: 0,
      };
    },

    created () { 
      this.getdata()
    },

    computed: {
        
    },

    methods: {
      getdata: function() {
        // 新订单 新销售额
        this.$axios.getNewOrder().then(res => {
          const data = res.data;
          let newMoney = 0;
          data.forEach(item => {
            newMoney +=item.totalprice;
          })
          this.newOrder = data.length;
          this.newMoney = newMoney;
        });
        // 总用户 今日用户 昨日用户 本周用户 本月用户
        this.$axios.getUsers().then(res => {
          const data = res.data;
          let todayUser = [];
          let yestdayUser = [];
          let weekUser = [];
          let monthUser = [];
          const today = this.today;
          const yestDay = this.yestDay;
          const tWeek = this.tWeek;
          const tMonth = this.tMonth;
          data.forEach(item => {
            const created = Date.parse(new Date(item.created_at))
            if (created > today) {
              todayUser.push(item)
            };
            if (yestDay < created && today > created) {
              yestdayUser.push(item)
            };
            if (created > tWeek) {
              weekUser.push(item)
            };
            if (created > tMonth) {
              monthUser.push(item)
            }
          })
          this.users = data.length;
          this.todayUser = todayUser.length;
          this.yestdayUser = yestdayUser.length;
          this.weekUser = weekUser.length;
          this.monthUser = monthUser.length;
        });
        // 总订单 今日订单 昨日订单、本周订单、本月订单  今日财务 昨日财务 本周财务 本月财务
        this.$axios.getOrders().then(res => {
          const data = res.data;
          let todayOrder = [];
          let yestdayOrder = [];
          let weekOrder = [];
          let monthOrder = [];
          let todyMoney = 0;
          let yestMoney = 0;
          let tWeekMoney = 0;
          let tMonthMoney = 0;
          const today = this.today;
          const yestDay = this.yestDay;
          const tWeek = this.tWeek;
          const tMonth = this.tMonth;
          data.forEach(item => {
            const created = Date.parse(new Date(item.created_at))
            if (created > today) {
              todyMoney +=item.totalprice
              todayOrder.push(item)
            };
            if (yestDay < created && today > created) {
              yestMoney +=item.totalprice
              yestdayOrder.push(item)
            };
            if (created > tWeek) {
              tWeekMoney +=item.totalprice
              weekOrder.push(item)
            };
            if (created > tMonth) {
              tMonthMoney +=item.totalprice
              monthOrder.push(item)
            }
          })
          this.allOrders = data.length;
          this.todayOrder = todayOrder.length;
          this.yestdayOrder = yestdayOrder.length;
          this.weekOrder = weekOrder.length;
          this.monthOrder = monthOrder.length;
          this.todyMoney = todyMoney;
          this.yestMoney = yestMoney;
          this.tWeekMoney = tWeekMoney;
          this.tMonthMoney = tMonthMoney;
        });
        // 今日商品、昨日商品、本周商品、本月商品
        this.$axios.getFinance().then(res => {
          console.log(res)
          const data = res.data;
          let todayTrade = [];
          let yestdayTrade = [];
          let weekTrade = [];
          let monthTrade = [];
          const today = this.today;
          const yestDay = this.yestDay;
          const tWeek = this.tWeek;
          const tMonth = this.tMonth;
          data.forEach(item => {
            const created = Date.parse(new Date(item.created_at))
            if (created > today) {
              todayTrade.push(item)
            };
            if (yestDay < created && today > created) {
              yestdayTrade.push(item)
            };
            if (created > tWeek) {
              weekTrade.push(item)
            };
            if (created > tMonth) {
              monthTrade.push(item)
            }
          })
          this.todayTrade = todayTrade.length;
          this.yestdayTrade = yestdayTrade.length;
          this.weekTrade = weekTrade.length;
          this.monthTrade = monthTrade.length;
        })
      },
    },
    watch: {
      '$route' (to, from) {
        
      
      }
    },
}
</script>

<style scoped>
  .index {
    width: 100%;
  }

  .total {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  h5 {
    border-bottom: 1px solid #f4f4f4;
    padding: 10px;
    font-weight: 500;
    font-size: 18px;
  }

  .total > div {
    border-top: 3px solid #d2d6de;
    border-radius: 3px;
    background: #fff;
    width: 48.5%;
    margin-top: 30px;
  }

  .total-item {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }

  .total-item > div {
    border-right: 1px solid #f4f4f4;
    width: 100%;
    margin: 15px 0;
  }

  .systemInfo {
    border-top: 3px solid #dd4b39;
    border-radius: 3px;
    background: #fff;
    margin: 30px 0;
    padding-bottom: 10px;
    font-size: 14px;
  }

  .systemInfo > div {
    border-left: 5px solid #eee;
    margin: 10px 15px;
    padding-left: 10px;
  }

  .systemInfo > div a {
    color: rgba(0, 0, 0, .6)
  }

  .systemInfo > div a:hover {
    color: rgba(0, 0, 0, .4)
  }

</style>
