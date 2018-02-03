<template>
	<section>
		<div class="container">
			微信模板消息请设置所在行业为IT科技/互联网|电子商务，消费品/消费品 <br>
			无法自动添加的用户请在微信后台手动添加设置
		</div>
		<div class="wx-msg">
			<h5>微信模版消息列表</h5>
			<div class="addNew">
			    <Modal
			        v-model="modal"
			        title="模版消息配置"
			        width="600"
			        @on-ok="ok(formData)"
			        ok-text='保存'>
			        <Form :mode="formData" :label-width="80" style='margin-right: 10px;'>
				        <FormItem label="模版类型">
				            <Input v-model="formData.name" disabled></Input>
				        </FormItem>
				        <FormItem label="模版编号">
				            <Input v-model="formData.template_id_short" disabled></Input>
				        </FormItem>
				        <FormItem label="模版标题">
				            <Input v-model="formData.title"></Input>
				        </FormItem>
				        <FormItem label="备注">
				            <Input v-model="formData.remark" type='textarea'></Input>
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
			<div class='emial'>
				<Table border ref="selection" :data="tableData" :columns="tableColumns" stripe></Table>
			</div>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'wxMsg',
        data () {
            return {
            	formData: {},
            	modal:false,
                tableData: [],
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
                        render: (h, params) => {
                        	const row = params.row;
                        	return h('div', row.id)
                        }
                    },
                    {
                        title: '模版类型',
                        key: 'name',
                    },
                    {
                        title: '模版编号',
                        key: 'template_id_short',
                    },
                    {
                        title: '模版标题',
                        key: 'title',
                    },
                    {
                        title: '备注',
                        key: 'remark',
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
	                                        const data ={
	                                        	id: params.row.id,
	                                        	status: !params.row.status
	                                        }
	                                        this.saveTpl(data)
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
        		this.$axios.getWxTpl().then(res => {
        			const data = res.data;
        			this.tableData = data;
        		})
        	},
        	saveTpl: function(params) {
        		this.$axios.postTpl({
        			method: 'post',
        			data: params
        		}).then(res => {
        			this.$Message.success('已保存设置！')
        			this.getData()
        		})
        	},
        	ok: function(formData) {
        		const data = {
        			id: formData.id || 0,
        			name: formData.name,
        			title: formData.title,
        			remark: formData.remark,
        			type: formData.type,
        			template_id_short: formData.template_id_short,
        			status: formData.status
        		};
        		this.saveTpl(data)
        	},
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

	.wx-msg {
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
