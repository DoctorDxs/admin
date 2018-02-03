<template>
	<section class="vip-level">
		<h5>会员等级</h5>
		<div class='emial'>
            <Button class='btn' @click="add" type='primary'>新增等级</Button>
			<Table border ref="selection" :data="tableData" :columns="tableColumns" stripe></Table>
            <Modal
                v-model="modal"
                title="新增配送"
                width="600"
                @on-ok="ok(formData)"
                @on-cancel='cancel'>
                <Form :mode="formData" :label-width="80" style='margin-right: 10px;'>
                    <FormItem label="名称">
                        <Input v-model="formData.name"></Input>
                    </FormItem>
                    <FormItem label="积分(>=)">
                         <Input v-model="formData.score"></Input>
                    </FormItem>                 
                </Form>
            </Modal>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'vipLeve',
        data () {
            return {
                modal: false,
                formData: {},
                tableData: [],
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
                        title: '名称',
                        key: 'name',
                    },
                    {
                        title: '积分(大于等于)',
                        key: 'score',
                    },
                    {
                        title: '时间',
                        key: 'time',
                        render: (h, params) => {
                            const created = this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss')
                            return ('div', created)
                        } 
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        render: (h, params) => {
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
                                            this.modal = true
	                                        this.formData = params.row
	                                    }
	                                }
	                            }, '编辑')
	                            
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
                this.$axios.getUserLevel().then(res => {
                    let data = res.data;
                    this.tableData = data
                })
            },
            saveLevel: function(formData) {
                const data = {
                    id: formData.id || 0,
                    name: formData.name,
                    score: formData.score
                }
                this.$axios.postUserLevel({
                    method: 'post',
                    data: data
                }).then(res => {
                    this.getData()
                    this.$Message.success('处理成功！')
                })
            },
            add: function() {
                this.modal = true;
                this.formData = {}
            },
            cancel: function() {
                this.formData = {}
            },
            ok: function(formData) {
                this.saveLevel(formData) 
            },
            
        }
    }
</script>

<style scoped>
	.vip-level {
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
