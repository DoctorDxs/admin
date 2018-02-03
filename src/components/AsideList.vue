<template>
  <section class="right-main">
    <Header-Nav :navs='navs'></Header-Nav>
    <div class="aside-list">
      <div class="title">
        <a href="#">{{title}}</a>
      </div>
      <Menu :theme="theme2" :active-name="listIndex" mode="vertical" style='width: 90px;' @on-select="getContent">
        <div v-for='(val, key) in navs'>
           <MenuItem :name="key">
              {{val}}
          </MenuItem>
        </div>
      </Menu>
    </div>
    <Main-Content></Main-Content>
  </section>
</template>

<script>

import MainContent from '@/components/MainContent'
import HeaderNav from '@/components/HeaderNav'

export default {
  name: 'AsideList',
  data() {
        return {
            theme2: 'light',
            navLists: {
              home: {index:'系统首页', userAnalysis: '用户分析', orderAnalysis: '订单分析', goodsAnalysis: '商品分析'},
              settings: {settingShop: '商城设置', payWay: '支付方式', delivery: '快递管理', setAddress: '地址设置', setMsg: '短信配置', setEmail: '邮件配置'},
              wx_config: {wxSet: '微信配置', wxMenu: '微信菜单', wxReply: '自定义回复', wxMsg: '模版消息', wxCustomer: '多客服设置', wxPrint: '微信打印机'},
              content: {contentClass: '文章分类', contentList: '文章列表', adsPosition: '广告位置', adsList: '广告列表'},
              shop: {shopMenu: '菜单管理', tag: '标签管理', sku: 'sku管理', goods: '商品管理', comment: '用户评论', feedback: '反馈管理'},
              order: {orderList: '订单列表', registration: '缺货登记', type: '售后类型', orderPaid: '售后列表'},
              graph: {finance: '财务明细', payRecord: '充值记录'},
              user: {adminUser: '管理员组', adminList: '管理员列表', userList: '用户列表', vipLevel: '会员等级', userMsg: '消息中心', withdraw: '提现管理'},
              module: {moduleSet: '模版设置',
                  //moduleEmail: '邮件模版', moduleMsg: '短信模版', 
                  cost: '费用模版'
                },
              plug: {plugSet: '插件管理', shopPlug: '插件商店'},
              help: {help: '使用帮助'}
            },
            navs: {},
            title: '',  
            listIndex: ''
        };
    },

    created() {
      const title = this.$route.path.split('/')[2];
      const listIndex = this.$route.path.split('/')[3];
      this.listIndex = listIndex;
      this.updataNavList(title);
    },

    methods: {
      getContent: function(name) {
        this.$router.push('/admin/' + this.routeName +'/' + name);
      },

      updataNavList: function(title) {
        for (let listname in this.navLists) {
          if (title === listname) {
            this.navs = this.navLists[listname]
            this.escape(title)
            this.routeName = title
          }
        }
      },
      escape: function(title) {
        switch(true) {
          case (title === 'home'):
            this.title = '首页';
            break;
          case (title === 'settings'):
            this.title = '设置'
            break;
          case (title === 'wx_config'):
            this.title = '微信'
            break;
          case (title === 'content'):
            this.title = '内容'
            break;
          case (title === 'shop'):
            this.title = '商城'
            break;
          case (title === 'order'):
            this.title = '订单'
            break;
          case (title === 'graph'):
            this.title = '报表'
            break;
          case (title === 'user'):
            this.title = '用户'
            break;
          case (title === 'module'):
            this.title = '模版'
            break;
          case (title === 'plug'):
            this.title = '插件'
            break;
          case (title === 'help'):
            this.title = '帮助'
            break;
        }
      }
    },

    watch: {
      '$route' (to, from) {
        const title = to.path.split('/')[2];
        const listIndex = to.path.split('/')[3]; 
        this.listIndex = listIndex
        this.updataNavList(title);
      }
    },

    components: {
      MainContent,
      HeaderNav
    }
}
</script>

<style>
.right-main{
  position: relative;

}
.aside-list {
  left: 90px;
  position: fixed;
  height: 100%;
  width: 110px;
  background: #fff;
  font-size: 14px;
  text-align: center;
  top: 0;
}

.aside-list .ivu-menu-vertical .ivu-menu-item {
  padding: 5px 0;
  margin: 10px 0 10px 10px; 
}

.aside-list .ivu-menu-vertical .ivu-menu-item:hover {
  color: #1a1;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #777;
  font-weight: 600;
  font-size: 16px;
  border-right: 0;
  background: #f5f5f5;
}


.ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
  background: #fff;
  color: #aaa;
  border: 0;
}

.ivu-menu-vertical.ivu-menu-light:after {
  width: 0;
}

.ivu-menu-light .ivu-menu-vertical .ivu-menu-item {
  border-right: 0;
}

.title a{
  height: 50px;
  line-height: 50px;
  color: #000;
  font-weight: 600;
}

.aside-list .title {
  border-right: 1px solid #e3e4e5;
  border-bottom: 1px solid #e3e4e5
}


</style>
