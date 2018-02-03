<template>
	<section class="ads-position">
		<h5>广告位置列表</h5>
        <!-- 隐藏  新增位置功能 -->
		<div class="addNew">
            <Button type="primary" @click="modal = true" large>新增位置</Button>
            <Modal
                v-model="modal"
                title="新增/修改广告位置"
                width="600"
                @on-ok="ok(formData)"
                @on-cancel='cancel'>
                <Form :mode="formData" :label-width="60" style='margin-right: 10px;'>
                    <FormItem label="名称">
                        <Input v-model="formData.name"></Input>
                    </FormItem>
                    <FormItem label="描述">
                        <Input v-model="formData.sub" type="textarea"></Input>
                    </FormItem>
                    <FormItem label="状态">
                        <i-switch v-model="formData.status" size="large">
                            <span slot="open">On</span>
                            <span slot="close">Off</span>
                        </i-switch>                    
                    </FormItem>             
                </Form>
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
    	name: 'adsPosition',
        data () {
            return {
                tableData: [],
                modal: false,
                selections: [],
                formData: {},
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
                        title: '描述',
                        key: 'sub',                 
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
                                            this.saveAds(data)
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
                this.$axios.getAdsPosition().then(res => {
                    let data = res.data;
                    this.tableData = data;
                    
                })
            },
            saveAds: function(params) {
                this.$axios.postAdsPosition({
                    method: 'post',
                    data: params
                }).then(res => {
                    this.$Message.success('已保存设置！')
                    this.getData()
                })
            },
            open: function(params) {
                params.forEach(select => {
                    select.status = 1 
                    const data = {
                        id: select.id,
                        status: select.status
                    };
                    this.saveAds(data)
                })
            },
            off: function(params) {
                params.forEach(select => {
                    select.status = 0 
                    const data = {
                        id: select.id,
                        status: select.status
                    };
                    this.saveAds(data)
                })
            },
            multiple: function(multiple) {
                this.selections = multiple;
            },
            ok: function(formData) {
                const data = {
                    id: formData.id || 0,
                    name: formData.name,
                    sub: formData.sub,
                    status: formData.status
                };
                this.saveAds(data)
                this.formData = {}
            },
            cancel: function() {
                this.formData = {}
            },
        }
    }
</script>

<style scoped>
	.ads-position {
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
