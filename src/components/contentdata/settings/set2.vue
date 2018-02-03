<template>
	<section class="set-shop">
		<h5>商城设置</h5>
		<div class="set-shop-item">
			<Form ref='formData' :model="formData" :label-width="120">
		        <FormItem label="商城名称">
		            <Input v-model="formData.name" placeholder="请输入商城名称"></Input>
		        </FormItem>
		        <FormItem label="调试模式">
		            <i-switch v-model="formData.debug" size="large">
		                <span slot="open">On</span>
		                <span slot="close">Off</span>
		            </i-switch>
		        </FormItem>
		        <FormItem label="商城升级">
		            <i-switch v-model="formData.shop_update" size="large">
		                <span slot="open">On</span>
		                <span slot="close">Off</span>
		            </i-switch>
		        </FormItem>
		        <FormItem label="商城标题">
		            <Input v-model="formData.title" placeholder="请输入商城标题"></Input>
		        </FormItem>		        
		        <FormItem label="商城描述">
		            <Input v-model="formData.description" type="textarea"  placeholder="请描述您的商城描述"></Input>
		        </FormItem>
		        <FormItem label="商城关键词">
		            <Input v-model="formData.keywords" placeholder="请输入商城关键词"></Input>
		        </FormItem>
		        <FormItem label="欢迎语">
		            <Input v-model="formData.welcome" type="textarea" placeholder="请输入商城欢迎语"></Input>
		        </FormItem>
				<FormItem label="商城Logo">
		            <div class='upload-logo'>
		            	<img v-if='formData.logo != ""' :src="imgHost + formData.logo" alt="">
		            	<img v-else :src="imgUrl" alt="" >
		            	<div class='events'>
		            		<div class='add' @click='add'><Icon type="plus-circled"></Icon></div>
		            		<div class='del' @click='del'><Icon type="minus-circled"></Icon></div>
		            	</div>
		            </div>
		            <!-- 图片弹框 -->
			    	<Modal
				        v-model="modal"
				        title="图片上传管理器"
				        width="600"
				        @on-ok="ok"
				        @on-cancle='cancle'>
			        	<Upload :action="action" 
			        			:headers='headers'
			        			:format="['jpg','jpeg','png']"
			        			:on-success="uploadSuccess"
			        			:on-error='uploadError'
			        			:show-upload-list="false"
			        			:max-size='2048'
			        			multiple
			        			>
	        				<Button type="primary" icon="ios-cloud-upload-outline" large>本地上传</Button>
	    				</Upload>
	    				<div class="imgs">
	    					<div class="img" v-for='(img, index) in imgs' @click='selected(img, index)'>
	    						<img :src="imgHost + img.name" alt="">
	    						<div class="selescted" v-show='isShow === index'><Icon type="checkmark-circled"></Icon>已选择</div>
	    					</div>
	    				</div>
	    				<div style="margin: 10px;overflow: hidden">
					        <div style="float: right;">
					            <Page :total="total" :current="current" @on-change="changePage" :page-size='size'></Page>
					        </div>
					    </div>
				    </Modal>
		        </FormItem>
		        <FormItem label="客服QQ">
		            <Input v-model="formData.qq" placeholder="请输入商城客服QQ"></Input>
		        </FormItem>
		        <FormItem label="客服电话">
		            <Input v-model="formData.tel" placeholder="请输入商城客服电话"></Input>
		        </FormItem>
		        <FormItem label="客服邮箱">
		            <Input v-model="formData.mail" placeholder="请输入商城客服邮箱"></Input>
		        </FormItem>
		        <FormItem label="提现手续费">
		            <Input v-model="formData.tx_fee" placeholder="请输入商城提现手续费"></Input>
		        </FormItem>
				<FormItem label="网站状态">
		            <i-switch v-model="formData.status" size="large">
		                <span slot="open">On</span>
		                <span slot="close">Off</span>
		            </i-switch>
		        </FormItem>
				<FormItem label="使用帮助">
		            <Input v-model="formData.help" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入使用帮助说明"></Input>
		        </FormItem>
		        <FormItem label="关于我们">
		            <Input v-model="formData.about" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="关于我们"></Input>
		        </FormItem>
		        <FormItem label="关闭网站原因">
		            <Input v-model="formData.closed_reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入关闭网站原因"></Input>
		        </FormItem>
		        <FormItem label="统计代码">
		            <Input v-model="formData.tongji_code" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="统计代码"></Input>
		        </FormItem>
		        <FormItem>
		            <Button type="success" @click='saveSet(formData)'>保存</Button>
		        </FormItem>
	    	</Form>
    	</div>
	</section>
</template>

<script>
	export default {
		name: 'setShop',
		data () {
            return {
                formData: {},
                imgs: [],
                imgHost: 'http://img1.qingful.com/',
                modal: false,
                headers: {   //图片上传头部参数
				    "x-qingful-appid": '526594162805',
				    "x-qingful-appkey": '12166320-d969-11e7-954f-03e048d62ffc',
				    "x-qingful-dev": 'true',
				    'token': localStorage.getItem('token')
                },
                action: 'https://baas.qingful.com/2.0/class/home/image/upload',   //图片上传地址
                imgUrl: require('../../../assets/noimage.png'),
                total: 0,
                size: 16,
                logo: '',
                current: 1,
                isShow: false,
            }
        },
        created: function() {
        	this.getdata()
        },
        methods: {
        	// 获取配置
        	getdata: function() {
        		this.$axios.getConfig().then(res => {
        			let data = res.data;
        			data.debug = data.debug == 1 ? true : false;
        			data.status = data.status == 1 ? true : false;
        			data.shop_update = data.shop_update == 1 ? true : false;
        			this.formData = data;
        		})
        	},
        	// 保存配置
        	saveSet: function(data) {
        		this.$axios.postConfig({
        			data: data,
        			method:  'post'
        		}).then(res => {
        			this.$Message.success('保存成功')
        		})
        	},
        	// 保存图片
        	saveImg: function(params) {
        		this.$axios.saveImg({
        			data: params,
        			method:  'post'
        		}).then(res => {
        			this.getImg(1)
        			this.$Message.success('保存成功')
        		})
        	},
        	// 获取图片总数
        	getImgCount: function() {
        		this.$axios.getImgCount().then(res => {
        			let data = res.data;
        			this.total = data[0]['count(`id`)']
        		})
        	},

        	// 获取图片
        	getImg: function(page) {
        		this.$axios.getImg(`?page=${page}&pageSize=${this.size}`).then(res => {
        			let data = res.data.data;
        			this.imgs = data
        		})
        	},

        	add: function() {
        		this.modal = true
        		this.getImgCount()
        		this.getImg(1)
        	},
        	// 删除图片
        	del: function() {
        		this.formData.logo = ''
        	},
        	uploadSuccess: function(res, file) {
        		const data = {
        			name: res.data
        		}
        		this.saveImg(data)
        	},

        	uploadError: function() {
        		this.$Message.error('图片上传失败！！')
        	},

        	selected: function(img, index) {
        		this.logo = img.name
        		this.isShow = index
        	},
        	ok: function() {
        		this.formData.logo = this.logo
        	},
        	cancle: function() {
        		this.logo = ''
        	},

        	changePage: function(page) {
        		this.logo = ''
          		this.getImg(page)
        	}
        }
	}
</script>


<style scoped>
	.set-shop {
		background: #fff;
    	border-top: 3px solid #d2d6de;
    	border-radius: 3px;
	}

	.set-shop-item {
		width: 70%;
		margin-left: 100px;
		margin-top: 20px;
		padding-bottom: 15px;
	}

	h5{
	    border: 1px solid #f4f4f4;
	    border-bottom: 1px solid #f4f4f4;
	    padding: 5px 10px;
	    font-weight: 500;
	    font-size: 18px;
  	}
	
	.set-shop-item form input {
		width: 200px !important;
	}
	
	.set-shop-item label {
		font-weight: 600 !important;
		color: red;
		font-size: 20px!important;
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
</style>