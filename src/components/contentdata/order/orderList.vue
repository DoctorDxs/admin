<template>
	<section>
		<div class='order-list'>
			<h5>订单搜索</h5>
			<Form :mode="searchData" inline :label-width='20'>
				<FormItem>
                    <Select v-model="searchData.payment" style="width:200px" placeholder='所有支付方式'>
                        <Option value="所有支付方式">所有支付方式</Option>
                        <Option v-for='(item, index) in payments' :key='item.id' :value="item.name">{{item.name}}</Option>
				    </Select>
                </FormItem>
                <FormItem>
                    <Select v-model="searchData.pay" style="width:200px" placeholder='所有支付状态'>
				        <Option value="所有支付状态">所有支付状态</Option>
				        <Option value="未支付">未支付</Option>
				        <Option value="已支付">已支付</Option>
				    </Select>
                </FormItem>
                <FormItem>
                    <Select v-model="searchData.statusText" style="width:200px" placeholder='所有订单状态'>
				        <Option name='all' value="所有订单状态">所有订单状态</Option>
				        <Option value="待发货">待发货</Option>
				        <Option value="已发货">已发货</Option>
                        <Option value="已完成">已完成</Option>
                        <Option value="已取消">已取消</Option>
                        <Option value="待退款">待退款</Option>
				    </Select>
                </FormItem>
                <FormItem>
                    <Col span="12" >
			           <DatePicker v-model='searchData.date' type="daterange" confirm placement="bottom-end" placeholder="选择时间" style="width: 200px"></DatePicker>
			        </Col>
                </FormItem>
                <FormItem>
                   <Input v-model="searchData.name" placeholder="请输入订单编号"></Input>
                </FormItem>
                <FormItem>
                   <Button type="success" @click='search(searchData)'>搜索</Button>
                </FormItem>

			</Form>
		</div>
		
		<div class='order-list2'>
			<Tabs type="card" @on-click='filterData'>
		        <TabPane label="全部"></TabPane>
		        <TabPane label="待发货"></TabPane>
		        <TabPane label="已发货"></TabPane>
		        <TabPane label="已完成"></TabPane>
		        <TabPane label="已取消"></TabPane>
		        <TabPane label="待退款"></TabPane>
		        <TabPane label="已退款"></TabPane>
		    </Tabs>
		    <h5>订单管理</h5>
            <Button class='btn' @click="exportExcel(tableData)" type='success'>导出全部订单</Button>
			<Table :loading='loading' border ref="table" :data="tableData" :columns="tableColumns" stripe @on-selection-change='multiple'></Table>
            
            <div style="margin: 10px;overflow: hidden">
                <div style="float: left;">
                    <Button class='btnBottom' @click="exportExcel(selections)" type='success'>导出</Button>
                    <Button class='btnBottom' @click="paid(selections)" type='success'>已支付</Button>
                    <Button class='btnBottom' @click="cancle(selections)" type='success'>取消</Button>
                    <Button class='btnBottom' @click="complete(selections)" type='success'>完成</Button>
                    <Button class='btnBottom' @click="reimburse(selections)" type='success'>退款</Button>
                </div>
                <div style="float: right;">
                    <Page :total="total" :current="current" @on-change="changePage" :page-size='size'></Page>
                </div>
            </div>
            <Modal
                v-model="modal"
                title="订单详情"
                width="980"
                @on-ok="ok(formData)">
                <h5>基本信息</h5>
                <Table :data="tableData2" :columns="tableColumns2"></Table>
                <Table :data="tableData2" :columns="tableColumns3"></Table>
                <Table :data="tableData2" :columns="tableColumns4"></Table>
                <Table :data="tableData2" :columns="tableColumns5"></Table>
                <h5>收货人信息</h5>
                <Table :data="tableData2" :columns="tableColumns6"></Table>
                <h5>商品信息</h5>
                <div class='goodsInfo' v-for='item in tableData2[0].detailArr'>
                    <div class="imgProd">
                        <img :src="item.img" alt=""><span>{{item.name}}</span>
                    </div>
                    <p>
                        {{item.price}} * {{item.num}}
                    </p>
                </div>
                <h5>订单操作</h5>
                <div class='formData'>
                    <Form :mode="formData" :label-width='120' >
                        <FormItem label='总价格'>
                           <Input v-model="formData.totalprice" disabled></Input>
                        </FormItem>
                        <FormItem label='快递方式'>
                            <Select v-model="formData.delevel" style="width:200px" disabled>
                                <!-- <Option value="beijing">New York</Option>
                                <Option value="shanghai" disabled>London</Option>
                                <Option value="shenzhen">Sydney</Option> -->
                            </Select>
                        </FormItem>
                        <FormItem label='快递单号'>
                           <Input v-model="formData.delevelId" disabled></Input>
                        </FormItem>
                        <FormItem label='订单操作' v-model='formData.discuss'>
                            <Select style="width:200px">
                                <Option value="评价">评价</Option>
                            </Select>
                        </FormItem>
                        <FormItem label='支付操作'>
                            <Select v-model="formData.pay_status" style="width:200px;">
                                <Option value="未支付">未支付</Option>
                                <Option value="支付">支付</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </div>
            </Modal>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'orderList',
        data () {
            return {
                searchData: {},
                modal: false,
                selections: [],
                formData: {},
                payments: [],
                loading: true,
                imgHost: 'http://img1.qingful.com/',
                imgUrl: require('../../../assets/noimage.png'),
                total: 0,
                current: 1,
                size: 18,
                tableData: [],
                tableData2: [{detailArr: []}],
                tableColumns2: [
                    {title: '订单编号', key: 'orderid'},
                    {title: '实付价格', key: 'totalprice'},    
                    {title: '原价', key: 'totalprice_org'},  
                    {title: '计费'},  
                    {title: '下单时间', key: 'created_at',render: (h, params) => {return h('div', this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss'))}}
                ],
                tableColumns3: [
                    {title: '支付方式', key: 'paymentName'},
                    {
                        title: '支付状态', 
                        key: 'pay_status', 
                        render: (h, params) => {
                            const text = params.row.pay_status == 1 ? '已支付' : '未支付'
                            return h('div', text)
                        }
                    },    
                    {
                        title: '订单状态', 
                        key: 'status',
                        render: (h, params) => {
                            const status = params.row.status;
                            return h('div', [
                                h('div', this.orderStatus(status)),
                            ])
                        }
                    },  
                    {title: '订单积分', key: 'totalscore'},  
                    {title: '快递方式', key: ''}
                ],
                tableColumns4: [
                    {
                        title: '送货类型', 
                        key: 'type',
                        render: (h, params) => {
                            const text = params.row.type == 1 ? '到店自提' : '送货上门'
                            return h('div', text)
                        }
                    },
                ],
                tableColumns5: [
                    {
                        title: '订单留言', 
                        key: 'remark',
                    },
                ],
                tableColumns6: [
                    {
                        title: '联系人', 
                        key: 'username',
                        render: (h, params) => {
                            if (params.row.stores) {
                                const text = JSON.parse(params.row.stores)
                                const name = text.name
                                return h('div', [
                                    h('div', name),
                                ])
                            }
                        }
                    },
                    {
                        title: '联系方式', 
                        key: 'username',
                    },
                    {
                        title: '收货地址', 
                        key: 'address',
                        render: (h, params) => {
                            if (params.row.stores) {
                                const text = JSON.parse(params.row.stores)
                                const area = text.area
                                const address = text.address
                                return h('div', [
                                    h('div', area),
                                    h('div', address)
                                ])
                            }
                        }
                    },
                ],
                levels: [],
                tableColumns: [ 
                	{
                		type: 'selection',
                		width: 60,
                        align: 'center'
                	},           
                    {
                        title: '编号',
                        key: 'id',
                        width: 70,                  
                    },
                    {
                        title: '订单编号',
                        key: 'orderid',
                        width: 120,                  
                    },
                    {
                        title: '用户',
                        key: 'username',
                        width: 100,
                    },
                    {
                        title: '联系人',
                        key: 'username',
                        render: (h, params) => {
                            return h('div', {
                                style: {
                                    marginRight: '5px',
                                    backgroundColor: '#777',
                                    padding: '3px 5px',
                                    textAlign: 'center',
                                    borderRadius: '5px',
                                    color: '#fff'
                                },
                            }, params.row.username)
                        }
                    },
                    {
                        title: '价格',
                        key: 'totalprice',
                        width: 70
                    },
                    {
                        title: '积分',
                        key: 'totalscore',
                        width: 70
                    },
                    {
                        title: '支付方式',
                        key: 'paymentName',
                        width: 90
                    },
                    {
                        title: '支付状态',
                        key: 'pay_status',
                        width: 90,
                        render: (h, params) => {
                            const text = params.row.pay_status == 1 ? '已支付' : '未支付'
                            return h('div', text)
                        }
                    },
                    {
                        title: '订单状态',
                        key: 'status',
                        width: 110,
                        render: (h, params) => {
                            const status = params.row.status;
                            return h('div', [
                                h('div', this.orderStatus(status)),
                                // h('div', params.row.delivery_time)
                            ])
                        }
                    },
                    {
                        title: '收货时间',
                        key: 'delivery_time',
                        width: 110,
                        
                    },
                    {
                        title: '订单详情',
                        key: 'details',
                        width: 140,
                        render: (h, params) => {
                            let details = [];
                            params.row.detailArr.forEach( item => {
                                details.push(h('div', item.name + '('+ item.price + ' 元 ' + ' * ' + item.num + ')'))
                            })
                            return h('div', {
                                style: {
                                    marginRight: '5px',
                                    backgroundColor: '#3c8dbc',
                                    padding: '3px 5px',
                                    textAlign: 'center',
                                    borderRadius: '5px',
                                    color: '#fff'
                                },
                            }, details)
                        }
                    },
                    {
                        title: '下单时间',
                        key: 'created_at',
                        render: (h, params) => {

                            const created = this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss')
                            return ('div', created)
                        } 
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        width: 80,
                        render: (h, params) => {
                            const row = params.row;
                            const text = params.row.status == 0 ? '开启' : '关闭'
                            const bgColor = params.row.status == 0 ? 'success' : 'warning'
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.modal = true;
                                            params.row.status = params.row.status == 0 ? false : true
                                            params.row.pay_status = params.row.pay_status == 0 ? '未支付' : '支付'
                                            this.formData = params.row
                                            this.getProducts(params.row)
                                        }
                                    }
                                }, '详情'),
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
            getData: function(params) {
                this.$axios.getOrders(params).then(res => {
                    const data = res.data;
                    data.forEach(param => {
                        const detail = param.cartsData
                        let detailObj;
                        let detailArr = [];
                        if (detail) {
                            detailObj = JSON.parse(detail)
                            Object.keys(detailObj).forEach(item => {  
                              detailArr.push(detailObj[item])
                            });
                        } else {
                            detailArr.push({product_id: 0,name: '其他', price: 0, num: 0, score: 0})
                        }
                        param.detailArr = detailArr
                    })
                    this.getUser(data)
                });
            },
            getUser: function(params) {
                this.$axios.getUsers().then(res => {
                  const data = res.data;
                  params.forEach(param => {
                     data.forEach(item => {
                        if (param.user_id == item.id) {
                            param.username = item.username
                        }
                      })
                  }) 
                  this.getPayment(params)
                });
            },
            getPayment: function(params) {
                this.$axios.getPayment().then(res => {
                  const data = res.data;
                  let payments = [];
                  data.forEach(item => {
                        payments.push({
                            id: item.id,
                            name: item.name
                        });
                    params.forEach(param => {
                        if (param.payment_id == item.id) {
                            param.paymentName = item.name
                        }
                      })
                  }) 
                    this.payments = payments
                    this.tableData = params.slice(0,18);
                    this.allData = params
                    this.total = params.length
                    this.loading = false;
                  
                });
            },
            getProducts: function(params) {
                this.tableData2 = [{detailArr: null}];
                this.tableData2 = [params]

                let detailArr = params.detailArr
                detailArr.forEach(item => {
                    this.$axios.getProducts('&where=id,' + item.product_id).then(res => {
                        item.img = this.imgUrl
                        if (res.data.length != 0) {
                            item.img = this.imgHost + res.data[0].img
                        }
                    })
                })
                setTimeout(() => {
                    this.tableData2 = [params]
                }, 1000)
            },
            saveOrders: function(params) {
                this.$axios.postOrders({
                    method: 'post',
                    data: params
                }).then(res => {
                    this.getData()
                    this.$Message.success('处理成功！')
                })
            },
            // 导出订单
            exportExcel: function(tableData) {
                let columns = [
                    {title: '编号', key: 'id'},
                    {title: '订单编号', key: 'orderid'},
                    {title: '用户', key: 'username'},
                    {title: '联系人', key: 'username'},
                    {title: '总金额', key: 'totalprice'},
                    {title: '积分', key: 'totalscore'},
                    {title: '支付方式', key: 'paymentName'},
                    {title: '支付状态', key: 'pay_status'},
                    {title: '订单状态', key: 'status'},
                    {title: '订单详情', key: 'details'},
                    {title: '下单时间', key: 'created_at'},
                ]

                tableData.forEach(item => {
                    item.pay_status = item.status == 0 ? '未支付' : '已支付'
                    item.created_at = this.$formatDate(new Date(item.created_at), 'yyyy-MM-DD hh:mm:ss')
                    item.details = (item.ProdName || '') + '('+ (item.ProdPrice || 0) + ' 元 ' + ' * ' + (item.prodNum || 0) + ')' || 0
                    item.status = this.orderStatus(item.status)
                })

                this.$refs.table.exportCsv({
                    filename: '订单列表'+ new Date().getFullYear() + '-' + new Date().getMonth() +1 + '-' + new Date().getDate(),
                    data: tableData,
                    original: false,
                    columns: columns                    
                })
            },
            
            orderStatus: function(status) {
                let text;
                switch(true) {
                   case status == 0:
                       text = '待发货'
                       break;
                   case status == 1:
                       text = '已发货'
                       break;
                    case status == 2:
                       text = '已完成'
                       break;
                    case status == 3:
                        text = '已评价'
                        break;
                    case status == -1:
                       text = '已取消'
                       break;
                    case status == -2:
                       text = '待退款'
                       break;
                    case status == -3:
                       text = '已退款'
                };
                return text
            },
            // 已支付
            paid: function(selections) {
                selections.forEach(item => {
                    const data = {
                        id: item.id,
                        pay_status: 1
                    }
                    this.saveOrders(data)
                })
            },
            // 取消
            cancle: function(selections) {
                selections.forEach(item => {
                    const data = {
                        id: item.id,
                        status: -1
                    }
                    this.saveOrders(data)
                })
            },
            // 完成
            complete: function(selections) {
                selections.forEach(item => {
                    const data = {
                        id: item.id,
                        status: 2
                    }
                    this.saveOrders(data)
                })
            },
            // 退款
            reimburse: function(selections) {
                selections.forEach(item => {
                    const data = {
                        id: item.id,
                        status: -3
                    }
                    this.saveOrders(data)
                })
            },
            filterData: function(name) {
               switch(true) {
                   case name == 0:
                       this.getData()  //全部
                       break;
                   case name == 1:
                       this.getData('&where=status,0')  //待发货
                       break;
                    case name == 2:
                       this.getData('&where=status,1') //已发货
                       break;
                    case name == 3:
                       this.getData('&where=status,2') //已完成
                       break;
                    case name == 4:
                       this.getData('&where=status,-1') //已取消
                       break;
                    case name == 5:
                       this.getData('&where=status,-2') //待退款
                       break;
                    case name == 6:
                       this.getData('&where=status,-3') //已退款
                       break;
               }
            },
            search: function(searchData) {
                const statusText = searchData.statusText;
                const payment = searchData.payment;
                const name = searchData.name;
                let payment_id;
                let status;
                let start = searchData.date[0];
                let end = searchData.date[1];
                let searchCondition = [];
                const pay_status = searchData.pay == '未支付' ? 0 : 
                                   (searchData.pay == '已支付' ? 1 : undefined)
                if (statusText) {   
                    switch(true) {
                       case statusText == '待发货':
                           status = 0
                           break;
                       case statusText == '已发货':
                           status = '1'
                           break;
                        case statusText == '已完成':
                           status = '2'
                           break;
                        case statusText == '已评价':
                            status = '3'
                            break;
                        case statusText == '已取消':
                           status = '-1'
                           break;
                        case statusText == '待退款':
                           status = '-2'
                           break;
                        case statusText == '已退款':
                           status = '-3'
                         case statusText == '所有支付方式':
                           status = undefined
                    }
                };
                if (payment) {
                    this.payments.forEach(item => {
                        if (item.name == payment) {
                            payment_id = item.id
                        }
                    })
                };

                if (start && end) {
                    searchCondition.push('whereIn=created_at,' + start + ',' + end)
                };
                if (status != undefined ) {
                    searchCondition.push('where=status,' + status)
                };
                if (pay_status != undefined ) {
                    searchCondition.push('where=pay_status,' + pay_status)
                };
                if (payment_id != undefined ) {
                    searchCondition.push('where=payment_id,' + payment_id)
                };
                if (name != undefined ) {
                    searchCondition.push('where=orderid,' + name)
                };
                const query = searchCondition.join('&')
                this.getData('&' + query)
                
            },
            multiple: function(selections) {
                this.selections = selections
            },

            ok: function(formData) {
                const pay_status = formData.pay_status == '未支付' ? 0 : 1
                const data = {
                    id: formData.id,
                    pay_status: pay_status
                }
                this.saveOrders(data)
            },
            changePage: function(page) {
                this.tableData = this.allData.slice((page-1) * 18, page * 18)
            }
        }
    }
</script>

<style scoped>
	.order-list {
		background: #fff;
    	border-radius: 3px;	
    	border: 1px solid #d2d6de;
    	border-top: 3px solid #d2d6de;
	}

	.order-list2 {
		background: #fff;
    	border-top: 3px solid #d2d6de;
    	border-radius: 3px;	
    	padding-bottom: 15px;
    	margin-top: 20px;
	}

	h5{
	    border-bottom: 1px solid #f4f4f4;
	    padding: 5px 10px;
	    font-weight: 500;
	    font-size: 18px;
	    margin-bottom: 10px;
  	}

  	.btn {
  		margin: 0 10px 10px;
  	}

    .btnBottom {
        margin: 15px 0 0 15px;
    }

    .goodsInfo, .imgProd {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .goodsInfo img {
        height: 100px;
        width: 100px;
    }
    .goodsInfo p {
        background: #dd4b39;
        color: #fff;
        padding: 3px 8px;
        border-radius: 5px;
    }

    .goodsInfo span {
        margin-left: 30px;
        font-size: 18px;
    }

    .formData {
        padding-bottom: 50px;
    }

</style>
