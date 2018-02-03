<template>
    <section>
        <div class="shop-menu">
            <h5>菜单管理</h5>
            <div class="addNew">
                <Button type="primary" @click="addNew" large>新增菜单</Button>
                <Modal
                    v-model="modal"
                    title="新增/修改菜单"
                    width="600"
                    ok-text='保存'>
                    <Form :mode="formData" :label-width="80" style='margin-right: 10px;'>
                        <!-- <FormItem label="上级菜单">
                            <Select v-model="formData.pidName" placeholder='选择分类' >
                                <Option value="上级菜单">上级菜单</Option>
                                <Option v-for='(item, index) in options' :key='item.id' :value="item.name">{{item.name}}</Option>
                            </Select>
                        </FormItem> -->
                        <FormItem label="*菜单名称">
                            <Input v-model="formData.name"></Input>
                        </FormItem>
                        <FormItem label="图片">
                            <!-- 图片上传组件 -->
                            <Img-Upload :selfImg='selfImg' @getImgData='getImgData'></Img-Upload>
                        </FormItem>
                        <FormItem label="排序">
                            <Input v-model="formData.rank"></Input>
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

    import ImgUpload from '../imgupload/imgUpload'
    export default {
        name: 'shopMenu',
        data () {
            return {
                imgHost: 'http://img1.qingful.com/',
                modal: false,
                formData: {},
                selfImg: '',
                imgUrl: require('../../../assets/noimage.png'),
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
                        title: '名称',
                        key: 'name',
                        render: (h, params) => {
                            let url;
                            if (params.row.url) {
                                url = this.imgHost + params.row.url
                            } else {
                                url = this.imgUrl
                            }
                            return h('div', {
                                attrs: {
                                    style: 'display:flex;flex-direction:row;align-items: center;'
                                }
                            }, [
                                h('img', {
                                    attrs: {
                                        src: url,
                                        style: 'width:40px;height:40px;border-radius:30px;padding:5px;'
                                    },                      
                                }),
                                h('span', {
                                    attrs: {                    
                                        style: 'border-radius:30px;padding:5px;'
                                    },                      
                                }, params.row.name),
                            ])
                        }
                    },
                    {
                        title: '排序',
                        key: 'rank',
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
                                            const options = this.options;
                                            let pidName;
                                            options.forEach(option => {
                                                if (option.id == params.row.pid) {
                                                    pidName = option.name
                                                }
                                            })
                                            params.row.pidName =  pidName
                                            this.formData = params.row;
                                            this.selfImg = params.row.url
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
                this.$axios.getMenu().then(res => {
                    const data = res.data;
                    let options = [];
                    data.forEach(item => {
                        options.push({
                            id: item.id,
                            name: item.name
                        })
                    })
                    this.options = options
                    this.tableData = data;
                })
            },
            deleteData: function(params) {
                this.$axios.deleteMenu(params).then(res => {
                    this.$Message.success('删除成功！')
                    this.getData()
                })
            },
            saveMenu: function(params) {
                this.$axios.postMenu({
                    method: 'post',
                    data: params
                }).then(res => {
                    this.$Message.success('已保存设置！')
                    this.getData()
                    this.modal = false
                })
            },
            addNew: function() {
                this.modal = true;
                this.formData.url = ''
                this.img = ''
                this.selfImg = ''
            }, 
            multiple: function(multiple) {
                let ids = [];
                multiple.forEach(item => {
                    ids.push(item.id)
                });
                this.selections = ids.join(',')
            },
            ok: function(formData) {
                const options = this.options;
                if (!formData.name) {
                    this.$Message.error('菜单名称不能为空！！！')
                    return false
                }
                let pid;
            
                const data = {
                    id: formData.id || 0,
                    pid: pid || 0,
                    rank: formData.rank,
                    remark: formData.remark,
                    name: formData.name,
                    url: this.img
                };
                this.saveMenu(data)
                this.formData = {};  
                this.img = ''
                this.selfImg = ''

            },
            cancel: function() {
                this.formData = {};
                this.isShow = null   
                this.img = ''
                this.selfImg = '' 
                this.modal = false
            },
            getImgData: function(params) {
                let img = params;
                if (img && /http/.test(params)) {
                    this.img = img.split('/')[3]
                } else {
                    this.img = ''
                }
            },
           
        },
        components: {
            ImgUpload
        }
    }
</script>

<style scoped>

    .shop-menu {
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
