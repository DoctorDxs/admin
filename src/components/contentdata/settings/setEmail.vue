<template>
	<section class="set-email">
		<h5>邮件配置</h5>
		<div class='emial'>
			<Form :model="formData" :label-width="100" >
		        <FormItem label="服务器地址">
		            <Input v-model="formData.host"></Input>
		        </FormItem>
		        <FormItem label="服务器端口">
		            <Input v-model="formData.port"></Input>
		        </FormItem>
		        <FormItem label="加密">
		            <i-switch v-model="formData.secure" size="large">
		                <span slot="open">On</span>
		                <span slot="close">Off</span>
		            </i-switch>			           
		        </FormItem>
		        <FormItem label="回信地址">
		            <Input v-model="formData.replyTo"></Input>
		        </FormItem>
		        <FormItem label="用户名">
		            <Input v-model="formData.user"></Input>
		        </FormItem>
		        <FormItem label="密码">
		            <Input v-model="formData.pass"></Input>
		        </FormItem>
		        <FormItem>
		            <Button type="primary" @click="saveSms(formData)">保存</Button>
		        </FormItem>
		    </Form>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'setMsg',
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
        		this.$axios.getMail().then(res => {
        			let data = res.data
        			data.secure = data.secure == 0 ? false : true
	        		this.formData = data
	        	})
        	},
        	saveSms: function(formData) {
        		this.$axios.postMail({
        			method: 'post',
        			data: formData
        		}).then(res => {
        			this.$Message.success('已保存！')
	        	})
        	}
        	
        }
    }
</script>

<style scoped>
	.set-email {
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
  	.emial {
  		margin: 20px 100px;
  		width: 760px;
  	}
</style>
