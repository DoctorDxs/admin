<template>
  <section class='container'>
  	<h4>{{content.title}}</h4>
    <div class="article-info">
      <span>{{content.created_at}}</span>
      <span>作者： {{content.author}}</span>
    </div>
    <div class='ql-container content'> 
      <div class='ql-editor' v-html='content.content'>
        
      </div>
    </div>

    <div class='visiter'>
      阅读 {{content.visiter}}
    </div>
  </section>
</template>

<script>

export default {
  name: 'Article',
  data() {
        return {
            content: ''
        };
    },
    created() {
      if (this.$route.params.id) {
          const id = this.$route.params.id
          this.getData('&where=id,' +  id)
          localStorage.setItem("id", id)
      } else {
          const id = localStorage.getItem("id")
          this.getData('&where=id,' +  id)
      };
    },
    methods: {
    	getData: function(params) {
        this.$axios.getArtList(params).then(res => {
          const data = res.data[0]
          data.created_at = data.created_at.replace(/T|Z/g, ' ')
          this.content = data
          this.saveData({
            id: data.id,
            visiter: +data.visiter + 1
          })
        })
      },
      saveData: function(data) {
        this.$axios.postArtList({
          method: 'post',
          data: data
        }).then(res => {
          console.log(res)
        })
      }
    },

}
</script>

<style scoped>
  .container {
    margin: 0 auto;
    width: 740px;
    padding-bottom: 100px;
  }

  h4 {
    margin: 40px 0 15px;
    padding-bottom: 10px;
    font-size: 24px;
    font-weight: 400;
    border-bottom: 1px solid #e7e7eb
  }

  .article-info {
    color: #8c8c8c;
    font-size: 16px;
  }

  .article-info span {
    margin-right: 20px;
  }

  .content {
    min-height: 200px;
  }

  .visiter {
    color: #8c8c8c;
    font-size: 16px;
    margin: 30px 0;
    padding: 10px;
    border-bottom: 1px solid #e7e7eb
  }

</style>
