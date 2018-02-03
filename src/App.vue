<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  	name: 'app',
  	created() {
  		const username = localStorage.getItem("username");
  	},
  	watch: {
    	'$route':function(to,from){
        	document.body.scrollTop = '0';
        	document.documentElement.scrollTop = 0; 
    	}
	}
}
</script>

<style>
	*{
	  padding: 0;
	  margin: 0;
	}

	body {
		font-family: -apple-system,BlinkMacSystemFont,"SF Pro SC","SF Pro Text","Helvetica Neue",Helvetica,"PingFang SC","Segoe UI",Roboto,"Hiragino Sans GB",'arial','microsoft yahei ui',"Microsoft YaHei",SimSun,sans-serif;
	}

	.part1 {
	    display: flex;
	    flex-direction: row;
	    justify-content: space-between;
  	}

  	.part1 > div {
  		width: 23%;
  		height: 120px;
  		display: flex;
  		flex-direction: row;
  		justify-content: space-between;
  		position: relative;
  	}

	.col1 {
		background-color: #00c0ef ;
	}

	.col2 {
	    background-color: #00a65a
	}

	.col3 {
		background-color: #f39c12
	}

	.col4 {
		background-color: #dd4b39
	}

	.part1 .more {
		position: absolute;
		width: 100%;
		text-align: center;
		bottom: 0;
		height: 25px;
		font-size: 14px;
		background: rgba(0, 0, 0, .1);
		color: rgba(255, 255, 255, .8);
		cursor:pointer;
		line-height: 25px;
	}
	
	.part1 .more a {
		color: rgba(255, 255, 255, .8);
	}

	.part1 .more a:hover {
		color: rgba(255, 255, 255, .9);
	}



	.part1 .more:hover {
		background: rgba(0, 0, 0, .2);
		color: rgba(255, 255, 255, .9);
	}
	
	.vicon {
		font-size: 90px;
		transition: all .3s linear;
		color: rgba(0, 0, 0, 0.15);
		padding: 5px 10px;
	}
	
	.part1 > div:hover .vicon{
		transform: scale(1.08);
	}

	.num {
		font-weight: 600;
		color: #fff;
		padding: 0 0 0 10px;
		font-size: 36px;
	}

	.col-title {
		padding-left: 10px;
		color: #fff;
	}

	.ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
		border-radius: 0;
	}
	
	.ql-editor {
		min-height: 300px;
	}

	.ql-container {
		min-height: 300px;
	}

	.ql-snow .ql-picker {
		height: 35px;
		line-height: 35px;
	}

	.ivu-select-dropdown {
		top: 47px!important;
	}

	.ivu-form-item-label{
		font-weight: 600;
		font-size: 14px!important;
	}

	.quill-code {
		display: none;
	}

</style>
