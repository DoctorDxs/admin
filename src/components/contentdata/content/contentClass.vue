<template>
	<section class="content-class">
		<h5>文章分类</h5>
		<div class='emial'>
            <Button class='addclass' @click="modal = true" type='primary'>新增分类</Button>            
			<Table border ref="selection" :data="tableData" :columns="tableColumns1" stripe @on-selection-change='multiple'></Table>
            <div v-if='true'>
                <Button class='btn' @click="open(selections)" type='success'>开启</Button>
    			<Button class='btn' @click="off(selections)" type='error'>关闭</Button>
            </div>
            <Modal
                v-model="modal"
                title="新增菜单"
                width="600"
                @on-ok="ok(formData)"
                @on-cancel='cancel'
                ok-text='保存'>
                <Form :mode="formData" :label-width="80" style='margin-right: 10px;'>
                    <FormItem label="上级菜单">
                        <Select v-model="option.name" placeholder='一级菜单'>
                            <Option value="一级菜单">一级菜单</Option>
                            <Option v-for='(item, index) in options' :key='item.id' :value="item.name">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="名称">
                        <Input v-model="formData.name"></Input>
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
    	name: 'contentClass',
        data () {
            return {
                formData: {
                    type: 'view',
                    select: '一级菜单',
                    options: []
                },
                option:{},
                options: [],
                tableData: [],
                modal: false,
                selections: [],
                formData: {},
                tableColumns1: [ 
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
                        title: '名称',
                        key: 'name',                 
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 150,                  
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
                        title: '操作',
                        key: 'operate',
                        width: 215,
                        render: (h, params) => {
                            const row = params.row;
                            const text = params.row.status == 0 ? '开启' : '关闭'
                            const bgColor = params.row.status == 0 ? 'success' : 'error'
                            return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'primary',
	                                    size: 'small'
	                                },
	                                style: {
	                                    marginRight: '5px'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.modal = true; 
                                            params.row.status = params.row.status == 0 ? false : true               
                                            this.formData = params.row;
                                            this.formData.options = Object.assign({}, this.options);
                                            this.option = Object.assign({}, params.row);
	                                    }
	                                }
	                            }, '编辑'),
	                            h('Button', {
	                                props: {
                                        type: bgColor,
                                        size: 'small'
                                    },
	                                style: {
	                                    marginRight: '5px',
	                                },
	                                on: {
	                                    click: () => {
                                            const data ={
                                                id: params.row.id,
                                                status: !params.row.status
                                            }
                                            this.saveClass(data)
	                                    }
	                                }
	                            }, text),
	                            
                            ])
                        }
                    }                                                          
                ]
            }
        },
        created: function() {
            this.getData()
        },
        methods: {
            getData () {
                this.$axios.getClass().then(res => {
                    const data = res.data;
                    let options = [];
                    this.tableData = data;
                    data.forEach(option => {
                        if (option.pid == 0) {
                            options.push({
                                id: option.id,
                                name: option.name
                            })
                        }
                    });
                    this.options = options;
                    this.formData.options = Object.assign({}, options)
                })
            }, 
            saveClass: function(params) {
                this.$axios.postClass({
                    method: 'post',
                    data: params
                }).then(res => {
                    this.$Message.success('已保存设置！')
                    this.getData()
                })
            },
            multiple: function(multiple) {
                this.selections = multiple;
            },
            open: function(params) {
                params.forEach(select => {
                    select.status = 1 
                    const data = {
                        id: select.id,
                        status: select.status
                    };
                    this.saveClass(data)
                })
            },
            off: function(params) {
                params.forEach(select => {
                    select.status = 0 
                    const data = {
                        id: select.id,
                        status: select.status
                    };
                    this.saveClass(data)
                })
            }, 
            ok: function(formData) {
                let pid;
                if (this.option.name == '一级菜单') {
                    pid = 0;
                } else {
                    pid = this.option.id - 1
                }
                const data = {
                    id: formData.id || 0,
                    pid: pid,
                    name: formData.name,
                    remark: formData.remark,
                    status: formData.status
                };
                this.saveClass(data)
                this.formData = {}
            },
            cancel: function() {
                this.formData = {}
            }
        }
    }
</script>

<style scoped>
	.content-class {
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

    .addclass {
        margin: 5px 10px;
    }
</style>
