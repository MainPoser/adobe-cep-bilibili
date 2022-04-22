<template>
  <el-container style="height: 100%">
    <!-- 头部 -->
    <el-header>
      <Header></Header>
    </el-header>

    <!-- 中间 -->
    <el-main>
      <router-view></router-view>
    </el-main>
    <!-- 尾部 -->
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="less">

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  background-image: url(https://gitee.com/ty13363959807/static_resource/raw/master/Adobe-CEP.jpg);
}

</style>
