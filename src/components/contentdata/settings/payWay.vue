<template>
	<section class="pay-way">
		<h5>支付方式</h5>
		<div class='emial'>
			<Table border ref="selection" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple' ></Table>
            <Modal
                v-model="modal1"
                title="微信支付设置"
                @on-ok="ok(formData)"
                ok-text='保存'
                width="700">
                <div class="tip">
                    微信商户平台: <a href="https://pay.weixin.qq.com">https://pay.weixin.qq.com</a><br>
                    商户号: 微信支付商户号。<br>
                    安全秘钥: 进入商户平台API安全里设置。<br>
                </div>
                <Form :model="formData" :label-width="160" style='margin-right: 30px;'>
                    <FormItem label="商户号(公众号支付)">
                        <Input v-model="formData.mchid"></Input>
                    </FormItem>
                    <FormItem label="安全秘钥(公众号支付)">
                        <Input v-model="formData.key"></Input>
                    </FormItem>
                   <FormItem label="商户号(小程序支付)">
                        <Input v-model="formData.x_mchid"></Input>
                    </FormItem>
                    <FormItem label="安全秘钥(小程序支付)">
                        <Input v-model="formData.x_key"></Input>
                    </FormItem>
                </Form>
            </Modal>
            <Modal
                v-model="modal2"
                title="微信支付设置"
                @on-ok="ok(formData)"
                ok-text='保存'
                width="700">
                <div class="tip">
                    支付宝商家官网: <a href="">https://b.alipay.com</a><br>
                    支付宝账号: 卖家支付宝账号。<br>
                    合作身份者编号: 签约的支付宝账号对应的支付宝唯一用户号。以2088开头的16位纯数字组成。<br>
                    安全校验码KEY: 支付宝商家 KEY。<br>
                </div>
                <Form :model="formData" :label-width="160" style='margin-right: 30px;'>
                    <FormItem label="支付宝账号">
                        <Input v-model="formData.account"></Input>
                    </FormItem>
                    <FormItem label="合作身份者编号">
                        <Input v-model="formData.partner"></Input>
                    </FormItem>
                   <FormItem label="安全校验码KEY">
                        <Input v-model="formData.key"></Input>
                    </FormItem>                   
                </Form>
            </Modal>
			<Button class='btn' @click="open(selections)" type='success'>开启</Button>
        	<Button class='btn' @click="off(selections)" type='warning'>关闭</Button>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'payWay',
        data () {
            return {
                tableData: [],
                selections: [],
                modal1: false,
                modal2: false,
                formData: {},
                tableColumns: [ 
                	{
                		type: 'selection',
                		width: 60,
                        align: 'center',                
                	},           
                    {
                        title: '编号',
                        key: 'id',
                        width: 100,                   
                        render: (h, params) => {
                        	const row = params.row;
                        	return h('div', row.id)
                        }
                    },
                    {
                        title: '支付类型',
                        key: 'name',
                        render: (h, params) => {
                            const row = params.row;
                        	return h('div', row.name)
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
	                        const row = params.row;
                            const bgColor = row.status === 0 ? 'warning' : 'success';
                            const text = row.status === 0 ? '已关闭' : '已开启';
                            return h('Button', {
                                props: {                    
                                    type: bgColor,
                                }
                            }, text);
                        }
                    },                    
                    {
                        title: '操作',
                        key: 'operate',
                        width: 215,
                        render: (h, params) => {
                            const row = params.row;
                            let text = row.status == 0 ? '开启' : '关闭';
                            const bgColor =  row.status == 0 ? 'success' : 'warning';
                            let disabled = false;
                            if (row.name == '货到付款' || row.name == '余额支付') {
                                disabled = true
                            };
                            return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'primary',
	                                    size: 'small'
	                                },
                                    attrs: {
                                        disabled: disabled
                                    },
	                                style: {
	                                    marginRight: '5px',
	                                },
	                                on: {
	                                    click: () => {
                                            if (row.type == 'wxpay') {
                                                this.modal1 = true;
                                            } else {
                                                this.modal2 = true;
                                            }	                                        
                                            this.id = row.id
                                            this.formData = JSON.parse(row.config); 
	                                    }
	                                }
	                            }, '修改'),
	                            h('Button', {
	                                props: {
	                                    type: bgColor,
	                                    size: 'small',

	                                },
	                                on: {
	                                    click: () => {                                            
	                                        const data ={
	                                        	id: params.row.id,
	                                        	status: !params.row.status
	                                        }
	                                        this.savePayment(data)
	                                    }
	                                }
	                            }, text)
                            ])
                        }
                    }
                ]
            }
        },
        created() {
        	this.getData()
        },
        methods: {
        	getData: function() {
        		this.$axios.getPayment().then(res => {
        			const data = res.data;
        			this.tableData = data
        		})
        	},
            // post 保存设置
        	savePayment: function(params) {
        		this.$axios.postPayment({
        			method: 'post',
        			data: params
        		}).then(res => {
        			this.$Message.success('已保存设置！')
        			this.getData()
        		})
        	},
        	open: function(params) {
        		params.forEach(select => {
        			select.status = 1 
        			const data = {
        				id: select.id,
        				status: select.status
        			};
        			this.savePayment(data)
        		})
        	},
        	off: function(params) {
        		params.forEach(select => {
        			select.status = 0 
        			const data = {
        				id: select.id,
        				status: select.status
        			};
        			this.savePayment(data)
        		})
        	},
            // 多选
        	multiple: function(multiple) {
        		this.selections = multiple;
        	},
            // 保存支付设置
            ok: function(formData) {
                const data = {
                    id: this.id,
                    config: JSON.stringify(formData)
                };
                this.savePayment(data)
            }
        }
    }
</script>

<style scoped>
	.pay-way {
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

    .tip {
        background: #dd4b39;
        padding: 10px;
        color: #fff;
        border-left: 5px solid #c23321;
        border-radius: 5px;
        font-size: 14px;
        margin-bottom: 30PX;
    }

    .tip > a {
        color: #fff;
    }

    .tip > a:hover {
        opacity: .5
    }
</style>
