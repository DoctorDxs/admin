<template>
  <section :style='bg' @keyup.enter="handleSubmit('formInline')">
	<div class="login-box">
        <div style="margin: 30px 10px">
            <img :src="logo" alt="">
        </div>
		<Form ref="formInline" :model="formInline" :rules="ruleInline" show-message >
            <FormItem prop="user">
                <Input type="text" icon='email' v-model="formInline.user" placeholder="请输入账号" size='large'>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" icon='ios-locked' v-model="formInline.password" placeholder="请输入密码" size='large'></Input>
            </FormItem>
            <FormItem>
                <Button class='btn' type="primary" @click="handleSubmit('formInline')" >登录</Button>
            </FormItem>
        </Form>
	</div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
        return {
        	bg: {
        		backgroundImage: 'url("' + require(`../assets/bg_${Math.ceil(Math.random()*8)}.jpg`) + '")',
        		backgroundRepeat: "no-repeat",
            	backgroundSize: "100% 100%",
        	},
            logo: require('../assets/logo.png'),
        	formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '帐号不能为空！', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空！', trigger: 'blur' },
                    { type: 'string', min: 3, message: '密码长度不能小于3位！', trigger: 'blur' }
                ]
            }
        }
    },   

    computed: {
        
    },

    methods: {
    	handleSubmit (name) {
    		const params = {
    			username: this.formInline.user,
    			password: this.formInline.password
    		};
            this.$refs[name].validate((valid) => {
                if (valid) {
                	this.$axios.login(params).then(res => {
                        localStorage.setItem("token", res.data);
				        localStorage.setItem("username", this.formInline.user);
                        if (res.data) {
                            this.$Message.success('登陆成功');
                            this.$router.push({path: '/'});
                        } else {
                            this.$Message.success('帐号或密码错误，请重新输入！');
                        }                   
                    	
				      },function (res) {
				        this.$Message.error('err:'+ res);
				      })
                } else {
                    this.$Message.error('验证错误');
                }
            })
        }
    }
}
</script>

<style scoped>
	section {
		position: fixed;
		width: 100%;
		height: 100%;
	}

	.login-box {
		width: 360px;
    	margin: 7% auto;
        padding: 20px;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
        background-color: rgba(255, 255, 255, 0.75);
        border-radius: 3px;
	}

    .btn {
        float: right;
        border-radius: 0;
        width: 86px;
        height: 37px; 
        background-color: #367fa9;
    }


</style>
