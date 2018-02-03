<template>
  <section class="index">
    <div class='part1'>
      <div class='col1'>
        <div>
          <p class="num">91</p>
          <p class="col-title">新订单</p>
        </div>
        <div>
          <Icon type="ios-calendar-outline vicon"></Icon>
        </div>
        <div class="more">更多详情<Icon type="android-arrow-forward"></Icon></div>
      </div>

      <div class='col2'>
        <div>
          <p class="num">1659.4</p>
          <p class="col-title">新销售额</p>
        </div>
        <div>
          <Icon type="stats-bars vicon"></Icon>
        </div>
        <div class="more">更多详情<Icon type="android-arrow-forward"></Icon></div> 
      </div>

      <div class='col3'>
        <div>
          <p class="num">25</p>
          <p class="col-title">总用户</p>
        </div>
        <Icon type="ios-people vicon"></Icon>
        <div class="more">更多详情<Icon type="android-arrow-forward"></Icon></div>
      </div>

      <div class='col4'>
        <div>
          <p class="num">120</p>
          <p class="col-title">总订单</p>
        </div>
        <div>
          <Icon type="connection-bars vicon"></Icon>
        </div>
        <div class="more">更多详情<Icon type="android-arrow-forward"></Icon></div>        
      </div>
    </div>
    <div class="total">
      <div>
        <h2>订单统计</h2>
        <div>
          <div>
            <p>0</p>
            <p>今日订单</p>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script>

export default {
  name: 'index',
  data() {
        return {
            
        };
    },

    computed: {
        
    },

    methods: {
      
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

  .total > div {
    border-top: 3px solid #d2d6de;
    border-radius: 3px;
  }
  
</style>
