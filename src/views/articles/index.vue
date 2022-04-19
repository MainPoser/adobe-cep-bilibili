<template>
  <el-container>
    <el-aside>
      左侧菜单
    </el-aside>
    <el-main>
      主要显示区
    </el-main>
  </el-container>
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
  methods: {
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
    '$route'() {
      this.getParams();
    }
  }
}
</script>
