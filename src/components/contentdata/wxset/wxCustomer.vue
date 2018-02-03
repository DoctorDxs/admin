<template>
	<section>
		<div class="container">
			微信转接客服，转接到配置客服，不设置将随机转接。详细可见官方说明文档: <a href="http://dkf.qq.com/faq-1_1.html"> http://dkf.qq.com/faq-1_1.html。</a>
		</div>
		<div class="wx-customer">
			<h5>微信多客服设置</h5>
			<div class="addNew">
			        <Form :mode="formData" :label-width="120" style='margin-right: 10px;'>
				        <FormItem label="状态">
				            <i-switch v-model="formData.status" size="large">
				                <span slot="open">On</span>
				                <span slot="close">Off</span>
				            </i-switch>			           
				        </FormItem>	  
				        <FormItem label="转接客服(微信号)">
				            <Input v-model="formData.kefu"></Input>
				        </FormItem>   
						<Button class='btn' @click="saveKefu(formData)" type='success'>保存</Button>
				    </Form>
			    </Modal>
			</div>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'wxCustomer',
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
        		this.$axios.getKefu().then(res => {
        			let data = res.data;
        			data.status = data.status == 1 ? true : false
        			this.formData = data;
        		})
        	},
        	saveKefu: function(params) {
        		this.$axios.postKefu({
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

	.container a{
		color: #fff;
		opacity: .8;
	}

	.wx-customer {
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
  	
</style>
