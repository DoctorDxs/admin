<template>
    <section class="admin-list">
        <h5>管理员管理</h5>
        <div class='emial'>
            <Button class='btn' @click="add" type='primary'>新增管理员</Button>
            <Table border :data="tableData" :columns="tableColumns" stripe></Table>
            <Modal
                v-model="modal"
                title="新增/修改管理员"
                width="640"
                @on-ok="ok(formData)">
                <Form :mode="formData" :label-width="60" style='margin-right: 10px;'>
                    <FormItem label="用户组">
                        <Select v-model="formData.title">
                            <Option v-for='item in groups' :key="item.id" :value="item.title">{{item.title}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="用户名">
                        <Input v-model="formData.username"></Input>
                    </FormItem>
                    <FormItem label="手机号">
                        <Input v-model="formData.mobile"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input v-model="formData.password" type='password'></Input>
                    </FormItem>
                    <FormItem label="邮箱">
                        <Input v-model="formData.email"></Input>
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
        name: 'adminList',
        data () {
            return {
                modal: false,
                tableData: [],
                formData: {},
                groups: [],
                tableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },            
                    {
                        title: 'ID',
                        key: 'id',
                        width: 80,                  
                    },
                    {
                        title: '用户名',
                        key: 'username',
                    },
                    {
                        title: '用户组',
                        key: 'title',
                        width: 120
                    },
                    {
                        title: '手机号',
                        key: 'mobile',
                        width: 120
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 100,
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
                        title: '最后登录时间',
                        key: 'last_login_time',
                        render: (h, params) => {
                            return h('div', '200');
                        }
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        width: 180,
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
                                            params.row.status = params.row.status == 0 ? false : true
                                            this.formData = params.row
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
                                            this.saveAdmin(params.row)
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
                                            this.deleteAdmin(params.row.id)
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
                this.$axios.getAdmin().then(res => {
                    const data = res.data;
                    this.$axios.getAdminGroup().then(res => {
                        const groups = res.data;
                        this.groups = groups;
                        data.forEach(item => {
                            groups.forEach(group => {
                                if (item.group_id == group.id) {
                                    item.title = group.title
                                }
                            })
                        })
                        this.tableData = data                        
                    });
                });
            },
            saveAdmin: function(formData) {
                let group_id;
                const groups = this.groups;
                groups.forEach(group => {
                    if (formData.title == group.title) {
                        group_id = group.id
                    }
                })
                const data = {
                    id: formData.id || 0,
                    email: formData.email,
                    mobile : formData.mobile,
                    password : formData.password,
                    remark : formData.remark,
                    status : formData.status,
                    username : formData.username,
                    status: formData.status,
                    group_id: group_id,
                };
                this.$axios.postAdmin({
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
            deleteAdmin: function(id) {
                this.$axios.deleteAdmin(id).then(res => {
                    this.getData()
                    this.$Message.success('已删除！')
                })
            },
            multiple: function(selections) {
                this.selections = selections
            },
            ok: function(formData) {
                
                this.saveAdmin(formData)
            }
        }
    }
</script>

<style scoped>
    .admin-list {
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
