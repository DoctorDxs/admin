<template>
	<section class="set-address">
		<h5>地址管理</h5>
		<div class='emial'>
            <Tabs type="card" @on-click='getName' :animated='false'>
                <TabPane label="国家管理" name='0'>
                    <Button class='add' @click="modal1 = true" type='primary'>新增国家</Button>
                    <Modal
                        v-model="modal1"
                        title="新增/修改国家"
                        @on-ok="okCountry(formData)"
                        @on-cancel="cancel">
                        <Form :model="formData">
                            <FormItem label="国家" :label-width='60'>
                                <Input type="text" v-model="formData.name"></Input>
                            </FormItem>
                            
                        </Form>
                    </Modal>
                    <Table border ref="selection" :data="country" :columns="tableColumns1" stripe @on-selection-change='multiple' ></Table>
                    <Button class='btn' @click="open(selections)" type='success'>开启</Button>
                    <Button class='btn' @click="off(selections)" type='warning'>关闭</Button>
                </TabPane>
                <TabPane label="省份管理" name='1'>
                    <Button class='add' @click="modal2 = true" type='primary'>新增省份</Button>
                    <Modal
                        v-model="modal2"
                        title="新增/修改省份"
                        @on-ok="okProvience(formData2)"
                        @on-cancel="cancel">
                        <Form :model="formData2" :label-width='60'>
                            <FormItem label="国家">
                                <Select v-model="formData2.country.name" placeholder='选择国家' >
                                    <Option v-for='(item, index) in country' :key='item.id' :value="item.name">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="省份">
                                <Input type="text" v-model="formData2.name"></Input>
                            </FormItem>
                        </Form>
                    </Modal>
                    <Table border ref="selection" :data="provience" :columns="tableColumns2" stripe @on-selection-change='multiple' ></Table>
                    <Button class='btn' @click="open(selections)" type='success'>开启</Button>
                    <Button class='btn' @click="off(selections)" type='warning'>关闭</Button>
                </TabPane>
                <TabPane label="城市管理" name='2'>
                    <Button class='add' @click="modal3 = true" type='primary'>新增城市</Button>
                    <Modal
                        v-model="modal3"
                        title="新增/修改城市"
                        @on-ok="okCity(formData3)"
                        @on-cancel="cancel">
                        <Form :model="formData3" :label-width='60'>
                            <FormItem label="省份">
                                <Select v-model="formData3.provience.name" placeholder='选择省份' >
                                    <Option v-for='(item, index) in provience' :key='item.id' :value="item.name">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="城市">
                                <Input type="text" v-model="formData3.name"></Input>
                            </FormItem>
                        </Form>
                    </Modal>
                    <Table border ref="selection" :data="city" :columns="tableColumns3" stripe @on-selection-change='multiple' ></Table>
                    <Button class='btn' @click="open(selections)" type='success'>开启</Button>
                    <Button class='btn' @click="off(selections)" type='warning'>关闭</Button>
                </TabPane>
                <TabPane label="区域管理" name='3'>
                    <Button class='add' @click="modal4 = true" type='primary'>新增区域</Button>
                    <Modal
                        v-model="modal4"
                        title="新增/修改城市"
                        @on-ok="okArea(formData4)"
                        @on-cancel="cancel">
                        <Form :model="formData4" :label-width='60'>
                            <FormItem label="城市">
                                <Select v-model="formData4.city.name" placeholder='选择城市' >
                                    <Option v-for='(item, index) in city' :key='item.id' :value="item.name">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="区域">
                                <Input type="text" v-model="formData4.name"></Input>
                            </FormItem>
                        </Form>
                    </Modal>
                    <Table border ref="selection" :data="area" :columns="tableColumns4" stripe @on-selection-change='multiple' ></Table>
                    <Button class='btn' @click="open(selections)" type='success'>开启</Button>
                    <Button class='btn' @click="off(selections)" type='warning'>关闭</Button>
                </TabPane>
            </Tabs>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'setAddress',
        data () {
            return {
                tableData: [],
                formData: {},
                formData2: {
                    country: {
                        name: ''
                    }
                },
                formData3: {
                    provience: {
                        name: ''
                    }
                },
                formData4: {
                    city: {
                        name: ''
                    }
                },

                modal1: false,
                modal2: false,
                modal3: false,
                modal4: false,
                selections: [],
                country: [],
                provience: [],
                city: [],
                area: [],
                tableColumns1: [ 
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
                        title: '国家',
                        key: 'name',
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
                                            this.modal1 = true
                                            this.formData = params.row
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
                                            const data = {
                                                id: row.id,
                                                status: !row.status
                                            };
                                            this.saveLocaltion(data)
                                        }
                                    }
                                }, text)
                            ])
                        }
                    }
                ],
                tableColumns2: [ 
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',                
                    },           
                    {
                        title: '编号',
                        key: 'id',
                        width: 100,                   
                    },
                    {
                        title: '省份',
                        key: 'name',
                    },
                    {
                        title: '国家',
                        key: 'countryName',
                        render: (h, params) => {
                            const pid = params.row.pid;
                            const country = this.country;
                            let countryName;
                            country.forEach(item => {
                                if (item.id == pid) {
                                    countryName = item.name
                                    params.row.country = item
                                }
                            })

                            return h('div', countryName)
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
                                            this.modal2 = true
                                            this.formData2 = params.row
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
                                            const data = {
                                                id: row.id,
                                                status: !row.status
                                            };
                                            this.saveLocaltion(data)
                                        }
                                    }
                                }, text)
                            ])
                        }
                    }
                ],
                tableColumns3: [ 
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',                
                    },           
                    {
                        title: '编号',
                        key: 'id',
                        width: 100,                   
                    },
                    {
                        title: '城市',
                        key: 'name',
                    },
                    {
                        title: '省份',
                        key: 'provienceName',
                        render: (h, params) => {
                            const pid = params.row.pid;
                            const provience = this.provience;
                            let provienceName;
                            provience.forEach(item => {
                                if (item.id == pid) {
                                    provienceName = item.name
                                    params.row.provience = item
                                }
                            })

                            return h('div', provienceName)
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
                                            this.modal3 = true
                                            this.formData3 = params.row
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
                                            const data = {
                                                id: row.id,
                                                status: !row.status
                                            };
                                            this.saveLocaltion(data)
                                        }
                                    }
                                }, text)
                            ])
                        }
                    }
                ],
                tableColumns4: [ 
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',                
                    },           
                    {
                        title: '编号',
                        key: 'id',
                        width: 100,                   
                    },
                    {
                        title: '区域',
                        key: 'name',
                    },
                    {
                        title: '省份',
                        key: 'cityName',
                        render: (h, params) => {
                            const pid = params.row.pid;
                            const city = this.city;
                            let cityName;
                            city.forEach(item => {
                                if (item.id == pid) {
                                    cityName = item.name
                                    params.row.city = item
                                }
                            })

                            return h('div', cityName)
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
                                            this.modal4 = true
                                            this.formData4 = params.row
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
                                            const data = {
                                                id: row.id,
                                                status: !row.status
                                            };
                                            this.saveLocaltion(data)
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
        		this.$axios.getLocaltion().then(res => {
        			const data = res.data;
                    let country = [], provience = [], city = [], area = [];
                    data.forEach(item => {
                        if(item.type == 0) {
                            country.push(item)
                        };
                        if(item.type == 1) {
                           provience.push(item)
                        };
                        if(item.type == 2)  {
                            city.push(item)
                        };
                        if(item.type == 3) {
                            area.push(item)
                        }
                    })
                    this.country = country
                    this.provience = provience
                    this.city = city
                    this.area = area
        		})
        	},
        	saveLocaltion: function(params) {
        		this.$axios.postLocaltion({
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
        			this.saveLocaltion(data)
        		})
        	},
        	off: function(params) {
        		params.forEach(select => {
        			select.status = 0 
        			const data = {
        				id: select.id,
        				status: select.status
        			};
        			this.saveLocaltion(data)
        		})
        	},
        	multiple: function(multiple) {
        		this.selections = multiple;
        	},
            getName: function(name) {
                this.getData(name)
            },
            filter: function(name, data) {
                if (name == 0) this.country = data;
                if (name == 1) {
                    this.provience = data
                    
                }

            },

            okCountry: function(formData) {
                const data = {
                    id: formData.id || 0,
                    name: formData.name,
                    type: 0
                }
                this.saveLocaltion(data)
            },

            okProvience: function(formData) {
                const countryName = formData.country.name;
                const country = this.country;
                let pid;
                country.forEach(item => {
                    if (item.name == countryName) {
                        pid = item.id
                    }
                })
                const data = {
                    id: formData.id,
                    name: formData.name,
                    type: 1,
                    pid: pid 
                };
                this.saveLocaltion(data)
            },
            okCity: function(formData) {
                const provienceName = formData.provience.name;
                const provience = this.provience;
                let pid;
                provience.forEach(item => {
                    if (item.name == provienceName) {
                        pid = item.id
                    }
                })

                const data = {
                    id: formData.id,
                    name: formData.name,
                    type: 2,
                    pid: pid
                };
                this.saveLocaltion(data)
            },

            okArea: function(formData) {
                const cityName = formData.city.name;
                const city = this.city;
                let pid;
                city.forEach(item => {
                    if (item.name == cityName) {
                        pid = item.id
                    }
                })

                const data = {
                    id: formData.id,
                    name: formData.name,
                    type: 3,
                    pid: pid
                };
                this.saveLocaltion(data)
            },
            cancel: function() {
                this.formData = {}
            }

        }
    }
</script>

<style scoped>
	.set-address {
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

    .add {
        margin: 0 15px 10px;
    }
</style>
