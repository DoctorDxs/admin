<template>
	<section class="delivery">
		<h5>快递管理</h5>
		<div class="addNew">
			<Button type="primary" @click="modal = true" large>新增快递</Button>
		    <Modal
		        v-model="modal"
		        title="新增配送"
		        width="600"
		        @on-ok="ok(formData)"
		        @on-cancel='cancel'>
		        <Form :mode="formData" :label-width="60" style='margin-right: 10px;'>
			        <FormItem label="*名称">
			            <Input v-model="formData.name"></Input>
			        </FormItem>
			        <FormItem label="状态">
			            <i-switch v-model="formData.status" size="large">
			                <span slot="open">ON</span>
			                <span slot="close">OFF</span>
			            </i-switch>			           
			        </FormItem>
			        <FormItem label="简介">
			             <Input v-model="formData.sub" type="textarea"></Input>
			        </FormItem>			        
			    </Form>
                <div slot="footer">
                    <Button type="ghost" size="large" @click="cancel">取消</Button>
                    <Button type="primary" size="large" @click="ok(formData)">确定</Button>
                </div>
		    </Modal>
		</div>
		<div class='emial'>
			<Table border ref="selection" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple' ></Table>
			<Button class='btn' @click="open(selections)" type='success'>开启</Button>
        	<Button class='btn' @click="off(selections)" type='warning'>关闭</Button>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'delivery',
        data () {
            return {
            	formData: {},
            	modal:false,
                tableData: [],
                selections: [],
                tableColumns: [ 
                	{
                		type: 'selection',
                		width: 60,
                        align: 'center',                
                	},           
                    {
                        title: '编号',
                        key: 'id',
                        width: 100,                   
                        render: (h, params) => {
                        	const row = params.row;
                        	return h('div', row.id)
                        }
                    },
                    {
                        title: '名称',
                        key: 'name',
                        render: (h, params) => {
                            const row = params.row;
                        	return h('div', row.name)
                        }
                    },
                    {
                        title: '简介',
                        key: 'sub',
                        render: (h, params) => {
                            const row = params.row;
                        	return h('div', row.sub)
                        }
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
                        title: '操作',
                        key: 'operate',
                        width: 215,
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
	                                        this.saveDelivery(data)
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
        		this.$axios.getDelivery().then(res => {
        			const data = res.data;
        			this.tableData = data
        		})
        	},
        	saveDelivery: function(params) {
        		this.$axios.postDelivery({
        			method: 'post',
        			data: params
        		}).then(res => {
        			this.$Message.success('已保存设置！')
        			this.getData()
                    this.modal = false
        		})
        	},
        	open: function(params) {
        		params.forEach(select => {
        			select.status = 1 
        			const data = {
        				id: select.id,
        				status: select.status
        			};
        			this.saveDelivery(data)
        		})
        	},
        	off: function(params) {
        		params.forEach(select => {
        			select.status = 0 
        			const data = {
        				id: select.id,
        				status: select.status
        			};
        			this.saveDelivery(data)
        		})
        	},
        	multiple: function(multiple) {
        		this.selections = multiple;
        	},
        	ok: function(formData) {
                if (!formData.name) {
                    this.$Message.error('名称不能为空！！！')
                    return false
                } 
        		const data = {
        			id: formData.id || 0,
        			name: formData.name,
        			sub: formData.sub,
        			status: formData.status
        		};
        		this.saveDelivery(data)
        		this.formData = {}
        	},
        	cancel: function() {
        		this.formData = {}
                this.modal = false
        	}
        }
    }
</script>

<style scoped>
	.delivery {
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
