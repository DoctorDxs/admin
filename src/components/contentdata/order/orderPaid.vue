<template>
	<section class="order-paid">
		<h5>售后列表</h5>
		<div class='emial'>
			<Table border :loading='loading' ref="selection" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple'></Table>
			<Button class='btn' @click="open(selections)" type='success'>通过</Button>
			<Button class='btn' @click="off(selections)" type='warning'>拒绝</Button>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'orderPaid',
        data () {
            return {
                tableData: [],
                selections: [],
                loading: true,
                tableColumns: [ 
                	{
                		type: 'selection',
                		width: 60,
                        align: 'center'
                	},           
                    {
                        title: '编号',
                        key: 'id',
                        width: 80,                  
                    },
                    {
                        title: '订单编号',
                        key: 'orderid',
                        width: 120
                    },
                    {
                        title: '用户',
                        key: 'username',
                    },
                    {
                        title: '售后类型',
                        key: 'reasonName',
                    },
                    {
                        title: '商品',
                        key: 'productName',
                    }, 
                    {
                        title: '备注',
                        key: 'remark',
                    },                                                                                                                 
                    {
                        title: '状态',
                        key: 'status',
                        width: 100,
                        render: (h, params) => {
	                        const row = params.row;
                            const bgColor = row.status === 0 ? 'dashed' : 
                                           (row.status === 1 ? 'success' : 'warning');
                            const text = row.status === 0 ? '未处理' : 
                                        (row.status === 1 ? '已通过' : '已拒绝');;
                            return h('Button', {
                                props: {                    
                                    type: bgColor,
                                }
                            }, text);
                        }
                    },
                    {
                        title: '时间',
                        key: 'created_at',
                        render: (h, params) => {
                            const created = this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss')
                            return ('div', created)
                        } 
                    },
                     {
                        title: '操作',
                        key: 'operate',
                        width: 140,
                        render: (h, params) => {
                            return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'success',
	                                    size: 'small',
	                                },
	                                style: {
	                                    marginRight: '5px'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.savePrdEx({
                                                id: params.row.id,
                                                status: 1
                                            })
	                                    }
	                                }
	                            }, '通过'),
	                            h('Button', {
	                                props: {
	                                    type: 'warning',
	                                    size: 'small',
	                                },
	                                style: {
	                                    marginRight: '5px',
	                                },
	                                on: {
	                                    click: () => {
	                                        this.savePrdEx({
                                                id: params.row.id,
                                                status: -1
                                            })
	                                    }
	                                }
	                            }, '拒绝'),
	                            
                            ])
                        }
                    }                                                          
                ]
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData: function() {
                this.$axios.getPrdEx().then(res => {
                  const data = res.data;
                  this.getOrder(data)
                });
            },

            getOrder: function(params) {
                this.$axios.getOrders().then(res => {
                    const data = res.data;
                    params.forEach(param => {
                        data.forEach(item => {
                            if (param.order_id == item.id) {
                                console.log(item)
                                param.orderid = item.orderid
                                param.user_id = item.user_id
                            }
                        })
                    })
                    this.getUser(params)
                })
            },

            getUser: function(params) {
                this.$axios.getUsers().then(res => {
                    const data = res.data;
                    params.forEach(param => {
                        data.forEach(item => {
                            if (param.user_id == item.id) {
                                param.username = item.username
                            }
                        })
                    })
                    this.getProduct(params)
                })
            },

            getProduct: function(params) {
                this.$axios.getProducts().then(res => {
                    const data = res.data;
                    params.forEach(param => {
                        data.forEach(item => {
                            if (param.product_id == item.id) {
                                param.productName = item.name
                            }
                        })
                    })
                    this.getBackType(params)
                })
            },

            getBackType: function(params) {
                this.$axios.getFeedbackType().then(res => {
                    const data = res.data;
                    params.forEach(param => {
                        data.forEach(item => {
                            if (param.reason_id == item.id) {
                                param.reasonName = item.name
                            }
                        })
                    })
                    this.tableData = params
                    this.loading = false
                })
            },
            
            savePrdEx: function(params) {
                this.$axios.postPrdEx({
                    method: 'post',
                    data: params
                }).then(res => {
                    this.$Message.success('已保存设置！')
                    this.getData()
                })
            },

            multiple: function(selections) {
                this.selections = selections
            },

            open: function(selections) {
                selections.forEach(item => {
                    this.savePrdEx({
                        id: item.id,
                        status: 1
                    })
                });
            },

            off: function(selections) {
                selections.forEach(item => {
                    this.savePrdEx({
                        id: item.id,
                        status: -1
                    })
                });
            }
            
        }
    }
</script>

<style scoped>
	.order-paid {
		background: #fff;
    	border-top: 3px solid #d2d6de;
    	border-radius: 3px;	
    	padding-bottom: 15px;
	}

	h5{
	    border: 1px solid #f4f4f4;
	    border-bottom: 1px solid #f4f4f4;
	    padding: 5px 10px;
	    font-weight: 500;
	    font-size: 18px;
	    border-left: 1px solid #e9eaec;
    	border-right: 1px solid #e9eaec;
  	}

  	.btn {
  		margin-top: 20px;
  		margin-left: 10px;
  	}
</style>
