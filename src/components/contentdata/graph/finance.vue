<template>
	<section class="pay-record">
		<h5>财务管理</h5>
		<div class='emial'>
            <Button class='btn-all' @click="exportExcel(tableData)" type='success'>导出全部</Button>
			<Table :loading="loading" border ref="table" :data="tableData" :columns="tableColumns" stripe  @on-selection-change='multiple'></Table>
			<Button class='btn' @click="exportExcel(selections)" type='success'>导出</Button>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'payRecord',
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
                        width: 100,                  
                        
                    },
                    {
                        title: '用户',
                        key: 'username',
                    },
                    {
                        title: '交易号',
                        key: 'tradeid',
                    }, 
                    {
                        title: '交易方式',
                        key: 'payment',
                        
                    }, 
                    {
                        title: '交易类型',
                        key: 'type',
                        render: (h, params) => {
                            const row = params.row;
                            const text = row.type == 1 ? '充值' : '消费'; 
                            return h('div', text);
                        }
                    }, 
                    {
                        title: '交易金额',
                        key: 'money',
                        
                    }, 
                                                                          
                    {
                        title: '交易状态',
                        key: 'status',
                        render: (h, params) => {
	                        const row = params.row;
                            const bgColor = row.status == 0 ? 'warning' : 'success';
                            const text = row.status == 0 ? '交易失败' : '交易成功';
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
                            return h('div', this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss'));
                        }
                    },                                                          
                ]
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData: function() {
                this.$axios.getFinance().then(res => {
                    let data = res.data;
                    this.getUser(data)
                })
            },
            getUser: function(params) {
                this.$axios.getUsers().then(res => {
                    const data = res.data
                    params.forEach(param => {
                        data.forEach(item => {
                            if (item.id == param.user_id) {
                                param.username = item.username
                            }
                        })
                    })
                    this.getPayment(params)
                })
            },
            getPayment: function(params) {
                this.$axios.getPayment().then(res => {
                    let data = res.data
                    data.forEach( item => {
                        params.forEach(param => {
                            if (param.payment == item.id) {
                                param.payment = item.name
                            }
                        })
                    })
                    this.tableData = params
                    this.loading = false
                })
            },
            multiple: function(multiple) {
                this.selections = multiple;
            },
            exportExcel: function(tableData) {
                let columns = [
                    {title: '编号', key: 'id'},
                    {title: '用户', key: 'username'},
                    {title: '交易号', key: 'tradeid'},
                    {title: '交易方式', key: 'payment'},
                    {title: '交易类型', key: 'type'},
                    {title: '交易金额', key: 'money'},
                    {title: '交易状态', key: 'status'},
                    {title: '交易时间', key: 'created_at'}
                ]
                tableData.forEach(item => {
                    item.type = item.type === 1 ? '充值' : '消费'
                    item.status = item.status === 0 ? '交易失败' : '交易成功'
                    item.created_at = this.$formatDate(new Date(item.created_at), 'yyyy-MM-DD hh:mm:ss')
                })
                this.$refs.table.exportCsv({
                    filename: '财务明细' + new Date().getFullYear() + '-' + new Date().getMonth() +1 + '-' + new Date().getDate(),
                    data: tableData,
                    original: false,
                    columns: columns
                })
            }
        }
    }
</script>

<style scoped>
	.pay-record {
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
    .btn-all {
        margin: 15px 10px;
    }

  	.btn {
  		margin-top: 20px;
  		margin-left: 10px;
  	}
</style>
