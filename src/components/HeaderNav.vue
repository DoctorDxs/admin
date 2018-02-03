<template>
  <section class="header-nav">
    <div>
      <a href="javascript:void(0)">{{title}}</a>
    </div>
    <div>
        <a href=""><Icon type="ios-email-outline"></Icon></a>
        <a href=""><Icon type="ios-bell-outline"></Icon></Icon></a>
        <Dropdown trigger="click" @on-click='getOut'>
          <a href="javascript:void(0)">
              {{username}}
              <Icon type="ios-arrow-down" style='font-size: 15px;'></Icon>
          </a>
          <DropdownMenu slot="list" style='text-align: center;'>
              <DropdownItem>注销</DropdownItem>
          </DropdownMenu>
      </Dropdown>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeaderNav',
  data() {
        return {
            title: ''
        };
    },

    created() {
      const query = this.$route.path.split('/')[3];
      this.title = this.navs[query]
      this.username = localStorage.getItem('username')
    },

    computed: {
        
    },
    watch: {
      '$route' (to, from) {
        const query = to.path.split('/')[3];
        this.title = this.navs[query]
      }
    },
    methods: {
      getOut: function () {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        this.$router.push({name: 'Login'})
      }
    },
    props: ['navs'],
}
</script>

<style scoped>
.header-nav {
  width: calc(100% - 200px);
  min-width: 700px;
  margin-left: 200px;
  position: fixed;
  height: 52px;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 52px;
  border-bottom: 1px solid #eeeeee;
  top: 0;
  background: #fff;
  z-index: 100;
}

.header-nav a {
  color: #000;
  padding: 0 10px;
  margin: 0 10px;
}

.header-nav div {
  padding: 0 20px;
}

.header-nav div:nth-child(2) a i {
  font-size: 20px;
}

</style>
