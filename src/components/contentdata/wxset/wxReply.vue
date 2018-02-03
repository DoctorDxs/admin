<template>
	<section>
		<div class="container">
			关键词:subscribe 设置关注自动回复
		</div>
		<div class="wx-reply">
			<h5>微信自定义回复</h5>
			<div class="addNew">
				<Button type="success" @click="addNew" large>新增自定义回复</Button>
			    <Modal	v-model="modal"
				        title="新增菜单"
				        width="600"
				        @on-ok="ok(formData)"
				        @on-cancel='cancel'
				        ok-text='保存'>
			        <Form :mode="formData" :label-width="80" style='margin-right: 10px;'>
				        <FormItem label="标题">
				            <Input v-model="formData.title"></Input>
				        </FormItem>
						<FormItem label="类型">
				            <RadioGroup v-model="formData.type">
				                <Radio label="news">图文</Radio>
				                <Radio label="text">文本</Radio>
				            </RadioGroup>
				        </FormItem>
				        <FormItem label="描述" v-if='formData.type == "news"'>
				            <Input v-model="formData.description"></Input>
				        </FormItem>
						<FormItem label="图片" v-if='formData.type == "news"'>
				            <!-- 图片上传组件 -->
		           	 		<Img-Upload :selfImg='selfImg' @getImgData='getImgData'></Img-Upload>
				        </FormItem>
				        <FormItem label="链接" v-if='formData.type == "news"'>
				            <Input v-model="formData.url"></Input>
				        </FormItem>
				        <FormItem label="关键词">
				            <Input v-model="formData.key"></Input>
				        </FormItem>
				        <FormItem label="备注">
				            <Input v-model="formData.remark"></Input>
				        </FormItem>		        
				    </Form>
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
    	name: 'wxReply',
        data () {
            return {
            	formData: {type: 'news'},
            	selfImg: '',
            	modal:false,
            	notText: true,
            	imgUrl: '',
                imgHost: 'http://img1.qingful.com/',
                imgUrl: require('../../../assets/noimage.png'),
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
                        title: '类型',
                        key: 'type',
                        width: '90',
                        render: (h, params) => {
	                    	const row = params.row
	                    	const text = row.type == 'news' ? '图文' : '文本'
	                    	return h('div', text)   
                        }
                    },
                    {
                        title: '标题',
                        key: 'title',
                        width: '100',
                    },
                    {
                        title: '描述',
                        key: 'description',
                        width: '100',
                    },
                    {
                        title: '图片',
                        key: 'file',
                        render: (h, params) => {
                        	let img;
                        	if (params.row.img) {
                        		img = this.imgHost + params.row.img
                        	} else {
                        		img = this.imgUrl
                        	}
                             return h('img', {
                        		attrs: {
                        			src: img,
                        			style: 'width:60px;height:60px;padding:5px;'
                        		},                      
                        	})
                        }
                    },
                    {
                        title: '链接',
                        key: 'url',
                    },
                    {
                        title: '关键词',
                        key: 'key',
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
	                                    	this.notText = params.row.type == 'news' ? true : false           
	                                    	this.formData = params.row;
                                            this.selfImg = params.row.img
	                                    	this.img = params.row.img
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
        		this.$axios.getWxReply().then(res => {
        			const data = res.data;
        			this.tableData = data;
        		})
        	},
        	deleteData: function(params) {
        		this.$axios.deleteWxReply(params).then(res => {
        			this.$Message.success('删除成功！')
        			this.getData()
        		})
        	},
        	saveWxReply: function(params) {
        		this.$axios.postWxReply({
        			method: 'post',
        			data: params
        		}).then(res => {
        			this.$Message.success('已保存设置！')
        			this.getData()
        			this.formData = {type: 'news'};  
        			      	
        		})
        	},
        	addNew: function() {
        		this.modal = true
        	},
        	multiple: function(multiple) {
        		let ids = [];
        		multiple.forEach(item => {
        			ids.push(item.id)
        		});
        		this.selections = ids.join(',')
        	},
        	ok: function(formData) {
        		const data = {
        			id: formData.id || 0,
        			title: formData.title,
        			key: formData.key,
        			rank: formData.rank,
        			remark: formData.remark,
        			type: formData.type,
        			url: formData.url,
        			description: formData.description,
        			img: this.img
        		};
        		this.saveWxReply(data)
                this.img = ''
        	},
        	cancel: function() {
                this.img = ''
        		this.formData = {type: 'news'};  
        	},
        	getImgData: function(params) {
        		let img = params;
        		if (img && /http/.test(params)) {
        			this.img = img.split('/')[3]
        		} else {
        			this.img = ''
        		}
        	}
        },
        components: {
        	ImgUpload
        }
    }
</script>

<style scoped>
	.container {
		padding: 15px 10px;
		background: #dd4b39;
		border-left: 3px solid #c23321;
		border-radius: 3px;
		color: #fff;
		font-size: 14px;
		margin-bottom: 20px;
	}

	.wx-reply {
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
