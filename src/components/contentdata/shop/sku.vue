<template>
    <section>
        <div class="tag">
            <h5>商品sku管理</h5>
            <div class="addNew">
                <Button type="primary" @click="modal = true" large>新增SKU属性</Button>
                <Modal
                    v-model="modal"
                    title="新增/修改sku属性"
                    width="600"
                    @on-ok="ok(formData)"
                    @on-cancel='cancel'
                    ok-text='保存'>
                    <Form :mode="formData" :label-width="80" style='margin-right: 10px;'>
                        <FormItem label="上级菜单">
                            <Select v-model="formData.pidName" placeholder='选择分类' >
                                <Option value="一级菜单">一级菜单</Option>
                                <Option v-for='(item, index) in options' :key='item.id' :value="item.text">{{item.text}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="*名称">
                            <Input v-model="formData.text"></Input>
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
                <Table border ref="selection" :data="tableData" :columns="tableColumns" stripe></Table>
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
                options: [],
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
                    },
                    {
                        title: 'PID(上级)',
                        key: 'pid',
                    },
                    {
                        title: '属性',
                        key: 'text',
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
                                            const options = this.options;
                                            let pidName;
                                            options.forEach(option => {
                                                if (option.id == params.row.pid) {
                                                    pidName = option.text
                                                }
                                            })
                                            params.row.pidName =  pidName
                                            this.formData = params.row;
                                        }
                                    }
                                }, '修改')
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
                this.$axios.getSku().then(res => {
                    const data = res.data;
                    let options = [];
                    data.forEach(item => {
                        if (item.pid == 0) {
                            options.push({
                                id: item.id,
                                text: item.text
                            })
                        }
                        
                    })
                    this.options = options
                    data.sort(function(a,b){
                        return a.pid-b.pid;
                    });
                    this.tableData = data;
                })
            },
            saveMenu: function(params) {
                this.$axios.postSku({
                    method: 'post',
                    data: params
                }).then(res => {
                    this.$Message.success('已保存设置！')
                    this.getData()
                    this.modal = false
                })
            },
                
            ok: function(formData) {
                if (!formData.text) {
                    this.$Message.error('名称不能为空！！')
                    return false
                }
                const options = this.options;
                let pid;
                if (formData.pidName == '一级菜单') {
                    pid = 0
                } else {
                    options.forEach(option => {
                        if (option.text == formData.pidName) {
                            pid = option.id;
                        }
                    })
                }
                const data = {
                    id: formData.id || 0,
                    pid: pid,
                    text: formData.text,
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
