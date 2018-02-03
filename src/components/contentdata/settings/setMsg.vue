<template>
	<section>
        <div class="container">
            目前仅支持阿里大于 网站: http://www.alidayu.com/<br>

            应用管理－应用列表－创建应用<br>

            配置管理－验证码－配置短信签名－添加签名<br>

            配置管理－验证码－配置短信模版－添加模版<br>
         </div>
		
		<div class="set-msg">
            <h5>短信验证设置</h5>
			<Form :model="formData" :label-width="100" class='emial'>
		        <FormItem label="App Key">
		            <Input v-model="formData.app_key"></Input>
		        </FormItem>
		        <FormItem label="App Secret">
		            <Input v-model="formData.app_secret"></Input>
		        </FormItem>
		        <FormItem label="短信签名">
		            <Input v-model="formData.sign"></Input>
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
        		this.$axios.getSms().then(res => {
        			const data = res.data
	        		this.formData = data
	        	})
        	},
        	saveSms: function(formData) {
        		this.$axios.postSms({
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
    .container {
            padding: 15px 10px;
            background: #dd4b39;
            border-left: 3px solid #c23321;
            border-radius: 3px;
            color: #fff;
            font-size: 14px;
            margin-bottom: 20px;
    }
	.set-msg {
		background: #fff;
    	border-top: 3px solid #d2d6de;
    	border-radius: 3px;	
    	padding-bottom: 15px;
	}

	h5{
	    border: 1px solid #f4f4f4;
	    border-bottom: 1px solid #f4f4f4;
	    padding: 5px 10px;
        margin-bottom: 10px;
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
