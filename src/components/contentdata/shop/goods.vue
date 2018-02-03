<template>
    <section>
        <div class="goods1">
            <h5>商品搜索</h5>
            <Form :mode="formData2" :label-width="60" style='margin-right: 10px;' inline>
                <FormItem>
                    <Select v-model="formData2.category" placeholder='所有分类' style='width: 200px;margin-top: 20px;'>
                        <Option value="所有分类">所有分类</Option>
                        <Option v-for='(item, index) in options' :key='item.id' :value="item.name">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Select v-model="formData2.status" placeholder='所有状态' style='width: 200px;margin-top: 20px;'>
                        <Option value="所有状态">所有状态</Option>
                        <Option value="显示">显示</Option>
                        <Option value="隐藏">隐藏</Option>
                    </Select>
                </FormItem>
                <FormItem>
                     <Input v-model="formData2.name" placeholder='商品名称、商品编号' style='width: 200px;margin-top: 20px;'></Input>
                </FormItem>
                <FormItem>
                    <Button class='search' @click="search(formData2)" type='success'>搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="goods">
            <h5>商品管理</h5>
            <div class='emial'>
                <Button class='btn' @click="addProduct" type='primary'>新增商品</Button>
                <Button class='btn' @click="exportAll(tableData)" type='success'>导出全部商品</Button>
                <Table :loading='loading' border ref="table" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple'></Table>
				<!-- sku管理 -->
				<Modal
                    v-model="modal2"
                    title="新增/修改商品SKU"
                    width="680"
                    @on-ok="okSku(formData3)">
					<Form :mode="formData3" :label-width="100" style='margin-right: 10px;'>
                     	<FormItem label="商品规格">
                     		<div class='sku' v-for='(skuTag, index) in skuTags'>
                     			<Select v-model="formData3.sku + 'index'" placeholder='请选择' style='width: 500px'>
                                	<Option v-for='(item, index) in skuItems' :key='item.id' :value="item.text">{{item.text}}</Option>
	                            </Select>
	                            <div  class='close' @click="delSku(index)">
	                            	<Icon type="close"></Icon>
	                            </div>
                     		</div>
               	 			<Button class='addSku' @click="addSku" type='success'>添加sku</Button>
                        </FormItem>
                    	<FormItem label='商品库存'>
							<Input v-model='formData3.store'></Input>
                    	</FormItem>
					</Form>
                </Modal>

                <!-- 新增/修改商品 -->
                <Modal
                    v-model="modal"
                    title="新增/修改商品"
                    width="1200">
                    <Form :mode="formData" :label-width="100" style='margin-right: 10px;'>
                        <FormItem label="*商品菜单">
                            <Select v-model="formData.category" placeholder='请选择菜单' >
                                <Option v-for='(item, index) in options' :key='item.id' :value="item.name">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="*图片">
                            <!-- 图片上传组件 -->
                            <Img-Upload :selfImg='selfImg' @getImgData='getImgData' ref='addimg2'></Img-Upload>
                        </FormItem>
                        <FormItem label="*商品图集">
                            <div class='imgs'>
                                <div v-for='(img, index) in imgs' class='img'>
                                    <img :src="imgHost + img" alt="">
                                    <div class='events'>
                                        <div class='add' @click='addImg(index)'><Icon type="plus-circled"></Icon></div>
                                        <div class='del' @click='del(index)'><Icon type="minus-circled"></Icon></div>
                                    </div>
                                </div>
                                <Img-Upload :selfImg='selfImg2' @getImgData='getImgData2' ref='addimg'></Img-Upload>
                            </div>
                        </FormItem>
                        <FormItem label="*商品名称">
                            <Input v-model="formData.name"></Input>
                        </FormItem>
                        <FormItem label="商品子名称">
                            <Input v-model="formData.subname" type='textarea'></Input>
                        </FormItem>
                        <Form inline :label-width="100">
	                        <FormItem label="商品单位">
	                            <Input v-model="formData.unit" style='width: 200px;'></Input>
	                        </FormItem>
	                        <FormItem label="商品规格">
	                            <Input v-model="formData.spec" style='width: 200px;'></Input>
	                        </FormItem>
	                        <FormItem label="原产地">
	                            <Input v-model="formData.address" style='width: 200px;'></Input>
	                        </FormItem>
	                    </Form>
	                    <Form inline :label-width="100">
	                        <FormItem label="*商品售价">
	                            <Input v-model="formData.price" style='width: 200px;'></Input>
	                        </FormItem>
	                        <FormItem label="商品原价">
	                            <Input v-model="formData.old_price" style='width: 200px;'></Input>
	                        </FormItem>
	                        <FormItem label="*商品库存">
	                            <Input v-model="formData.store" style='width: 200px;'></Input>
	                        </FormItem>
	                    </Form>
	                    <FormItem label="sku状态">
                            <i-switch v-model="formData.sku_status" size="large">
                                <span slot="open">ON</span>
                                <span slot="close">OFF</span>
                            </i-switch>                    
                        </FormItem>
						<FormItem label="商品标签">
                            <CheckboxGroup v-model="formData.labels">
						        <Checkbox v-for='tag in tags' :label="tag.name" size='large' :key='tag.id'></Checkbox>
						    </CheckboxGroup>
                        </FormItem>
						<FormItem label="内容">
                           <Vue-Edit :content='contentText' @getContent='getContent'></Vue-Edit>
                        </FormItem>
                        <FormItem label="赠送积分">
                            <Input v-model="formData.score"></Input>
                        </FormItem>
                        <FormItem label="商品排序">
                            <Input v-model="formData.rank"></Input>
                        </FormItem>
                        <FormItem label="备注">
                            <Input v-model="formData.remark"></Input>
                        </FormItem>
                        <FormItem label="商品状态">
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
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: left;">
                        <Button class='btn' @click="open(selections)" type='success'>显示</Button>
                        <Button class='btn' @click="off(selections)" type='warning'>隐藏</Button>
                    </div>
                    <div style="float: right;">
                        <Page :total="total" :current="current" @on-change="changePage" :page-size='size'></Page>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import VueEdit from '../vueedit/vueEdit'
    import ImgUpload from '../imgupload/imgUpload'
    export default {
        name: 'Goods',
        data () {
            return {
            	contentText:'',
            	formData3: {},
                total: 0,
                current: 1,
                size: 18,
                selfImg: '',
                selfImg2: '',
            	skuTags: [],
                imgs: [],
            	i: 0,
            	tags: [],
                changImg: false,
            	modal2: false,
                modal: false,
                loading: false,
                formData: {},
                img: '',
                img2: '',
                index: null,
                formData2: {},
                tableData: [],
                options:[],
                skuItems: [],
                add: false,
                imgHost: 'http://img1.qingful.com/',
                imgUrl: require('../../../assets/noimage.png'),
                selections: [],
                page: 1,
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
                            let img;
                            if (params.row.img) {
                                img = this.imgHost + params.row.img
                            } else {
                                img = this.imgUrl
                            }
                            return h('div', {
                                attrs: {
                                    style: 'display:flex;flex-direction:row;align-items: center;'
                                }
                            }, [
                                h('img', {
                                    attrs: {
                                        src: img,
                                        style: 'width:50px;height:50px;padding:5px;'
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
                        title: '规格',
                        key: 'skuname',
                        width: 100
                    },
                    {
                        title: '菜单',
                        key: 'category',
                        width: 120
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
                        title: '排序',
                        key: 'rank',
                    },
                    {
                        title: 'sku管理',
                        key: 'sku_status',
                        width: 120,
                        render: (h, params) => {
                            const row = params.row;
                            const bgColor = row.sku_status == 0 ? 'warning' : 'primary';
                            const text = row.sku_status == 0 ? '未启用' : '管理';
                            const disabled = row.sku_status == 0 ? true : false;
                            const icon = row.sku_status == 0 ? '' : 'compose';
                            return h('Button', {
                                props: {                    
                                    type: bgColor,
                                    disabled: disabled,
                                },
                                attrs: {
                                	icon: icon
                                },
                                on: {
                                	click: () => {
                                            this.modal2 = true
                                        }
                                }
                            }, text);
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark',
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        width: 160,
                        render: (h, params) => {
                            const text = params.row.status == 0 ? '显示' : '隐藏'
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
                                            let labels = []
                                            let labelsArr = []
                                            const tags = this.tags
                                            if (params.row.labels && !Array.isArray(params.row.labels)) {
                                                labels = params.row.labels.split(',')
                                                labels.forEach(label => {
                                                    tags.forEach(tag => {
                                                        if (tag.id == label) {
                                                            labelsArr.push(tag.name)
                                                        }
                                                    })
                                                })
                                            } else if(Array.isArray(params.row.labels)){
                                                labelsArr = params.row.labels
                                            } else {
                                                labelsArr = [];
                                            }
                                            
                                            params.row.status = params.row.status == 0 ? false : true
                                            params.row.sku_status = params.row.sku_status == 0 ? false : true  
                                            params.row.labels = labelsArr
                                            this.formData = params.row
                                            this.contentText = params.row.detail
                                            this.selfImg = params.row.img
                                            this.selfImg2 = ''
                                            this.img = params.row.img
                                            if (params.row.imgs) {
                                                this.imgs = params.row.imgs.split(',')
                                            };
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
                                            this.saveProduct(data)
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
            if (this.$route.params.id) {
                this.getData('&where=id,' +  this.$route.params.id)
            } else {
                this.getData()
            }
            this.getTag()
        },
        methods: {
            getData: function(params) {
                this.$axios.getProducts(params).then(res => {
                  const data = res.data;
                  this.getMenu(data)
                });
            },
            getMenu: function(params) {
                this.$axios.getMenu().then(res => {
                    const data = res.data;
                    let options = [];
                    data.forEach(item => {
                        options.push({
                            id: item.id,
                            name: item.name
                        });
                        params.forEach(param => {
                            if (item.id == param.category_id) {
                                param.category = item.name
                            }
                        });
                    });
                    this.options = options;
                    this.getSku(params)
                })
            },
            getSku: function(params) {
            	this.$axios.getSku().then(res => {
                    const data = res.data;
                    let skuItems = [] 
                    params.forEach(param => {
                    	if (param.sku) {
                			let skuname = []
                    		let skus = param.sku.split(',');
                        	skus.forEach(skuId => {
                				data.forEach(item => {
	                        		if (item.id == skuId) {
		                                skuname.push(item.text)
		                            };
                                    
		                        })
                        	}) 
                    		param.skuname = skuname.join(' ')
                    	}
                    });
                    data.forEach(item => {
                        if (item.pid == 0) {
                            skuItems.push(item)
                        }
                    })
                    this.skuItems = skuItems
                    this.tableData = params.slice(0,18);
                    this.searchData = params;
                    this.total = params.length
                    this.loading = false
                    this.tableData = this.searchData.slice((this.page-1) * 18, this.page * 18)
                })
            },
            getTag: function(params) {
            	this.$axios.getTag().then(res => {
                    this.tags = res.data
                })
            },
            saveProduct: function(formData) {
                this.$axios.postProduct({
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
                    this.saveProduct(data)
                })
            },
            off: function(params) {
                params.forEach(select => {
                    const data = {
                        id: select.id,
                        status: 0
                    };
                    this.saveProduct(data)
                })
            },
            multiple: function(multiple) {
                this.selections = multiple;
            },
            ok: function(formData) {
                if (!formData.category) {
                    this.$Message.error('请选择商品菜单！！') 
                    return false
                }
                if (!this.img) {
                    this.$Message.error('商品图片不能为空') 
                    return false
                }
                if (!this.imgs.join(',')) {
                    this.$Message.error('商品图集不能为空') 
                    return false
                }
                if (!formData.name) {
                    this.$Message.error('商品名称不能为空') 
                    return false
                }
                if (!formData.price) {
                    this.$Message.error('商品价格不能为空') 
                    return false
                }
                if (!formData.store && formData.store == 0) {
                    this.$Message.error('商品库存不能为空且值不能为0！！') 
                    return false
                }
            	let labels = formData.labels || []
                let category_id;
                let labelData = [];
                const tags = this.tags;
                tags.forEach(item => {
                    labels.forEach(label => {
                        if (item.name == label) {
                            labelData.push(item.id)
                        }
                    })
                });
                const options = this.options;
                options.forEach(option => {
                    if (option.name == formData.category) {
                        category_id = option.id;
                    }
                })
                const data = {
                    id: formData.id || 0,
                    category_id: category_id,
                    address: formData.address,
                    detail: this.contentText,
                    labels: labelData.join(','),
                    name: formData.name,
                    img: this.img,
                    imgs: this.imgs.join(','),
                    old_price: formData.old_price,
                    price: formData.price,
                    remark: formData.remark,
                    sales: formData.sales,
                    score: formData.score,
                    sku: formData.sku,
                    sku_status: formData.sku_status,
                    spec: formData.spec,
                    status: formData.status,
                    store: formData.store,
                    subname: formData.subname,
                    unit: formData.unit,
                    visiter: formData.visiter,
                    sub: formData.sub,
                    rank: formData.rank,
                    remark: formData.remark,
                };
                this.saveProduct(data)
                this.formData = {}
                this.selfImg = ''
                this.selfImg2 = ''
                this.img = ''
            },
            cancel: function() {
                this.getData()
                this.formData = {}
                this.modal = false
                this.selfImg = ''
                this.selfImg2 = ''
                this.img = ''
                this.$refs.addimg2.del()
            },

            search: function(formData2) {
            	const category = formData2.category;
            	const status = formData2.status;
            	const name = formData2.name;
                const searchData = this.searchData;
                let tableData = [];
                let all = [];
                let categoryData = [];
                let statusData = [];
                let nameData = [];
            	if (category || status || name) {
        			if(category == '所有分类' || status == '所有状态') {
        				all = searchData
        			};
    				if (category && category != '所有分类') {
    					searchData.forEach(item => {
    						if (item.category == category) {
    							categoryData.push(item)
    						}
    					})
    				};
    				if (status && status != '所有状态') {
    					const statusNum = status == '显示' ? 1 : 0;
    					searchData.forEach(item => {
    						if (item.status == statusNum) {
    							statusData.push(item)
    						}
    					})
    				};
    				if (name) {
    					searchData.forEach(item => {
    						if (item.name == name || item.id == name ) {
    							nameData.push(item)
    						}
    					})
    				}
            		this.intersect(categoryData, statusData, nameData, all)	
            	}
            },

            // 求交集
            intersect: function (categoryData, statusData, nameData, all) {
            	let data = this.searchData;
            	let data1 = [];
				if(categoryData.length != 0) {
					data.forEach(item => {
						categoryData.forEach(item2 => {
							if (item.id == item2.id) {
								data1.push(item)
							}
						})
					})
					data =data1
					data1 = []
				};
				if (statusData.length != 0) {
					data.forEach(item => {
						statusData.forEach(item2 => {
							if (item.id == item2.id) {
								data1.push(item)
							}
						})
					})
					data =data1
					data1 = []
				};
				if (nameData.length != 0) {
					data.forEach(item => {
						nameData.forEach(item2 => {
							if (item.id == item2.id) {
								data1.push(item)
							}
						})
					})
					data =data1
					data1 = []
				};
				if (all.length != 0) {
					data.forEach(item => {
						all.forEach(item2 => {
							if (item.id == item2.id) {
								data1.push(item)
							}
						})
					})
					data =data1
					data1 = []
				};

				this.tableData = data;

            },

            exportAll: function(tableData) {

                const tags = this.tags;
                
                let columns = [
                    {title: '编号', key: 'id'},
                    {title: '商品名称', key: 'name'},
                    {title: '商品分类', key: 'category'},
                    {title: '商品SKU', key: 'skuname'},
                    {title: '商品单位', key: 'spec'},
                    {title: '商品标签', key: 'labels'},
                    {title: '赠送积分', key: 'score'},
                    {title: '商品排序', key: 'rank'},
                    {title: '备注', key: 'remark'},
                    {title: '商品单价', key: 'price'},
                    {title: '商品状态', key: 'status'},
                ]
                tableData.forEach(item => {
                    item.status = item.status == 0 ? '隐藏' : '显示'
                    tags.forEach(tag => {
                        if (tag.id == item.labels) {
                           item.labels = tag.name 
                        } else {
                            item.labels = '普通商品'
                        }
                    });
                })
            	this.$refs.table.exportCsv({
                    filename: '全部商品' + new Date().getFullYear() + '-' + new Date().getMonth() +1 + '-' + new Date().getDate(),
                    data: tableData,
                    original: false,
                    columns: columns
                })
            },

            addSku: function() {
            	this.skuTags.push(this.i + 1)
            },

            delSku: function(index) {
            	this.skuTags.splice(index, 1)
            },
            okSku: function(formData) {
            	// console.log(formData)
                
            },
            addProduct: function() {
                this.modal = true;
                this.selfImg = ''
                this.selfImg2 = ''
                this.img = ''
                this.formData = {};
                this.imgs = [];
                this.contentText = ''
                this.$refs.addimg2.del()
                
            },
            getImgData: function(params) {
                let img = params;
                if (img && /http/.test(params)) {
                    this.img = img.split('/')[3]
                } else {
                    this.img = ''
                }
            },
            getImgData2: function(params) {
                let img2 = params;
                if (img2 && /http/.test(params)) {
                    if (this.changeImg) {
                        this.imgs.splice(this.index, 1, img2.split('/')[3]);
                        this.index = null;
                        this.$refs.addimg.del()
                        this.changeImg = false
                    } else {
                        this.imgs.push(img2.split('/')[3])
                        this.$refs.addimg.del()
                    }
                }
            },
            getContent: function(params) {
                this.contentText = params
            },
            del: function(index) {
                this.imgs.splice(index, 1)
            },
            addImg: function(index) {
                this.$refs.addimg.add()
                this.changeImg = true
                this.index = index
            },
            changePage: function(page) {
                this.page = page
                this.tableData = this.searchData.slice((page-1) * 18, page * 18)
            }
        },
        components: {
            VueEdit,
            ImgUpload
        }
    }
</script>

<style scoped>
    .goods {
        background: #fff;
        border-top: 3px solid #d2d6de;
        border-radius: 3px; 
        padding-bottom: 15px;
        margin-bottom: 30px;
    }

     .goods1 {
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

    .img {
        height: 180px;
        width: 180px;
        border: 1px solid #f4f4f4;
        border-radius: 5px;
        padding: 5px;
        position: relative;
        margin-right: 20px;
    }

    .imgs {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }

    .img img {
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
        background: rgba(0, 0, 0, .1);
    }

    .add, .del {
        font-size: 28px;
        cursor: pointer;
        margin-left: 22%;
        color: rgba(0, 0, 0, .8)
    }

    .sku {
    	position: relative;
    	margin-left: 20px;
    	margin-bottom: 20px;
    }

    .close {
    	position: absolute;
    	right: -5px;
    	top: -4px;
    	padding: 5px;
    	cursor: pointer;
    }

    .addSku {
    	margin-left: 20px;
    }
</style>
