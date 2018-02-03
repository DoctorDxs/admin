<template>
	<section class="registration">
		<h5>商品管理</h5>
		<div class='emial'>
			<Table border :data="tableData" :columns="tableColumns" stripe></Table>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'registration',
        data () {
            return {
                tableData: [],
                imgurl: require('../../../assets/noimage.png'),
                imgHost: 'http://img1.qingful.com/',
                tableColumns: [ 
                	          
                    {
                        title: '编号',
                        key: 'id',
                        width: 100,                  
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 280,
                        render: (h, params) => {
                            let img
                            if (params.row.img) {
                                img = this.imgHost + params.row.img
                            } else {
                                img = this.imgUrl
                            }
                            return h('div', {
                            	attrs: {
                            		style: 'display:flex;flex-direction:row;align-items: center;'
                            	}
                            }, [
                            	h('img', {
                            		attrs: {
                            			src: img,
                            			style: 'width:60px;height:60px;padding:5px;'
                            		},                      
                            	}),
                            	h('div', [
                            		h('p', {
                            			attrs: {                    
                            				style: 'border-radius:30px;padding:2px 5px;font-weight:500;font-size:14px;'
                            			},                      
                            		}, params.row.name),
                            		h('p', {
                            			attrs: {                    
                            				style: 'border-radius:30px;padding:2px 5px;color:red;'
                            			},                      
                            		}, params.row.skuname),
                            	])
                            	
                            ])
                        }
                    },
                    {
                        title: '售价',
                        key: 'price',
                        render: (h, params) => {
                            return h('div', '￥' + params.row.price);
                        }
                    },
                    {
                        title: '原价',
                        key: 'old_price',
                        render: (h, params) => {
                            return h('div', {
                            	attrs:{
                            		style: 'color:red;text-decoration:line-through'
                            	}
                            }, '￥' + params.row.old_price);
                        }
                    },
                    {
                        title: '库存',
                        key: 'store',
                    },
                    {
                        title: '销量',
                        key: 'sales',
                    },
                    
                    
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('Button', {
                                
                            }, '缺货');
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
	                                        this.$router.push({name: 'goods', params: {id: params.row.id}})
	                                    }
	                                }
	                            }, '补货')  
	                            
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
                this.$axios.getProducts('&where=store,0').then(res => {
                  const data = res.data;
                  console.log(data)
                  this.getSku(data)
                });
            },
            
            getSku: function(params) {
                this.$axios.getSku().then(res => {
                    const data = res.data;
                    params.forEach(param => {
                        if (param.sku) {
                            let skuname = []
                            let skus = param.sku.split(',');
                            skus.forEach(skuId => {
                                data.forEach(item => {
                                    if (item.id == skuId) {
                                        skuname.push(item.text)
                                    }
                                })
                            }) 
                            param.skuname = skuname.join(' ')
                        }
                    });
                    this.tableData = params;
                })
            },
            
        }
    }
</script>

<style scoped>
	.registration {
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
