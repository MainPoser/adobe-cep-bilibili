<template>
  <div class="articles">
    <h1>This is an articles page{{ title }}{{ msg }}</h1>
  </div>
</template>

<script>

export default {
  name: 'ArticleView',
  data() {
    return {
      msg: '文章',
      title: '',
    }
  },
  methods:{
    // 接收参数的方法
    getParams() {
      this.title = this.$route.query.tag_name;
    }
  },
  mounted() {
    this.getParams()
  },
  // 如果不用watch进行监听，则会出现参数只获取一次的情况
  watch: {
    '$route'(){
      this.getParams();
    }
  }
}
</script>
