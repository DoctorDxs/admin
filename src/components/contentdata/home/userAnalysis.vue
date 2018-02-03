<template>
  <section class="user-analysis">
    <div class='part1'>
      <div class='col1'>
        <div>
          <p class="num">{{todayUser}}</p>
          <p class="col-title">今日新用户</p>
        </div>
        <div>
          <Icon type="person-add vicon"></Icon>
        </div>
        <div class="more"><router-link :to="{ name: 'userList', params:{ created_at: 'new' }}" >更多详情</router-link><Icon type="android-arrow-forward"></Icon></div>
      </div>

      <div class='col2'>
        <div>
          <p class="num">{{yestdayUser}}</p>
          <p class="col-title">昨日新用户</p>
        </div>
        <div>
          <Icon type="person-add vicon"></Icon>
        </div>
        <div class="more"><router-link :to="{ name: 'userList', params:{ created_at: 'old' }}" >更多详情</router-link><Icon type="android-arrow-forward"></Icon></div> 
      </div>

      <div class='col3'>
        <div>
          <p class="num">{{newRoate}}</p>
          <p class="col-title">今日新用户购买率</p>
        </div>
        <Icon type="pie-graph vicon"></Icon>
        <div class="more"></div>
      </div>

      <div class='col4'>
        <div>
          <p class="num">{{rotate}}</p>
          <p class="col-title">购买率</p>
        </div>
        <div>
          <Icon type="pie-graph vicon"></Icon>
        </div>
        <div class="more"></div>        
      </div>
    </div>
    <div class="chart1">
      <h5>新用户走势图</h5>
      <div id='myCharts1'></div>
    </div>
     <div class="chart2">
      <h5>用户消费走势图</h5>
      <div id='myCharts2'></div>
    </div>
    </div>
  </section>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'userAnalysis',
  data() {
        return {
          // 初始化空对象
          chart: null,
          newRoate: 0,
          rotate: 0,
          today: new Date() - new Date().getHours() * 3600 * 1000,
          yestDay: new Date() - new Date().getHours() * 3600 * 1000 - 24 * 3600 * 1000,
          todayUser: 0,
          yestdayUser: 0,
          users: []
        }
    },
    created() {
      this.getData();
      this.getDate()
    },
    
     mounted() {
        this.$nextTick(function() {
            this.drawGraph1('myCharts1')
            this.drawGraph2('myCharts2')
        })
    },
    methods: {
	    drawGraph1: function(id) {
	        // 绘图方法
	        this.chart = echarts.init(document.getElementById(id))
	       
	            // 返回到data中
	        this.chart.setOption({
            grid: {
              show: true,
            	containLabel: true,
              left: '40px',
              right: '40px',
              top: '30px',
              bottom: '30px',
              borderColor: '#e3e4e5'
            },
            xAxis: {
				      type: 'category',
				      axisLabel: {
                interval: 0,
                showMinLabel: true,
              },
              boundaryGap: false,
              data: this.x
				    },
				    yAxis: {
			        type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
    				},
    				tooltip: {
    					trigger: 'axis',
    					axisPointer: {
    						show: true
    					}
    				},
    				series: [{
              type: 'line',
              data: [],
              label: {
                normal: {
                  show: true
                }
              },
              

              // 标注出y轴平均值 线
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
          }
        ]
                    
        })
            
	    },
      drawGraph2: function(id) {
          // 绘图方法
          this.chart = echarts.init(document.getElementById(id))
         
              // 返回到data中
          this.chart.setOption({
            grid: {
              show: true,
              containLabel: true,
              left: '40px',
              right: '40px',
              top: '30px',
              bottom: '30px',
              borderColor: '#e3e4e5'
            },
            xAxis: {
              // type: 'category',
              axisLabel: {
                interval: 0,
                showMinLabel: true,
              },
              boundaryGap: false,
              data: this.x
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                show: true
              }
            },
            series: [{
              type: 'line',
              data: [],
              label: {
                normal: {
                  show: true
                }
              },
              markPoint: {
                data: [
                  {
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },

              // 标注出y轴平均值 线
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
          }
        ]
                    
        })
            
      },



      //今日 昨日  新用户  
      getData: function() {
        //今日 昨日  新用户  
        this.$axios.getUsers().then(res => {
          const data = res.data;
          let todayUser = [];
          let yestdayUser = [];
          const today = this.today;
          const yestDay = this.yestDay;
          data.forEach(item => {
            const created = Date.parse(new Date(item.created_at))
            
            if (created > today) {
              todayUser.push(item)
            };
            if (yestDay < created && today > created) {
              yestdayUser.push(item)
            };
          })
          this.users = data;
          this.todayUser = todayUser.length;
          this.yestdayUser = yestdayUser.length;
        });
      },

      getDate: function() {
        let x = [];
        const date = new Date();
        for (let i = 18; i > 0; i--) {
          let differ = new Date(date - 24 * 3600 * 1000 * i);
          let year = differ.getFullYear();
          let month = differ.getMonth() + 1;
          let day = differ.getDate();
          let option = year +'-'+ month +'-'+ day
          x.push(option)
        }
        this.x = x;
      }
    },

    
}
</script>

<style scoped>
  .user-analysis {
    width: 100%;
  }

  #myCharts1,
  #myCharts2 {
  	height: 300px;
    width: 100%;
  }

  .chart1,
  .chart2 {
    background: #fff;   
    margin-top: 30px;
    border-top: 3px solid #d2d6de;
    border-radius: 3px;
  }

  h5{
    border: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
    padding: 5px 10px;
    font-weight: 500;
    font-size: 18px;
  }
  
</style>
