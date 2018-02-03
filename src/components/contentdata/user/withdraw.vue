<template>
	<section class="withdraw">
		<h5>提现管理</h5>
		<div class='emial'>
			<Table :loading='loading' border :data="tableData" :columns="tableColumns" stripe></Table>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'userMsg',
        data () {
            return {
                tableData: [],
                loading: true,
                tableColumns: [           
                    {
                        title: '编号',
                        key: 'id',
                        width: 80,                  
                        render: (h, params) => {
                        	return h('div', 123)
                        }
                    },
                    {
                        title: '用户',
                        key: 'username',
                        width: 120,
                        render: (h, params) => {
                            return h('div', params.row.username)
                        }
                    },
                    {
                        title: '申请金额',
                        key: 'money',
                        width: 120,
                        render: (h, params) => {
                            return h('div', params.row.money);
                        }
                    }, 
                    {
                        title: '手续费',
                        key: 'fee',
                        width: 80,
                        render: (h, params) => {
                            return h('div', params.row.fee);
                        }
                    }, 
                    {
                        title: '提现金额',
                        key: 'tx',
                        width: 120,
                        render: (h, params) => {
                            return h('div', params.row.tx);
                        }
                    },
                    {
                        title: '账户',
                        key: 'account',
                        width: 180,
                        render: (h, params) => {
                            return h('div', params.row.account);
                        }
                    }, 
                                                                          
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        render: (h, params) => {
	                        const row = params.row;
                            const bgColor = row.status === 0 ? 'warning' :
                                            (row.status === -1 ? 'error' : 'success');
                            const text = row.status === -1 ? '已拒绝' :
                                        (row.status === 0 ?  '未审核' : '已通过');
                            return h('Button', {
                                props: {                    
                                    type: bgColor,
                                }
                            }, text);
                        }
                    },
                    {
                        title: '申请时间---操作时间',
                        key: 'Account',
                        render: (h, params) => {
                            const created = this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss')
                            const updated = this.$formatDate(new Date(params.row.updated_at), 'yyyy-MM-DD hh:mm:ss')
                            return h('div', created + '---' + updated);
                        }
                    },                                       
                    {
                        title: '操作',
                        key: 'operate',
                        width: 140,
                        render: (h, params) => {
                            let disabled;
                            if(params.row.status != 0) {
                                disabled = true
                            } else {
                                disabled = false
                            }
                            return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'warning',
	                                    size: 'small',
                                        disabled: disabled
	                                },
	                                style: {
	                                    marginRight: '5px',
	                                },
	                                on: {
	                                    click: () => {
                                            params.row.status = -1
	                                        this.saveUsertx(params.row)
	                                    }
	                                }
	                            }, '拒绝'),
	                            h('Button', {
	                                props: {
	                                    type: 'success',
	                                    size: 'small',
                                        disabled: disabled
	                                },
	                                style: {
	                                    marginRight: '5px',
	                                },
	                                on: {
	                                    click: () => {
                                            params.row.status = 1
	                                        this.saveUsertx(params.row)
	                                    }
	                                }
	                            }, '通过'),
	                            
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
                this.$axios.getUsrtx().then(res => {
                    let data = res.data;
                    data.forEach(item => {
                        this.$axios.getUser(item.user_id).then(res => {
                            const username = res.data.username;
                            item.username = username
                        })
                    })
                    setTimeout(() => {
                        this.tableData = data
                        this.loading = false
                    },1000)
                })
            },
            saveUsertx: function(params) {
                const data = {
                    id: params.id,
                    status: params.status
                }
                this.$axios.postUsrtx({
                    method: 'post',
                    data: data
                }).then(res => {
                    this.$Message.success('处理成功！')
                })
            },
        }
    }
</script>

<style scoped>
	.withdraw {
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
