<template>
	<section>
		<div class="help">
			<h5>使用帮助</h5>
			<div class="help-detail">
                <span class='step'>第一步:创建应用</span>
				<div>
                    <p>打开青否云官网，注册并创建应用程序</p>
                    <img src="http://cloud.qingful.com/doc/images/screenshot-192.168.31.194-1129-2017-11-29-14-34-28-106.png" alt="">
                </div>
                <span class='step'>第二步:创建数据表</span>
                <div>
                    <p>根据<code>wemall7.sql</code>创建数据表和字段</p>
                    <img src="http://cloud.qingful.com/doc/images/screenshot-192.168.31.194-1129-2017-11-29-14-35-30-753.png" alt="">
                </div>
                <span class='step'>第三步:设置权限、密钥、分组等</span>
                <div>
                    <p>根据请求分别设置不同的组权限、表权限、字段权限等</p>
                    <img src="http://cloud.qingful.com/doc/images/screenshot-192.168.31.194-1129-2017-11-29-14-45-13-815.png" alt="">
                </div>

                <div class='more'>
                    更多详细内容请移步： <a href="https://cloud.qingful.com/">青否云官网</a><br>
                    开发文档请移步： <a href="https://cloud.qingful.com/doc/#/zh-cn/summary">青否云开发文档</a>
                </div>
			</div>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'Help',
        data () {
            return {
            	formData: {},
            }
        },
        created() {
        	this.getData()
        },
        methods: {
        	getData: function() {
        		this.$axios.getPrint().then(res => {
        			let data = res.data;
        			data.switch = data.switch == 1 ? true : false
        			this.formData = data;
        		})
        	},
        	savePrint: function(params) {
        		this.$axios.postPrint({
        			method: 'post',
        			data: params
        		}).then(res => {
        			this.$Message.success('已保存设置！')
        			this.getData()
        		})
        	},
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

	.help {
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

  	.help-detail {
  		width: 80%;
  		margin: 20px auto;
  	}

    .help-detail img {
        width: 680px;
        margin: 20px;
    }

    .help-detail p {
        margin: 20px;
    }

    .step {
        background: #5cb3ff;
        padding: 5px 10px;
        color: #fff;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .more {
        margin-left: 20px;
        font-size: 14px;
    }
	
	
  	
</style>
