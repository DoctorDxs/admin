<template>
	<section class="feedback">
		<h5>反馈管理</h5>
		<div class='emial'>
			<Table border ref="selection" :data="tableData" :columns="tableColumns" stripe></Table>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'feedback',
        data () {
            return {
                tableData: [],
                tableColumns: [ 
                    {
                        title: '编号',
                        key: 'id',
                        width: 100,                  
                    },
                   
                    {
                        title: '用户名',
                        key: 'username',
                    },
                    {
                        title: '反馈',
                        key: 'value',
                    },
                    {
                        title: '时间',
                        key: 'created_at',
                        render: (h, params) => {
                            const created = this.$formatDate(new Date(params.row.created_at), 'yyyy-MM-DD hh:mm:ss')
                            return ('div', created)
                        } 
                    },
                ]
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData: function() {
                this.$axios.getFeedback().then(res => {
                  const data = res.data;
                  this.getUser(data)
                });
            },
            getUser: function(params) {
                this.$axios.getUsers().then(res => {
                    const data = res.data;
                    data.forEach(item => {
                        params.forEach(param => {
                        if (item.id == param.user_id)
                            param.username = item.username
                        })
                    })
                    this.tableData = params
                })
            },
        }
    }
</script>

<style scoped>
	.feedback {
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
