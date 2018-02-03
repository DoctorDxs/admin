<template>
    <section>
        <div class="user-list1">
            <h5>广告搜索</h5>
            <Form :mode="formData2" :label-width="60" style='margin-right: 10px;' inline>
                <FormItem>
                    <Select v-model="formData2.position" placeholder='选择分类' style='width: 200px;margin-top: 20px;'>
                        <Option value="全部">全部</Option>
                        <Option v-for='(item, index) in options' :key='item.id' :value="item.name">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button class='search' @click="search(formData2)" type='success'>搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="user-list">
            <h5>广告管理</h5>
            <div class='emial'>
                <Button class='btn' @click="addNew" type='primary'>新增广告</Button>
                <Table border ref="table" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple'></Table>
                <Modal
                    v-model="modal"
                    title="新增/修改广告"
                    width="600">
                    <Form :mode="formData" :label-width="80" style='margin-right: 10px;'>
                        <FormItem label="*广告位置">
                            <Select v-model="formData.position" placeholder='选择分类' >
                                <Option v-for='(item, index) in options' :key='item.id' :value="item.name">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="*名称">
                            <Input v-model="formData.name"></Input>
                        </FormItem>
                        <FormItem label="简介">
                            <Input v-model="formData.sub" type='textarea'></Input>
                        </FormItem>
                        <FormItem label="*图片">
                            <!-- 图片上传组件 -->
                            <Img-Upload :selfImg='selfImg' @getImgData='getImgData'></Img-Upload>
                            <div class="imgSize">
                                建议上传图片大小为720*270px
                            </div>
                        </FormItem>
                        <FormItem label="*链接">
                            <Input v-model="formData.url" placeholder='请填写商品的编号'></Input>
                        </FormItem>
                        <FormItem label="排序">
                            <Input v-model="formData.rank"></Input>
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
                        <div style='color: red;font-size: 8px;margin-left: 24px;opacity: 0.5;'>
                            注： 带 * 的为必填项
                        </div>
                    </Form>
                    <div slot="footer">
                        <Button type="ghost" size="large" @click="cancel">取消</Button>
                        <Button type="primary" size="large" @click="ok(formData)">确定</Button>
                    </div>
                </Modal>
                <Button class='btn' @click="open(selections)" type='success'>开启</Button>
                <Button class='btn' @click="off(selections)" type='warning'>关闭</Button>
            </div>
        </div>
    </section>
</template>
<script>
    import ImgUpload from '../imgupload/imgUpload'
    export default {
        name: 'userList',
        data () {
            return {
                imgHost: 'http://img1.qingful.com/',
                selfImg: '',
                modal: false,
                formData: {},
                formData2: {},
                tableData: [],
                options:[],
                imgUrl: require('../../../assets/noimage.png'),
                img: '',
                selections: [],
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
                        render: (h, params) => {
                            let imgurl;
                            if (params.row.imgurl) {
                                imgurl = this.imgHost + params.row.imgurl
                            } else {
                                imgurl = this.imgUrl
                            }
                            return h('div', {
                                attrs: {
                                    style: 'display:flex;flex-direction:row;align-items: center;'
                                }
                            }, [
                                h('img', {
                                    attrs: {
                                        src: imgurl,
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
                        title: '位置',
                        key: 'position',
                        width: 100
                    },
                    {
                        title: '简介',
                        key: 'sub',
                        width: 80
                    },
                    {
                        title: '链接',
                        key: 'url',
                    },
                    {
                        title: '排序',
                        key: 'rank',
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
                        title: '备注',
                        key: 'remark',
                    },
                    {
                        title: '时间',
                        key: 'created_at',
                        render: (h, params) => {
                            const created = this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss')
                            return h('div', created);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        width: 160,
                        render: (h, params) => {
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
                                            console.log(params.row)
                                            this.selfImg = params.row.imgurl
                                            this.img = params.row.imgurl
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
                this.$axios.getAds().then(res => {
                  const data = res.data;
                  this.getPosition(data)
                });
            },
            getPosition: function(params) {
                this.$axios.getAdsPosition().then(res => {
                    const data = res.data;
                    let options = [];
                    data.forEach(option => {
                        options.push({
                            id: option.id,
                            name: option.name
                        });
                        params.forEach(item => {
                            if (item.position_id == option.id) {
                                item.position = option.name
                            }
                        });
                    });
                    this.options = options;
                    this.searchData = params
                    this.tableData = params
                })
            },
            saveAds: function(formData) {
                this.$axios.postAds({
                    method: 'post',
                    data: formData
                }).then(res => {
                    this.getData()
                    this.$Message.success('处理成功！')
                    this.modal = false
                })
            },
            open: function(params) {
                params.forEach(select => {
                    const data = {
                        id: select.id,
                        status: 1
                    };
                    this.saveAds(data)
                })
            },
            off: function(params) {
                params.forEach(select => {
                    const data = {
                        id: select.id,
                        status: 0
                    };
                    this.saveAds(data)
                })
            },

            multiple: function(multiple) {
                this.selections = multiple;
            },
            addNew: function() {
                this.modal = true;
                this.selfImg = ''
                this.img = ''
            },
            ok: function(formData) { 
                if (!formData.position) {
                    this.$Message.error('请选择广告位置！！！')
                    return false
                }
                if (!formData.name) {
                    this.$Message.error('广告名称不能为空！！！')
                    return false
                }
                if (!this.img) {
                    this.$Message.error('广告图片不能为空！！')
                    return false
                }
                if(formData.url === '' || formData.url == null) {
                    this.$Message.error('广告链接不能为空！！')
                    return false
                }
                
                const options = this.options;
                let position_id;
                options.forEach(option => {
                    if (option.name == formData.position) {
                        position_id = option.id;
                    }
                })
                const data = {
                    id: formData.id || 0,
                    position_id: position_id,
                    name: formData.name,
                    sub: formData.sub,
                    url: formData.url || 0,
                    rank: formData.rank,
                    remark: formData.remark,
                    imgurl: this.img,
                    status: 1
                };
                this.saveAds(data)
                this.formData = {}
                this.selfImg = ''
                this.img = ''
            },
            cancel: function() {
                this.formData = {}
                this.selfImg = ''
                this.img = ''
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
            search: function(formData2) {
                const position = formData2.position;
                const searchData = this.searchData;
                let tableData = []; 
                if (position) {
                    if (position == '全部') {
                        this.tableData = searchData
                    } else {
                        searchData.forEach(data => {
                            if (position == data.position) {
                                tableData.push(data)
                            }
                        })
                        this.tableData = tableData
                    };
                }
                
            },
        },
        components: {
            ImgUpload
        }
    }
</script>

<style scoped>
    .user-list {
        background: #fff;
        border-top: 3px solid #d2d6de;
        border-radius: 3px; 
        padding-bottom: 15px;
        margin-bottom: 30px;
    }

     .user-list1 {
        background: #fff;
        border-top: 3px solid #d2d6de;
        border-radius: 3px; 
        margin-bottom: 30px;
    }

    .search {
        margin-top: 20px;
        margin-left: -30px;
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

    .upload-logo {
        height: 180px;
        width: 180px;
        border: 1px solid #f4f4f4;
        border-radius: 5px;
        padding: 5px;
        position: relative;
    }

    .upload-logo img {
        width: 100%;
        height: 100%;
    }

    .events {
        position: absolute;
        bottom: 5px;
        left: 5px;
        width: calc(100% - 10px);
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40px;
        background: rgba(0, 0, 0, 0.1);
    }

    .add, .del {
        font-size: 28px;
        cursor: pointer;
        margin-left: 22%;
    }

    .imgs {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }

    .img {
        width: 120px;
        height: 120px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin: 10px;
        position: relative;
    }

    .img img {
        width: 100%;
        height: 100%;
        padding: 4px;
    }
    
    .selescted {
        position: absolute;
        height: 120px;
        width: 120px;
        background: rgba(0,0,0,.1);
        top: 0;
        border-radius: 5px;
        text-align: center;
        line-height: 120px;
        font-size: 16px;
        color: #fff;
        /*display: none;*/
    }   

    .imgSize {
        color: #777;
        font-size: 12px;
    }
</style>
