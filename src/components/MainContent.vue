<template>
  <section class="main-content">
    <div class="content-view">
      <component :is="currentView"></component>
    </div>
    <Footer-Info></Footer-Info>
  </section>
</template>

<script>
import FooterInfo from '@/components/FooterInfo'
// home
import index from '@/components/contentdata/home/index'
import userAnalysis from '@/components/contentdata/home/userAnalysis'
import goodsAnalysis from '@/components/contentdata/home/goodsAnalysis'
import orderAnalysis from '@/components/contentdata/home/orderAnalysis'
// settings
import settingShop from '@/components/contentdata/settings/setShop'
import payWay from '@/components/contentdata/settings/payWay'
import delivery from '@/components/contentdata/settings/delivery'
import setAddress from '@/components/contentdata/settings/setAddress'
import setMsg from '@/components/contentdata/settings/setMsg'
import setEmail from '@/components/contentdata/settings/setEmail'
// wxSet
import wxSet from '@/components/contentdata/wxset/wxSet'
import wxMenu from '@/components/contentdata/wxset/wxMenu'
import wxReply from '@/components/contentdata/wxset/wxReply'
import wxMsg from '@/components/contentdata/wxset/wxMsg'
import wxCustomer from '@/components/contentdata/wxset/wxCustomer'
import wxPrint from '@/components/contentdata//wxset/wxPrint'
// content
import contentClass from '@/components/contentdata/content/contentClass'
import contentList from '@/components/contentdata/content/contentList'
import adsPosition from '@/components/contentdata/content/adsPosition'
import adsList from '@/components/contentdata/content/adsList'
// shop
import shopMenu from '@/components/contentdata/shop/shopMenu'
import tag from '@/components/contentdata/shop/tag'
import sku from '@/components/contentdata/shop/sku'
import goods from '@/components/contentdata/shop/goods'
import comment from '@/components/contentdata/shop/comment'
import feedback from '@/components/contentdata/shop/feedback'
// order
import orderList from '@/components/contentdata/order/orderList'
import registration from '@/components/contentdata/order/registration'
import type from '@/components/contentdata/order/type'
import orderPaid from '@/components/contentdata/order/orderPaid'

// graph
import finance from '@/components/contentdata/graph/finance'
import payRecord from '@/components/contentdata/graph/payRecord'
// user
import adminUser from '@/components/contentdata/user/adminUser'
import adminList from '@/components/contentdata/user/adminList'
import userList from '@/components/contentdata/user/userList'
import userMsg from '@/components/contentdata/user/userMsg'
import withdraw from '@/components/contentdata/user/withdraw'
import vipLevel from '@/components/contentdata/user/vipLevel'
// module
import moduleSet from '@/components/contentdata/module/moduleSet'
// import moduleEmail from '@/components/contentdata/module/moduleEmail'
// import moduleMsg from '@/components/contentdata/module/moduleMsg'
import cost from '@/components/contentdata/module/cost'
// plug
import plugSet from '@/components/contentdata/plug/plugSet'
import shopPlug from '@/components/contentdata/plug/shopPlug'
// // help
import help from '@/components/contentdata/help/help'


export default {
  name: 'MainContent',
  data() {
        return {
            currentView: '',
        };
    },

    computed: {
        
    },

    methods: {
      
    },

    created() {
      this.currentView = this.$route.path.split('/')[3];
    },

    watch: {
      '$route' (to, from) {
        const title = to.path.split('/')[3];
        this.currentView = title
      }
    },
    components: {
      FooterInfo,
      index,
      userAnalysis,
      goodsAnalysis,
      orderAnalysis,
      settingShop,
      payWay,
      delivery,
      setAddress,
      setMsg,
      setEmail,
      wxSet,
      wxMenu,
      wxReply,
      wxMsg,
      wxCustomer,
      wxPrint,
      contentClass,
      contentList,
      adsPosition,
      adsList,
      shopMenu,
      tag,
      sku,
      goods,
      comment,
      feedback,
      orderList,
      registration,
      type,
      orderPaid,
      finance,
      payRecord,
      adminUser,
      adminList,
      userList,
      userMsg,
      withdraw,
      vipLevel,
      moduleSet,
      //moduleEmail,
      //moduleMsg,
      cost,
      plugSet,
      shopPlug,
      help
    }
}
</script>

<style scoped>
.main-content {
  position: absolute;
  width: calc(100% - 200px);
  min-width: 800px;
  top: 50px;
  left: 200px;
  font-size: 16px; 
  background: #ECF0F5;
}

.content-view {
  min-height: 720px;
  padding: 15px;
}

</style>
