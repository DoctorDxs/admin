<template>
  <section>
    <div class="aside">
      <div class="logo">
        <img src="../assets/avatar-wemall.png" alt="">
      </div>
      <Menu :theme="theme2" :active-name='navIndex' mode="vertical" style='width: 90px;'  @on-select="getNavList">
          <MenuItem name="home/index">
              <Icon type="home"></Icon>
              首页
          </MenuItem>
          <MenuItem name="settings/settingShop">
              <Icon type="settings"></Icon>
              设置
          </MenuItem>
          <MenuItem name="wx_config/wxSet">
              <Icon type="chatbubbles"></Icon>
              微信
          </MenuItem>
          <MenuItem name="content/contentClass">
              <Icon type="compose"></Icon>
              内容
          </MenuItem>
          <MenuItem name="shop/shopMenu">
              <Icon type="android-cart"></Icon>
              商城
          </MenuItem>
          <MenuItem name="order/orderList">
              <Icon type="ios-calendar-outline"></Icon>
              订单
          </MenuItem>
          <MenuItem name="graph/finance">
              <Icon type="arrow-graph-up-right"></Icon>
              报表
          </MenuItem>
          <MenuItem name="user/adminUser">
              <Icon type="ios-people"></Icon>
              用户
          </MenuItem>
          <MenuItem name="module/moduleSet">
              <Icon type="ios-photos"></Icon>
              模版
          </MenuItem>
          <MenuItem name="plug/plugSet">
              <Icon type="archive"></Icon>
              插件
          </MenuItem>
          <MenuItem name="help/help">
              <Icon type="help-circled"></Icon>
              帮助
          </MenuItem>
      </Menu>
    </div>
    <router-view/>
  </section>

</template>

<script>
export default {
  name: 'AsideLeft',
  data() {
        return {
            theme2: 'dark',
            navIndex: ''
        };
    },

    computed: {
        
    },

    created() {
      const routerName = this.$route.path.split('/')[2];
      this.escape(routerName)
    },
    
    methods: {
      getNavList: function(name) {
        this.$router.push('/admin/' + name)
      },
      // 处理刷新时菜单点击状态
      escape: function(title) {
        switch(true) {
          case (title === 'home'):
            this.navIndex = 'home/index';
            break;
          case (title === 'settings'):
            this.navIndex = 'settings/settingShop'
            break;
          case (title === 'wx_config'):
            this.navIndex = 'wx_config/wxSet'
            break;
          case (title === 'content'):
            this.navIndex = 'content/contentClass'
            break;
          case (title === 'shop'):
            this.navIndex = 'shop/shopMenu'
            break;
          case (title === 'order'):
            this.navIndex = 'order/orderList'
            break;
          case (title === 'graph'):
            this.navIndex = 'graph/finance'
            break;
          case (title === 'user'):
            this.navIndex = 'user/adminUser'
            break;
          case (title === 'module'):
            this.navIndex = 'module/moduleSet'
            break;
          case (title === 'plug'):
            this.navIndex = 'plug/plugSet'
            break;
          case (title === 'help'):
            this.navIndex = 'help/help'
            break;
        }
      }
    },

}
</script>

<style>
.aside {
  position: fixed;
  height: 100%;
  width: 90px;
  background: #444;
  font-weight: 600;
  font-size: 18px;
  top: 0;
}

.ivu-menu-vertical .ivu-menu-item {
  padding: 14px 14px;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #000;
    border-right: 0;
    background: #fff;
}

.logo {
  height: 70px;
  width: 90px;
  text-align: center;
  line-height: 60px;
}

.logo img {
  width: 32px;
  height: 32px;
  margin: 0 auto ;
  border-radius: 50%;
  vertical-align: middle;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover {
  background: #fff;
  color: #000;
}

.ivu-menu-dark {
    background: #444;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover {
  background: #ffffff;
}
</style>
