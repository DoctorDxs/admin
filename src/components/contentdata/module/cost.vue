<template>
    <section class="cost">
        <h5>费用模版</h5>
        <div class='emial'>
            <Button class='addclass' @click="modal = true" type='primary'>新增模版</Button>            
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
                    <FormItem label="名称">
                        <Input v-model="formData.name"></Input>
                    </FormItem>
                    <FormItem label="费用">
                        <Input v-model="formData.value"></Input>
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
                formData: {},
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
                        title: '费用',
                        key: 'value',                 
                        render: (h, params) => {
                            const row = params.row;
                            return h('div', row.value)
                        }
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
                                            this.saveFeeTpl(data)
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
                this.$axios.getFeeTpl().then(res => {
                    const data = res.data;
                    this.tableData = data;
                })
            }, 
            saveFeeTpl: function(params) {
                this.$axios.postFeeTpl({
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
                    this.saveFeeTpl(data)
                })
            },
            off: function(params) {
                params.forEach(select => {
                    select.status = 0 
                    const data = {
                        id: select.id,
                        status: select.status
                    };
                    this.saveFeeTpl(data)
                })
            }, 
            ok: function(formData) {
                const data = {
                    id: formData.id || 0,
                    value: formData.value,
                    name: formData.name,
                    status: formData.status
                };
                this.saveFeeTpl(data)
                this.formData = {}
            },
            cancel: function() {
                this.formData = {}
            }
        }
    }
</script>

<style scoped>
    .cost {
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
