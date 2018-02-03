<template>
	<section class="plugSet">
		<div class='plugList'>
			<h5>插件列表</h5>
			<ul>
				<li v-for='list in data'>{{list}}</li>
			</ul>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'plugSet',
		data() {
			return {
				data: ['公共插件', '水果版插件']
			}
		}
	}
</script>


<style scoped>
	.plugList {
		background: #fff;
    	border-top: 3px solid #d2d6de;
    	border-radius: 3px;
	}

	h5{
	    border: 1px solid #f4f4f4;
	    border-bottom: 1px solid #f4f4f4;
	    padding: 5px 10px;
	    font-weight: 500;
	    font-size: 18px;
  	}

  	li {
  		padding: 5px 10px;
  		font-size: 16px;
  		border-bottom: 1px solid #f4f4f4;
  		transition: background-color .2s ease-in-out;
  	}

  	li:hover {
  		background: rgba(29, 96, 213, .1);
  	}
</style>