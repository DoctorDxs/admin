<template>
    <section class="user-msg">
        <h5>消息管理</h5>
        <div class="addNew">
            <Button type="primary" @click="modal = true" large>新增消息</Button>
            <Modal
                v-model="modal"
                title="新增配送"
                width="600"
                @on-ok="ok(formData)"
                @on-cancel='cancel'>
                <Form :mode="formData" :label-width="80" style='margin-right: 10px;'>
                    <FormItem label="发布对象">
                        <Input v-model="formData.user_id"></Input>
                    </FormItem>
                    <FormItem label="标题">
                        <Input v-model="formData.title"></Input>
                    </FormItem>
                    <FormItem label="内容">
                         <Input v-model="formData.content" type="textarea"></Input>
                    </FormItem>                 
                </Form>
            </Modal>
        </div>
        <div class='emial'>
            <Table :loading='loading' border ref="selection" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple' ></Table>
            <Button class='btn' @click="open(selections)" type='success'>开启</Button>
            <Button class='btn' @click="off(selections)" type='warning'>关闭</Button>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'userMsg',
        data () {
            return {
                formData: {},
                modal:false,
                loading: true,
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
                        title: '用户',
                        key: 'username',
                    },
                    {
                        title: '标题',
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
                            const created = this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss')
                            return ('div', created)
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
                                            this.saveUserMsg(data)
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
                this.$axios.getUserMsg().then(res => {
                    let data = res.data;
                    data.forEach(item => {
                        this.$axios.getUser(item.user_id).then(res => {
                            const username = res.data.username;
                            item.username = username
                        })
                    })
                    setTimeout(() => {
                        this.tableData = data
                        this.loading = false
                    },1000)
                })
            },
            saveUserMsg: function(params) {
                this.$axios.postUserMsg({
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
                    this.saveUserMsg(data)
                })
            },
            off: function(params) {
                params.forEach(select => {
                    select.status = 0 
                    const data = {
                        id: select.id,
                        status: select.status
                    };
                    this.saveUserMsg(data)
                })
            },
            multiple: function(multiple) {
                this.selections = multiple;
            },
            ok: function(formData) {
                const data = {
                    id: formData.id || 0,
                    user_id: formData.user_id,
                    name: formData.name,
                    content: formData.content,
                    title: formData.title,
                    status: 1
                };
                this.saveUserMsg(data)
                this.formData = {}
            },
            cancel: function() {
                this.formData = {}
            },
        }
    }
</script>

<style scoped>
    .user-msg {
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
