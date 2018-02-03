<template>
    <section>
        <div class="comment">
            <h5>评论管理</h5>
            <div class='emial'>
                <Table border ref="selection" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple'></Table>
                <Button class='btn' @click="del(selections)" type='error'>删除选中</Button>
                <Button class='btn' @click="show(selections)" type='success'>显示</Button>
                <Button class='btn' @click="hidden(selections)" type='warning'>隐藏</Button>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'comment',
        data () {
            return {
                tableData: [],
                options: [],
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
                        title: '商品名称',
                        key: 'product',
                    },
                    {
                        title: '用户',
                        key: 'username',
                    },
                    {
                        title: '评论内容',
                        key: 'name',
                    },
                    {
                        title: '时间',
                        key: 'created_at',
                        render: (h, params) => {
                            const created = this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss')
                            return ('div', created)
                        } 
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        render: (h, params) => {
                            const row = params.row;
                            const bgColor = row.status === 0 ? 'warning' : 'success';
                            const text = row.status === 0 ? '隐藏' : '显示';
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
                        width: 140,
                        render: (h, params) => {
                            const row = params.row;
                            const text = row.status == 0 ? '显示' : '隐藏'
                            const bgColor = row.status == 0 ? 'success' : 'warning'
                            return h('div', [
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
                                            this.saveCommment({
                                                id: row.id,
                                                status: !row.status
                                            })
                                        }
                                    }
                                }, text),
                                h('Button', {
                                    props: {
                                        type: 'error',
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
                this.$axios.getComment().then(res => {
                    const data = res.data;
                    this.getProduct(data)
                })
            },
            getProduct: function(params) {
                this.$axios.getProducts().then(res => {
                    const data = res.data;
                    data.forEach(item => {
                        params.forEach(param => {
                        if (item.id == param.product_id)
                            param.product = item.name
                        })
                    })
                    this.getUser(params)
                })
            },
            getUser: function(params) {
                this.$axios.getUsers().then(res => {
                    const data = res.data;
                    data.forEach(item => {
                        params.forEach(param => {
                        if (item.id == param.user_id)
                            param.username = item.username
                        })
                    })
                    this.tableData = params
                })
            },
            deleteData: function(params) {
                this.$axios.deleteComment(params).then(res => {
                    this.$Message.success('删除成功！')
                    this.getData()
                })
            },
            saveCommment: function(params) {
                this.$axios.postComment({
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
            show: function(selections) {
                selections.forEach(item => {
                    this.saveCommment({
                        id: item.id,
                        status: 1
                    })
                });
            },
            hidden: function(selections) {
                selections.forEach(item => {
                    this.saveCommment({
                        id: item.id,
                        status: 0
                    })
                });
            },
            del: function(selections) {
                let ids = [];
                selections.forEach(item => {
                    ids.push(item.id)
                });
                const idsStr = ids.join(',');
                this.deleteData(idsStr)
            },
        }   
    }
</script>

<style scoped>

    .comment {
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
    

</style>
