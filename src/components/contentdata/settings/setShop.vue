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
		                <span slot="open">ON</span>
		                <span slot="close">OFF</span>
		            </i-switch>
		        </FormItem>
		        <FormItem label="商城升级">
		            <i-switch v-model="formData.shop_update" size="large">
		                <span slot="open">ON</span>
		                <span slot="close">OFF</span>
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
					<!-- 图片上传组件 -->
		            <Img-Upload :selfImg='selfImg' @getImgData='getImgData'></Img-Upload>
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
		                <span slot="open">ON</span>
		                <span slot="close">OFF</span>
		            </i-switch>
		        </FormItem>
				<FormItem label="使用帮助">
		            <Input v-model="formData.help" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入使用帮助说明"></Input>
		        </FormItem>
		        <FormItem label="配送时间">
		        	<div v-for='(item, index) in deliveryTime' style='marginBottom: 10px;'>
		        		<Row>
			        		<TimePicker  format="HH:mm" v-model='deliveryTime[index]' placeholder='请选择时间' type="timerange" style="width: 120px" @on-change='getDate($event, index)'></TimePicker>
			        		<Button style='marginLeft: 30px;' type="ghost" @click='del(index)'>删除</Button>
			        	</Row>
		        	</div>
		        	<Button v-if='deliveryTime.length < 4' style='marginLeft: 30px;' type="ghost" @click='add'>添加时间段</Button>
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
	import ImgUpload from '../imgupload/imgUpload'
	export default {
		name: 'setShop',
		data () {
            return {
                formData: {},
                selfImg: '',
                logoImg: '',
                deliveryTime: [],
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
        			let timeData = data.delivery_time
        			console.log(timeData)
        			let time = timeData.split(',')
        			time.forEach(item => {
        				this.deliveryTime.push(item.split('-'))
        			})
        			data.debug = data.debug == 1 ? true : false;
        			data.status = data.status == 1 ? true : false;
        			data.shop_update = data.shop_update == 1 ? true : false;
        			
        			this.formData = data;
        			this.selfImg = data.logo;
        			this.logoImg = data.logo
        		})
        	},
        	// 保存配置
        	saveSet: function(data) {
        		let timeData = []
        		let deliveryTime = this.deliveryTime
        		deliveryTime.forEach(item => {
        			console.log(item)
        			if (item[0] && item[1]) {
        				let hours0 = new Date(item[0]).getHours()
        				let minutes0 = new Date(item[0]).getMinutes() 
        				let hours1 = new Date(item[1]).getHours()
        				let minutes1 = new Date(item[1]).getMinutes() 
        				hours0 = hours0 < 10 ? '0' + hours0 : hours0
						minutes0 = minutes0 < 10 ? '0' + minutes0 : minutes0
						hours1 = hours1 < 10 ? '0' + hours1 : hours1
						minutes1 = minutes1 < 10 ? '0' + minutes1 : minutes1
        				timeData.push(
        					hours0
        					+ ':' + 
        					minutes0
        					+ '-' + 
        					hours1
        					+ ':' +
        					minutes1
        				)

        			}
        		})
        		data.delivery_time = timeData.join(',')
        		if (data.name.trim() == '') {
        			this.$Message.error('商城名称不能为空！！！')
        			return false
        		} else if (data.welcome.length > 20){
        			this.$Message.error('欢迎语不能超出20个字符！！')
        		}else if (!this.logoImg){
        			this.$Message.error('商城logo不能为空！！')
        		} else {
        			data.logo = this.logoImg
	        		this.$axios.postConfig({
	        			data: data,
	        			method:  'post'
	        		}).then(res => {
	        			this.$Message.success('保存成功')
	        		})
        		}
        	},
        	getDate: function(e, index) {
        		this.deliveryTime.splice(index, 1, e)
	        },
        	del: function(index) {
        		this.deliveryTime.splice(index, 1)
        	},
        	add: function(){
        		this.deliveryTime.push([])
        	},
        	getImgData: function(params) {
        		let img = params;
        		if (img && /http/.test(params)) {
        			this.logoImg = img.split('/')[3]
        		} else {
        			this.logoImg = ''
        		}
        	}
        },
        components: {
        	ImgUpload
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

	
</style>