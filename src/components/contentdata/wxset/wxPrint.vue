<template>
	<section>
		<div class="container">
			目前仅支持易联云微信打印机: <a href="https://www.koahub.com/home/product/83" target="blank">我要购买</a>
		</div>
		<div class="wx-print">
			<h5>微信打印机设置</h5>
			<div class="addNew">
			        <Form :mode="formData" :label-width="120" style='margin-right: 10px;'>
				        <FormItem label="自动打印">
				            <i-switch v-model="formData.switch" size="large">
				                <span slot="open">ON</span>
				                <span slot="close">OFF</span>
				            </i-switch>			           
				        </FormItem>	  
				        <FormItem label="用户id">
				            <Input v-model="formData.partner"></Input>
				        </FormItem>   
				        <FormItem label="API 密钥">
				            <Input v-model="formData.apikey"></Input>
				        </FormItem>
				        <FormItem label="终端号">
				            <Input v-model="formData.machine_code"></Input>
				        </FormItem>
				        <FormItem label="密钥">
				            <Input v-model="formData.mkey"></Input>
				        </FormItem>
						<Button class='btn' @click="savePrint(formData)" type='success'>保存</Button>
				    </Form>
			    </Modal>
			</div>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'wxPrint',
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

	.container a {
		color: #fff;
		opacity: .7;
		border: 1px solid #fff;
		margin-left: 10px;
		padding: 5px;
		background:hsla(0,0%,100%,.2)
	}

	.container a:hover {
		background:hsla(0,0%,100%,.5);
		opacity: .9;
		
	}

	.wx-print {
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
	
	.addNew {
		padding: 10px;
		margin-left: 100px;
		width: 60%;
	}

	.btn {
		margin-left: 20px;
	}
  	
</style>
