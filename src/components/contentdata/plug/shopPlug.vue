<template>
	<section>
		<div class="shop-plug">
			<div class='innerContaint'>
                <div class="header">
                    <h4>应用类别</h4>
                    <div>
                        <img src="http://addon.wemallshop.com/public/uploads/20170417/bb832197b06ca47b2fc2bd8044faf6fa.png" alt="">
                        <p>插件</p>
                    </div>
                </div>
                <div class="plugs">
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170419/3f984598040c85d9d25791e9bfd69134.png" alt="">
                        <div>
                            <p>微投票</p>
                            <span>参与投票、增加互动，让营销更有趣</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170418/fbd2fb46840513f698d6d5780a341aa1.png" alt="">
                        <div>
                            <p>大转盘</p>
                            <span>转盘抽奖，让粉丝爱不释手</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170418/fb4785013888e71844d2ca82a7a855a9.jpg" alt="">
                        <div>
                            <p>会员卡</p>
                            <span>注册即送会员卡，会员服务享不停</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170418/166afd04429af25722c9d530350ecb82.png" alt="">
                        <div>
                            <p>签到</p>
                            <span>签到送积分赢好礼</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170418/001353352b786be94ccd5e05969c1a11.png" alt="">
                        <div>
                            <p>优惠卷</p>
                            <span>最直接简单的方式，帮你带来满满的粉丝</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170418/25a467eb9363070256a07e1d1bde11a2.png" alt="">
                        <div>
                            <p>门店</p>
                            <span>自提点设置</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170418/e0364a3e669123dcd9ab7c4cf6bcbaaf.png" alt="">
                        <div>
                            <p>配送时间</p>
                            <span>自由设置配送时间</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170420/00140874129aea5c40d7315df07076a0.png" alt="">
                        <div>
                            <p>数据迁移</p>
                            <span>最直接简单的方式帮您迁移数据</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170420/15141176e22dbe49dda1cf33ecc45720.png" alt="">
                        <div>
                            <p>微预约</p>
                            <span>轻松预约各种项目，多种新功能升级</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170424/82275f1077a6bd1be49765b919078bff.png" alt="">
                        <div>
                            <p>微信现金红包</p>
                            <span>微信现金红包，最简单暴力的方式吸引用户</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170424/d250b6305e37b2a1611eab5b289bb968.png" alt="">
                        <div>
                            <p>普通红包</p>
                            <span>商家红包</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170425/03569de8326b702be42987d415198f96.png" alt="">
                        <div>
                            <p>微渠道</p>
                            <span>微渠道，统计流量来源</span>
                        </div>
                    </div>
                    <div class="plug">
                        <img src="http://addon.wemallshop.com/public/uploads/20170427/86af30b27701715bc6cc84be2f6371b1.png" alt="">
                        <div>
                            <p>微助力</p>
                            <span>分享助力</span>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</section>
</template>
<script>
    export default {
    	name: 'shopPlug',
        data () {
            return {
            	formData: {},
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
	.shop-plug {
		background: #fff;
    	padding-bottom: 15px;
        
	}

    .shop-plug:after {
        content: " ";
        display: block;
        clear: both;
        height: 0;
    }

    h4 {
        width: 200px;
        font-size: 22px;
        font-weight: 400;
        border-bottom: 1px solid #ddd;
        text-align: center;
        padding: 15px 0;
        margin-top: 20px;
    }
	
  	.shop-plug-detail {
  		width: 80%;
  		margin: 20px auto;
  	}

    .innerContaint {
        width: 980px;
        margin: 0 auto;
    }

    .header {
        float: left;
    }

    .header div {
        display: flex;
        flex-direction: row;
        margin-top: 40px;
        color: red;
    }

    .header div img{
        margin-right: 18px;
        width: 21px;
        height: 18px;
        margin-left: 60px;
    }

    .plugs {
        float: right;
        margin-top: 100px;
        width: 720px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .plugs img {
        width: 60px;
        height: 60px;
    }

    .plug {
        display: flex;
        flex-direction: row;
        width: 200px;
        height: 116px;
    }

    .plug div {
        margin-left: 10px;
    }

    .plug div span {
        font-size: 12px;
        color: #afafaf;
    }
	
</style>
