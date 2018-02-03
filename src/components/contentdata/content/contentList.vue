<template>
    <section class="content-list">
        <h5>文章列表</h5>
        <div class='emial'>
            <Button class='addclass' @click="modal = true" type='primary'>新增文章</Button>            
            <Table border ref="selection" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple'></Table>
            <div v-if='true'>
                <Button class='btn' @click="open(selections)" type='success'>开启</Button>
                <Button class='btn' @click="off(selections)" type='warning'>关闭</Button>
            </div>
            <Modal
                v-model="modal"
                title="编辑文章"
                width="980"
                @on-ok="ok(formData)"
                @on-cancel='cancel'
                ok-text='保存'
                :styles="{top: '20px'}">
                <Form :mode="formData" :label-width="80" style='margin-right: 10px;'>
                     <FormItem label="分类">
                        <Select v-model="formData.name" placeholder='选择分类'>
                            <Option v-for='(item, index) in options' :key='item.id' :value="item.name">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="标题">
                        <Input v-model="formData.title"></Input>
                    </FormItem>
                    <FormItem label="作者">
                        <Input v-model="formData.author"></Input>
                    </FormItem>
                    <FormItem label="简介">
                        <Input v-model="formData.sub"></Input>
                    </FormItem>
                    <FormItem label="内容">
                        <Vue-Edit :content='content' @getContent='getContent'></Vue-Edit>
                    </FormItem>
                          
                </Form>
            </Modal>
        </div>
    </section>
</template>
<script>
    import VueEdit from '../vueedit/vueEdit'
    export default {
        name: 'contentList',
        data () {
            return {
                formData: {},
                option:{},
                options: [],
                tableData: [],
                content: '',
                imgHost: 'http://img1.qingful.com/',
                modal: false,
                selections: [],
                key:'',
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
                        width: 80,                  
                    },
                    {
                        title: '标题',
                        key: 'title',
                        render: (h, params) => {
                            let color = '#777'
                            return h('span',{
                                style: {
                                        color: color,
                                        cursor: 'pointer'
                                    },
                                on: {
                                    click: () => {
                                        this.$router.push({name: 'article', params: {id: params.row.id}})
                                    },
                                }
                            }, params.row.title)
                        } 
                    },
                    {
                        title: '分类',
                        key: 'name', 
                        width: 120,                
                    },
                    {
                        title: '作者',
                        key: 'author', 
                        width: 120,                
                    },
                    {
                        title: '备注',
                        key: 'remark',                 
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,                  
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
                        key: 'created_at', 
                        render: (h, params) => {
                            const created = this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss')
                            return ('div', created)
                        }                
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        width: 140,
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
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal = true; 
                                            params.row.status = params.row.status == 0 ? false : true               
                                            this.formData = params.row;
                                            this.content = params.row.content
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
                                            this.saveList(data)
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
                this.$axios.getArtList().then(res => {
                    const data = res.data;
                    this.getClass(data)
                })
            }, 
            getClass: function(params) {
                this.$axios.getClass().then(res => {
                    const data = res.data;
                    let options = [];
                    data.forEach(option => {
                        options.push({
                            id: option.id,
                            name: option.name
                        });
                        params.forEach(item => {
                            if (item.category_id == option.id) {
                                item.name = option.name
                            }
                        });
                    });
                    this.options = options;
                    this.tableData = params
                })
            },
            saveList: function(params) {
                this.$axios.postArtList({
                    method: 'post',
                    data: params
                }).then(res => {
                    this.$Message.success('已保存设置！')
                    this.getData()
                    this.selections = [];
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
                    this.saveList(data)
                })
            },
            off: function(params) {
                params.forEach(select => {
                    select.status = 0 
                    const data = {
                        id: select.id,
                        status: select.status
                    };
                    this.saveList(data)
                })
            }, 
            ok: function(formData) {
                const options = this.options;
                let category_id;
                options.forEach(option => {
                    if (option.name == formData.name) {
                        category_id = option.id;
                    }
                })
                const data = {
                    id: formData.id || 0,
                    author: formData.author,
                    category_id: category_id,
                    content: this.content,
                    sub: formData.sub,
                    title: formData.title,
                    visiter: formData.visiter,
                    remark: formData.remark,
                    status: formData.status
                };
                this.saveList(data)
                this.formData = {}
                this.content = ''
            },
            cancel: function() {
                this.formData = {}
                this.content = ''
            },
            
           getContent: function(params) {
                this.content = params
            },
        },
        components: {
            VueEdit
        },
    }
</script>

<style scoped>
    .content-list {
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
