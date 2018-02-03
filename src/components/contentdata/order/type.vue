<template>
	<section class="type">
		<h5>售后类型</h5>
        <Button class='add' @click="modal = true" type='primary'>新增类型</Button>
		<div class='emial'>
			<Table border ref="selection" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple'></Table>
			<Button class='btn' @click="open(selections)" type='success'>开启</Button>
			<Button class='btn' @click="off(selections)" type='error'>关闭</Button>
            <Modal
                v-model="modal"
                title="编辑类型"
                width="600"
                @on-ok="ok(formData)">
                <Form :mode="formData" :label-width="60" style='margin-right: 10px;'>
                    <FormItem label="类型">
                        <Input v-model="formData.name"></Input>
                    </FormItem>
                    <FormItem label="备注">
                        <Input v-model="formData.sub" type='textarea'></Input>
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
    	name: 'type',
        data () {
            return {
                modal: false,
                formData: {},
                tableData: [],
                selections: [],
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
                        title: '类型',
                        key: 'name',
                    },                                                                                                                               
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        render: (h, params) => {
	                       const row = params.row;
                            const bgColor = row.status === 0 ? 'warning' : 'success';
                            const text = row.status === 0 ? '关闭' : '开启';
                            return h('Button', {
                                props: {                    
                                    type: bgColor,
                                }
                            }, text);
                        }
                    },
                    {
                        title: '备注',
                        key: 'sub',
                    },                 
                    {
                        title: '操作',
                        key: 'operate',
                        width: 215,
                        render: (h, params) => {
                            const row = params.row;
                            const text = row.status == 0 ? '开启' : '关闭'
                            const bgColor = row.status == 0 ? 'success' : 'warning'
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
                                            params.row.status = params.row.status == 1 ? true : false
                                            this.formData = params.row
	                                    }
	                                }
	                            }, '编辑'),
	                            h('Button', {
                                    props: {
                                        type: bgColor,
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.saveFeedbackType({
                                                id: row.id,
                                                status: !row.status
                                            })
                                        }
                                    }
                                }, text),
	                            
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
                this.$axios.getFeedbackType().then(res => {
                  const data = res.data;
                  this.tableData = data
                });
            },
            saveFeedbackType: function(params) {
                this.$axios.postFeedbackType({
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
                    this.saveFeedbackType({
                        id: item.id,
                        status: 1
                    })
                });
            },

            off: function(selections) {
                selections.forEach(item => {
                    this.saveFeedbackType({
                        id: item.id,
                        status: 0
                    })
                });
            },

            ok: function(formData) {

            }
        }
    }
</script>

<style scoped>
	.type {
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

    .add {
        margin: 10px 0 10px 10px;
    }
</style>
