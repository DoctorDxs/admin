<template>
	<section>
		<div class='upload-img'>
        	<img :src="src" alt="" >
        	<div class='events'>
        		<div class='add' @click='add'><Icon type="plus-circled"></Icon></div>
        		<div class='del' @click='del'><Icon type="minus-circled"></Icon></div>
        	</div>
        </div>
        <!-- 图片弹框 -->
    	<Modal	:transfer='transfer'
		        v-model="uploadImg"
		        title="图片上传管理器"
		        width="600"
		        @on-ok="ok"
		        @on-cancel='cancel'>
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
	</section>
</template>

<script>
	export default {
		name: 'ImgUpload',
		data() {
			return {
				headers: {   //图片上传头部参数
				    "x-qingful-appid": '526594162805',
				    "x-qingful-appkey": '12166320-d969-11e7-954f-03e048d62ffc',
				    "x-qingful-dev": 'true',
				    'token': localStorage.getItem('token')
                },
                action: 'https://baas.qingful.com/2.0/class/home/image/upload',   //图片上传地址
                imgHost: 'http://img1.qingful.com/',
                total: 0,
                size: 16,
                current: 1,
                isShow: false,
                imgs: [],
                uploadImg: false,
                transfer: false,
                imgSrc: '',
                imgUrl: require('../../../assets/noimage.png'),
                src: require('../../../assets/noimage.png')
			}
		},
		watch: {
		   'selfImg': function (n, o) {
		   		if(n) {
			    	this.src = this.imgHost + n
		   		} else {
		   			this.src = this.imgUrl
		   		}
		   }
		},
		methods: {
			// 保存图片
        	saveImg(params) {
        		this.$axios.saveImg({
        			data: params,
        			method:  'post'
        		}).then(res => {
        			this.getImg(1)
        			this.$Message.success('保存成功')
        		})
        	},
        	// 获取图片总数
        	getImgCount() {
        		this.$axios.getImgCount().then(res => {
        			let data = res.data;
        			this.total = data[0]['count(`id`)']
        		})
        	},

        	// 获取图片
        	getImg(page) {
        		this.$axios.getImg(`?page=${page}&pageSize=${this.size}`).then(res => {
        			let data = res.data.data;
        			this.imgs = data
        		})
        	},
        	add: function(params) {
         		this.uploadImg = true
        		this.getImgCount()
        		this.getImg(1)
        	},
        	// 删除图片
        	del: function() {
        		this.src = this.imgUrl
        		this.$emit('getImgData','')
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
        		this.imgSrc = this.imgHost + img.name
        		this.isShow = index
        	},
        	ok: function() {
        		this.src = this.imgSrc
        		this.$emit('getImgData',this.src)
        		this.isShow = null
        	},
        	cancel: function() {
        		if (this.selfImg) {
        			this.src = this.imgHost + this.selfImg
        		} else {
        			this.src = this.imgUrl
        		}
        		this.isShow = null
        		this.$emit('getImgData', this.src)
        	},

        	changePage: function(page) {
          		this.getImg(page)
        	},
		},
        props: ['selfImg'],
	}
</script>

<style scoped>
	.upload-img {
		height: 180px;
		width: 180px;
		border: 1px solid #f4f4f4;
		border-radius: 5px;
		padding: 5px;
		position: relative;
	}

	.upload-img img {
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
        color: rgba(0, 0, 0, .8)
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