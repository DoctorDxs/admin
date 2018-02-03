<template>
	<section class="admin-user">
		<h5>用户组管理</h5>
		<div class='emial'>
            <Button class='btn' @click="add" type='primary'>新增用户组</Button>
			<Table border :data="tableData" :columns="tableColumns" stripe></Table>
            <Modal
                v-model="modal"
                title="新增用户组"
                width="960"
                @on-ok="ok(formData)">
                <Form :mode="formData" :label-width="60" style='margin-right: 10px;'>
                    <FormItem label="名称">
                        <Input v-model="formData.title"></Input>
                    </FormItem>
                    <FormItem label="权限">
                        <Table border :data="rules" :columns="rulesColumns" stripe @on-selection-change='multiple'></Table>
                    </FormItem>
                </Form>
            </Modal>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'adminUser',
        data () {
            return {
                modal: false,
                tableData: [],
                formData: {},
                rules: [],
                rule: [],
                rulesColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },           
                    {
                        title: '编号',
                        key: 'id',
                    },
                    {
                        title: '权限标题',
                        key: 'title',
                    },
                    {
                        title: '权限',
                        key: 'name',
                    },
                ],
                tableColumns: [            
                    {
                        title: '编号',
                        key: 'id',
                        width: 100,                  
                    },
                    {
                        title: '用户组',
                        key: 'title',
                    },
                    
                    {
                        title: '状态',
                        key: 'status',
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
                        title: '时间',
                        key: 'time',
                        render: (h, params) => {
                            return h('div', '200');
                        }
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        width: 215,
                        render: (h, params) => {
                            const row = params.row;
                            const text = params.row.status == 0 ? '开启' : '关闭'
                            const bgColor = params.row.status == 0 ? 'success' : 'warning'
                            const disabled = params.row.id ==1 ? true : false
                            return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'primary',
	                                    size: 'small',
                                        disabled: disabled
	                                },
	                                style: {
	                                    marginRight: '5px'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.modal = true;
                                            this.formData = params.row
                                            let rule = params.row.rules.split(',');
                                            this.rule = rule;
                                            this.getSelfRule()
	                                    }
	                                }
	                            }, '编辑'),
	                            h('Button', {
	                                props: {
	                                    type: bgColor,
	                                    size: 'small',
                                        disabled: disabled
	                                },
	                                style: {
	                                    marginRight: '5px',
	                                },
	                                on: {
	                                    click: () => {
	                                        params.row.status = !params.row.status;
                                            this.saveGroup(params.row)
	                                    }
	                                }
	                            }, text),
	                            h('Button', {
	                                props: {
	                                    type: 'error',
	                                    size: 'small',
                                        disabled: disabled
	                                },
	                                on: {
	                                    click: () => {
                                            this.deleteGroup(params.row.id)
	                                    }
	                                }
	                            }, '删除')
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
                this.$axios.getAdminGroup().then(res => {
                    const data = res.data;
                    this.tableData = data;
                });
            },
            getSelfRule: function() {
                this.$axios.getAdminRule().then(res => {
                    const data = res.data;
                    const rule = this.rule;
                    if (rule.length > 0) {
                        rule.forEach(id => {
                            data.forEach(item => {
                                if (id == item.id) {
                                    item._checked = true
                                }
                            })
                        })
                        this.rules = data;
                    } else {
                        this.rules = data;
                    }
                });
            },
            saveGroup: function(formData) {
                const data = {
                    id: formData.id || 0,
                    status: 1,
                    title: formData.title,
                    rules: formData.rules
                };
                this.$axios.postAdminGroup({
                    method: 'post',
                    data: data
                }).then(res => {
                    this.getData()
                    this.$Message.success('处理成功！')
                })
            },
            add: function() {
                this.modal = true;
                this.getSelfRule()
                this.formData = {}
            },
            deleteGroup: function(id) {
                this.$axios.deleteAdminGroup(id).then(res => {
                    id = null
                    this.getData()
                    this.$Message.success('已删除！')
                })
            },
            multiple: function(selections) {
                this.selections = selections
            },
            ok: function(formData) {
                let ids = [];
                const selections = this.selections
                if (selections.length > 0) {
                    selections.forEach(selection => {
                        ids.push(selection.id)
                    })
                    formData.rules = ids.join(',')
                } else {
                    formData.rules = ''
                }
                this.saveGroup(formData)
            }
        }
    }
</script>

<style scoped>
	.admin-user {
		background: #fff;
    	border-top: 3px solid #d2d6de;
    	border-radius: 3px;	
    	padding-bottom: 15px;
	}

	h5{
	    border-bottom: 1px solid #f4f4f4;
	    padding: 5px 10px;
	    font-weight: 500;
	    font-size: 18px;
  	}

  	.btn {
  		margin: 10px;
  	}
</style>
