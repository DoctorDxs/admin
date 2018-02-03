<template>
	<section class="user-list">
		<h5>用户管理</h5>
		<div class='emial'>
            <Button class='btn' @click="exportAll(tableData)" type='success'>导出全部用户</Button>
			<Table border ref="table" :data="tableData" :columns="tableColumns" stripe></Table>
            <Modal
                v-model="modal"
                title="修改用户"
                width="600"
                @on-ok="ok(formData)">
                <Form :mode="formData" :label-width="60" style='margin-right: 10px;'>
                    <FormItem label="用户名">
                        <Input v-model="formData.username"></Input>
                    </FormItem>
                    <FormItem label="手机号">
                        <Input v-model="formData.phone"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input v-model="formData.password" type='password'></Input>
                    </FormItem>
                    <FormItem label="账户">
                        <Input v-model="formData.money"></Input>
                    </FormItem>
                    <FormItem label="积分">
                        <Input v-model="formData.score"></Input>
                    </FormItem>
                    <FormItem label="备注">
                        <Input v-model="formData.remark"></Input>
                    </FormItem>
                    <FormItem label="状态">
                        <i-switch v-model="formData.status" size="large">
                            <span slot="open">ON</span>
                            <span slot="close">OFF</span>
                        </i-switch>                    
                    </FormItem>
                </Form>
            </Modal>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'userList',
        data () {
            return {
                modal: false,
                formData: {},
                tableData: [],
                levels: [],
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
                        title: '用户名',
                        key: 'username',
                        render: (h, params) => {
                            return h('div', {
                            	attrs: {
                            		style: 'display:flex;flex-direction:row;align-items: center;'
                            	}
                            }, [
                            	h('img', {
                            		attrs: {
                            			src: '/static/img/avatar-wemall.3da0ea7.png',
                            			style: 'width:40px;height:40px;border-radius:30px;padding:5px;'
                            		},                      
                            	}),
                            	h('span', {
                            		attrs: {                    
                            			style: 'border-radius:30px;padding:5px;'
                            		},                      
                            	}, params.row.username),
                            ])
                        }
                    },
                    {
                        title: '帐户',
                        key: 'money',
                        width: 100
                    },
                    {
                        title: '积分',
                        key: 'score',
                        width: 80
                    },
                    {
                        title: '等级',
                        key: 'level',
                        render: (h, params) => {
                            const score = params.row.score;
                            let level;
                            for (let i = 0; i < this.levels.length; i++) {
                              if (score >= this.levels[i].score) {
                                level = this.levels[i].name;
                              }
                            };
                            return h('div', level);
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        render: (h, params) => {
	                        const row = params.row;
                            const bgColor = row.status === 0 ? 'warning' : 'success';
                            const text = row.status === 0 ? '已关闭' : '已开启';
                            return h('Button', {
                                props: {                    
                                    type: bgColor,
                                }
                            }, text);
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark',
                    },
                    {
                        title: '注册时间',
                        key: 'created_at',
                        render: (h, params) => {
                            const created = this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss')
                            return ('div', created)
                        } 
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        width: 160,
                        render: (h, params) => {
                            const row = params.row;
                            const text = params.row.status == 0 ? '开启' : '关闭'
                            const bgColor = params.row.status == 0 ? 'success' : 'warning'
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.modal = true;
                                            params.row.status = params.row.status == 0 ? false : true
                                            this.formData = params.row
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: bgColor,
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            params.row.status = !params.row.status
                                            this.saveUser(params.row)
                                        }
                                    }
                                }, text)
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
                this.$axios.getUsers().then(res => {
                  const data = res.data;
                  this.tableData = data
                });
                this.$axios.getUserLevel().then(res => {
                  const data = res.data;
                  this.levels = data
                });
            },
            saveUser: function(formData) {
                const data = {
                    id: formData.id || 0,
                    status: formData.status,
                    username: formData.username,
                    password: formData.password,
                    phone: formData.phone,
                    score: formData.score,
                    remark:formData.remark
                }
                this.$axios.postUsers({
                    method: 'post',
                    data: data
                }).then(res => {
                    this.getData()
                    this.$Message.success('处理成功！')
                })
            },

            exportAll: function(tableData) {
                let columns = [
                    {title: '编号', key: 'id'},
                    {title: '用户名', key: 'username'},
                    {title: '手机号', key: 'phone'},
                    {title: '余额', key: 'money'},
                    {title: '积分', key: 'score'},
                    {title: '状态', key: 'status'},
                    {title: '备注', key: 'remark'},
                    {title: '购买量', key: 'buy_num'},
                    {title: '会员等级', key: 'level'},
                    {title: '注册时间', key: 'created_at'},
                ]
                tableData.forEach(item => {
                    const score = item.score;
                    let level;
                    item.status = item.status == 0 ? '关闭' : '开启'
                    item.created_at = this.$formatDate(new Date(item.created_at), 'yyyy-MM-DD hh:mm:ss')
                    for (let i = 0; i < this.levels.length; i++) {
                      if (score >= this.levels[i].score) {
                        item.level = this.levels[i].name;
                      }
                    };

                })

                this.$refs.table.exportCsv({
                    filename: '全部用户'+ new Date().getFullYear() + '-' + new Date().getMonth() +1 + '-' + new Date().getDate(),
                    data: tableData,
                    original: false,
                    columns: columns                    
                })
            },
            ok: function(formData) {
                this.saveUser(formData)
            },
        }
    }
</script>

<style scoped>
	.user-list {
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
  		margin: 10px;
  	}
</style>
