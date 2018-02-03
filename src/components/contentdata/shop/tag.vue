<template>
    <section>
        <div class="tag">
            <h5>标签管理</h5>
            <div class="addNew">
                <Button type="primary" @click="modal = true" large>新增标签</Button>
                <Modal
                    v-model="modal"
                    title="新增/修改标签"
                    width="600"
                    ok-text='保存'>
                    <Form :mode="formData" :label-width="80" style='margin-right: 10px;'>
                        <FormItem label="*名称">
                            <Input v-model="formData.name"></Input>
                        </FormItem>
                        <FormItem label="介绍">
                            <Input v-model="formData.subname"></Input>
                        </FormItem>
                        <FormItem label="备注">
                            <Input v-model="formData.remark"></Input>
                        </FormItem>  
                        <div style='color: red;font-size: 8px;margin-left: 30px;opacity: 0.5;'>
                            注： 带 * 的为必填项
                        </div>             
                    </Form>
                    <div slot="footer">
                        <Button type="ghost" size="large" @click="cancel">取消</Button>
                        <Button type="primary" size="large" @click="ok(formData)">确定</Button>
                    </div>
                </Modal>
            </div>
            <div class='emial'>
                <Table border ref="selection" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple'></Table>
                <Button class='btn' @click="deleteData(selections)" type='warning'>删除</Button>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'tag',
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
                        title: 'ID',
                        key: 'id',
                        width: 60,                   
                    },
                    {
                        title: '名称',
                        key: 'name',
                    },
                    {
                        title: '介绍',
                        key: 'subname',
                    },
                    {
                        title: '备注',
                        key: 'remark',
                    },                 
                    {
                        title: '操作',
                        key: 'operate',
                        width: 140,
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
                this.$axios.getTag().then(res => {
                    const data = res.data;
                    this.tableData = data;
                })
            },
            deleteData: function(params) {
                this.$axios.deleteTag(params).then(res => {
                    this.$Message.success('删除成功！')
                    this.getData()
                })
            },
            saveMenu: function(params) {
                this.$axios.postTag({
                    method: 'post',
                    data: params
                }).then(res => {
                    this.$Message.success('已保存设置！')
                    this.getData()
                    this.modal = false
                })
            },
                
            multiple: function(multiple) {
                let ids = [];
                multiple.forEach(item => {
                    ids.push(item.id)
                });
                this.selections = ids.join(',')
            },
            ok: function(formData) {
                if (!formData.name) {
                    this.$Message.error('标签名称不能为空！！')
                    return false
                }
                const data = {
                    id: formData.id || 0,
                    subname: formData.subname,
                    remark: formData.remark,
                    name: formData.name,
                };
                this.saveMenu(data)
                this.formData = {};  
            },
            cancel: function() {
                this.formData = {};
                this.modal = false  
            },
        }
    }
</script>

<style scoped>

    .tag {
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
