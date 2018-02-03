<template>
	<section>
		<div class="module-set">
			<div>
				<img :src="defaultImg" alt="">	
                <Button class='btn' :type='set == true ? "error" : "success" '>{{set == false ? "已设置" : "设置"}}</Button>	
			</div>
			<div>
				<img :src="defaultImg" alt="">  
                <Button class='btn' :type='set == true ? "success" : "error" '>{{set == false ? "设置" : "已设置"}}</Button>   
			</div>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'moduleSet',
        data () {
            return {
            	formData: {},
                defaultImg: require('../../../assets/bg_1.jpg'),
                set: false,
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
	.module-set {
		width: 300px;
    	padding-bottom: 15px;
    	min-height: 800px;
	}
	
  	.module-set-detail {
  		width: 80%;
  		margin: 20px auto;
  	}
    
    .module-set div {
        height: 340px;
        width: 240px;
        background: #fff;
        border-radius: 5px;
    }

    .module-set div:last-child {
        margin-top: 60px;
    }

    .module-set img {
        height: 100%;
        width: 100%;
        border-radius: 5px;
        padding: 5px;
    }

    .btn {
        width: 100%;
        margin-top: 10px;
    }
	
</style>
