<template>
  <section class="goods">
    <div><h5>商品SKU分析</h5></div>
    <Table border :columns="trTitle" :data="tableData" stripe></Table>
    <div style="margin: 20px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage" :page-size='size'></Page>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'goodsAnalysis',
  data() {
        return {
                total: 0,
                size: 20,
                current: 1,
                trTitle: [
                    {
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '浏览量',
                        key: 'visiter'
                    },
                    {
                        title: '购买量',
                        key: 'sales'
                    },
                    {
                        title: '销售额',
                        key: 'totalPrice',
                        render: (h, params) => {
                          const row = params.row;
                          return h('div', row.sales * row.price)
                        }
                    },
                    {
                        title: '购买率',
                        key: 'ratate',
                        render: (h, params) => {
                          const row = params.row;
                          const rotate = row.visiter == 0 ? 0 : row.sales / row.visiter * 100 + '%'
                          return h('div', rotate)
                        }
                    }
                ],
                tableData: [],
            }
    },

   created() {
      this.getData(1)
      this.getCount()
   },

    methods: {
	    getData: function(page) {
        this.$axios.getProductsPage(`?page=${page}&pageSize=${this.size}`).then(res => {
            const data = res.data.data;
            this.tableData = data;
        })
      },
      getCount: function() {
        this.$axios.getProdCount().then(res => {
          let data = res.data;
          console.log(data)
          this.total = data[0]['count(`id`)']
        })
      },
      changePage: function(page) {
        this.getData(page)
      }
    },
     
}
</script>

<style scoped>
  .goods {
    border-top: 3px solid #d2d6de;
    border-radius: 3px;
    background: #fff;
    padding-bottom: 10px;
  }

  h5{
      padding: 5px 10px;
      font-weight: 500;
      font-size: 18px;
    }
  
</style>
