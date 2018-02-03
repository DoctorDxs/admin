<template>
  <section>
  	<Aside-Left></Aside-Left>
  </section>
</template>

<script>
import AsideLeft from '@/components/AsideLeft'


export default {
  name: 'Index',
  data() {
        return {
            
        };
    },

    mounted: function() {
        this.isToken();
    },

    computed: {
        
    },

    methods: {
    	isToken: function() {
          const token = localStorage.getItem("token");
          if (!token) {
            console.log(token)
              this.$router.push({ path: "/login" });
          } else {
              // this.getData();
          }
        },
    },

    components: {
      AsideLeft,
    }
}
</script>

<style>
body {
  position: relative;
}

</style>
