<template>
	<section>
		<div class="container">
			关键词:qqkf 设置qq客服,备注设置qq号
		</div>
		<div class="wx-menu">
			<h5>微信菜单管理</h5>
			<div class="addNew">
				<Button type="success" @click="modal = true" large>新增菜单</Button>
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
				        <FormItem label="菜单名称">
				            <Input v-model="formData.name"></Input>
				        </FormItem>
				        <FormItem label="类型">
				            <RadioGroup v-model="formData.type" size='large' @on-change='changeType'>
				                <Radio label="view">模拟关键字</Radio>
				                <Radio label="click">链接</Radio>
				            </RadioGroup>
				        </FormItem>
				        <FormItem label="url" v-if='isUrl'>
				            <Input v-model="formData.url"></Input>
				        </FormItem>
				        <FormItem label="关键词" v-else>
				            <Input v-model="formData.key"></Input>
				        </FormItem>
				        <FormItem label="排序">
				            <Input v-model="formData.rank"></Input>
				        </FormItem>
				        <FormItem label="备注">
				            <Input v-model="formData.remark"></Input>
				        </FormItem>		        
				    </Form>
			    </Modal>
			</div>
			<div class='emial'>
				<Table border ref="selection" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple'></Table>
				<Button class='btn' @click="selfMenu(selections)" type='success'>生成自定义菜单</Button>
			</div>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'wxMenu',
        data () {
            return {
            	formData: {
            		type: 'view',
            		select: '一级菜单',
            		options: []
            	},
            	option:{},
            	options: [],
            	modal:false,
            	isUrl: false,
                tableData: [],
                selections: [],
                tableColumns: [ 
                	{
                		type: 'selection',
                		width: 60,
                        align: 'center',                
                	},           
                    {
                        title: 'ID',
                        key: 'id',
                        width: 60,                   
                    },
                    {
                        title: 'PID(上级)',
                        key: 'pid',
                        width: '90',
                    },
                    {
                        title: '菜单名称',
                        key: 'name',
                        width: '100',
                    },
                    {
                        title: '类型',
                        key: 'type',
                        width: '100',
                        render: (h, params) => {
                            const row = params.row;
                            let type = row.type == 'view' ? '模拟关键字' : '链接';
                            if (row.type == 'view') {
                                this.isUrl = false;
                            } else {
                                this.isUrl = true;
                            }
                        	return h('div', type)
                        }
                    },
                    {
                        title: 'url',
                        key: 'url',
                    },
                    {
                        title: '关键词',
                        key: 'key',
                        width: '100',
                    },
                    {
                        title: '排序',
                        key: 'rank',
                        width: '80',
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        width: '80',
                    },                 
                    {
                        title: '操作',
                        key: 'operate',
                        width: 215,
                        render: (h, params) => {
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
	                                    	this.formData = params.row;
	                                    	this.formData.options = Object.assign({}, this.options);
                                            this.option = Object.assign({}, params.row);
	                                    }
	                                }
	                            }, '修改'),
	                            h('Button', {
	                                props: {
	                                    type: 'warning',
	                                    size: 'small'
	                                },
	                                on: {
	                                    click: () => {	                                    
	                                        this.deleteData(params.row.id)
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
        		this.$axios.getWxmenu().then(res => {
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
        			this.formData.options = options
        		})
        	},
        	deleteData: function(id) {
        		this.$axios.deleteWxmenu(id).then(res => {
        			this.$Message.success('删除成功！')
        			this.getData()
        		})
        	},
        	changeType: function(radio) {
        		this.isUrl = radio == 'view' ? false : true
        	},
        	saveWxmenu: function(params) {
        		this.$axios.postWxmenu({
        			method: 'post',
        			data: params
        		}).then(res => {
        			this.$Message.success('已保存设置！')
        			this.getData()
        		})
        	},
        	selfMenu: function(params) {
        		// params.forEach(select => {
        		// 	select.status = 1 
        		// 	const data = {
        		// 		id: select.id,
        		// 		status: select.status
        		// 	};
        		// 	this.savewx-menu(data)
        		// })
        	},        
        	multiple: function(multiple) {
        		// this.selections = multiple;
        	},
        	ok: function(formData) {
                if (!formData.name) {
                    this.$Message.error('菜单名称不能为空！！！')
                    return false
                }
        		let pid;
                if (this.option.name == '一级菜单') {
                    pid = 0;
                } else {
                    const name = this.option.name
                    const options = this.options
                    options.forEach(option => {
                        if (option.name == name) {
                            pid = option.id - 1
                        }
                    })
                }

        		const data = {
        			id: formData.id || 0,
        			name: formData.name,
        			key: formData.key,
        			pid: pid,
        			rank: formData.rank,
        			remark: formData.remark,
        			type: formData.type,
        			url: formData.url,
        			status: formData.status
        		};
        		this.saveWxmenu(data)
        		this.formData = {
        			type: 'view',
            		select: '一级菜单',
            		options: []
        		};        	
        	},
        	cancel: function() {
        		this.formData = {
        			type: 'view',
            		select: '一级菜单',
            		options: []
        		}; 
        	}
        }
    }
</script>

<style scoped>
	.container {
		padding: 15px 10px;
		background: #dd4b39;
		border-left: 3px solid #c23321;
		border-radius: 3px;
		color: #fff;
		font-size: 14px;
		margin-bottom: 20px;
	}

	.wx-menu {
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
	
	.addNew {
		padding: 10px;
	}
</style>
