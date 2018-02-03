<template>
	<section class="module-email">
		<h5>邮件模版</h5>
		<div class='emial'>
			<Table border ref="selection" :data="tableData1" :columns="tableColumns1" stripe></Table>
			<Button class='btn' @click="open(true)" type='success'>开启</Button>
        	<Button class='btn' @click="off(false)" type='warning'>关闭</Button>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'moduleEmail',
        data () {
            return {
                tableData1: this.mockTableData1(),
                tableColumns1: [
                    {               
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        key: 'id',
                        width: 100,                  
                        render: (h, params) => {
                        	return h('div', 123)
                        }
                    },
                    {
                        title: '邮件类型',
                        key: 'type',
                        width: 150,
                        render: (h, params) => {
                            return h('div', '注册模版');
                        }
                    },
                    {
                        title: '模版内容',
                        key: 'content',
                        render: (h, params) => {
                            return h('div', '您好，欢迎您注册wemallshop微信商城，您的验证码是：$code');
                        }
                    },
                    {
                        title: '测试邮箱',
                        key: 'email',
                        width: 200,
                        render: (h, params) => {
                            return h('div', '1604583867@qq.com');
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 100,
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
                            return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'primary',
	                                    size: 'small'
	                                },
	                                style: {
	                                    marginRight: '5px'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.show(params.index)
	                                    }
	                                }
	                            }, '编辑'),
	                            h('Button', {
	                                props: {
	                                    type: 'warning',
	                                    size: 'small'
	                                },
	                                style: {
	                                    marginRight: '5px'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.remove(params.index)
	                                    }
	                                }
	                            }, '关闭'),
	                            h('Button', {
	                                props: {
	                                    type: 'error',
	                                    size: 'small'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.remove(params.index)
	                                    }
	                                }
	                            }, '发一封测试')
                            ])
                        }
                    }
                ]
            }
        },
        methods: {
            mockTableData1 () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        name: 'Business' + Math.floor(Math.random () * 100 + 1),
                        id: Math.floor(Math.random () * 3 + 1),
                        type: ['City', 'content', 'Cost', 'Life', 'Entertainment'],
                        content: [
                            {
                                n: 'content' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: 'content' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: 'content' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            }
                        ],
                        email: Math.floor(Math.random () * 7 + 1),
                        status: new Date()
                    })
                }
                return data;
            },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.tableData1 = this.mockTableData1();
            }
        }
    }
</script>

<style scoped>
	.module-email {
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
</style>
