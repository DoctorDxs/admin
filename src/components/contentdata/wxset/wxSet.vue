<template>
	<section class="wx-set">
		<h5>微信设置</h5>
		<div class='emial'>
			<Form :model="formData" :label-width="140" >
		        <FormItem label="url">
		            <Input v-model="formData.url" disabled></Input>
		        </FormItem>
		        <FormItem label="token">
		            <Input v-model="formData.token"></Input>
		        </FormItem>
		        <FormItem label="appid">
		            <Input v-model="formData.appid"></Input>
		        </FormItem>
		        <FormItem label="appsecret">
		            <Input v-model="formData.appsecret"></Input>
		        </FormItem>
		        <FormItem label="encodingaeskey">
		            <Input v-model="formData.encodingaeskey"></Input>
		        </FormItem>
		        <FormItem label="公众号原始ID">
		            <Input v-model="formData.old_id"></Input>
		        </FormItem>
		        <FormItem label="appid(小程序)">
		            <Input v-model="formData.x_appid"></Input>
		        </FormItem>
		        <FormItem label="appsecret(小程序)">
		            <Input v-model="formData.x_appsecret"></Input>
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
                formData: {
                	 
                },
                
            }
        },
        created() {
        	this.getData()
        },
        methods: {
        	getData: function() {
        		this.$axios.getWxset().then(res => {
        			const data = res.data
	        		this.formData = data
	        	})
        	},
        	saveSms: function(formData) {
        		this.$axios.postWxset({
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
	.wx-set {
		background: #fff;
    	border-top: 3px solid #d2d6de;
    	border-radius: 3px;	
    	padding-bottom: 15px;
	}

	h5{
	    border-bottom: 1px solid #f4f4f4;
	    padding: 5px 10px;
	    font-weight: 500;
	    font-size: 18px;
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
