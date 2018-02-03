import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/pages/index";
import Login from '@/pages/login'
import AsideList from '@/components/AsideList'
import MainContent from '@/components/MainContent'
import Article from '@/pages/article'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/admin',
      redirect: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/admin/home/index',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Home,
      children: [
        {
          path: 'home/index',
          name: 'index',
          component: AsideList
        },
        {
          path: 'home/userAnalysis',
          name: 'userAnalysis',
          component: AsideList
        },
        {
          path: 'home/orderAnalysis',
          name: 'orderAnalysis',
          component: AsideList
        },
        {
          path: 'home/goodsAnalysis',
          name: 'goodsAnalysis',
          component: AsideList
        },
        {
          path: 'settings/settingShop',
          name: 'settingShop',
          component: AsideList
        },
        {
          path: 'settings/payWay',
          name: 'payWay',
          component: AsideList
        },
        {
          path: 'settings/delivery',
          name: 'delivery',
          component: AsideList
        },
        {
          path: 'settings/setAddress',
          name: 'setAddress',
          component: AsideList
        },
        {
          path: 'settings/setMsg',
          name: 'setMsg',
          component: AsideList
        },
        {
          path: 'settings/setEmail',
          name: 'setEmail',
          component: AsideList
        },
        {
          path: 'wx_config/wxSet',
          name: 'wxSet',
          component: AsideList
        },
        {
          path: 'wx_config/wxMenu',
          name: 'wxMenu',
          component: AsideList
        },
        {
          path: 'wx_config/wxReply',
          name: 'wxReply',
          component: AsideList
        },
        {
          path: 'wx_config/wxMsg',
          name: 'wxMsg',
          component: AsideList
        },
        {
          path: 'wx_config/wxCustomer',
          name: 'wxCustomer',
          component: AsideList
        },
        {
          path: 'wx_config/wxPrint',
          name: 'wxPrint',
          component: AsideList
        },
        {
          path: 'content/contentClass',
          name: 'contentClass',
          component: AsideList
        },
        {
          path: 'content/contentList',
          name: 'contentList',
          component: AsideList
        },
        {
          path: 'content/adsPosition',
          name: 'adsPosition',
          component: AsideList
        },
        {
          path: 'content/adsList',
          name: 'adsList',
          component: AsideList
        },

        {
          path: 'shop/shopMenu',
          name: 'shopMenu',
          component: AsideList
        },
        {
          path: 'shop/tag',
          name: 'tag',
          component: AsideList
        },
        {
          path: 'shop/sku',
          name: 'sku',
          component: AsideList
        },
        {
          path: 'shop/goods',
          name: 'goods',
          component: AsideList
        },
        {
          path: 'shop/comment',
          name: 'comment',
          component: AsideList
        },
        {
          path: 'shop/feedback',
          name: 'feedback',
          component: AsideList
        },
        {
          path: 'order/orderList',
          name: 'orderList',
          component: AsideList
        },
        {
          path: 'order/registration',
          name: 'registration',
          component: AsideList
        },
        {
          path: 'order/type',
          name: 'type',
          component: AsideList
        },
        {
          path: 'order/orderPaid',
          name: 'orderPaid',
          component: AsideList
        },
        {
          path: 'graph/finance',
          name: 'finance',
          component: AsideList
        },
        {
          path: 'graph/payRecord',
          name: 'payRecord',
          component: AsideList
        },
        {
          path: 'user/adminUser',
          name: 'adminUser',
          component: AsideList
        },
        {
          path: 'user/adminList',
          name: 'adminList',
          component: AsideList
        },
        {
          path: 'user/userList',
          name: 'userList',
          component: AsideList
        },
        {
          path: 'user/userMsg',
          name: 'userMsg',
          component: AsideList
        },
        {
          path: 'user/withdraw',
          name: 'withdraw',
          component: AsideList
        },
        {
          path: 'user/vipLevel',
          name: 'vipLevel',
          component: AsideList
        },
        {
          path: 'module/moduleSet',
          name: 'moduleSet',
          component: AsideList
        },
        {
          path: 'module/moduleEmail',
          name: 'moduleEmail',
          component: AsideList
        },
        {
          path: 'module/moduleMsg',
          name: 'moduleMsg',
          component: AsideList
        },

        {
          path: 'module/cost',
          name: 'cost',
          component: AsideList
        },

        {
          path: 'plug/plugSet',
          name: 'plugSet',
          component: AsideList
        },
        {
          path: 'plug/shopPlug',
          name: 'shopPlug',
          component: AsideList
        },
        {
          path: 'help/help',
          name: 'help',
          component: AsideList
        }
      ]
    }
  ]
})
