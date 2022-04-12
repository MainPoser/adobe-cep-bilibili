<template>
  <nav>
    <!--    <router-link to="/">Home</router-link> |-->
    <!--    <router-link to="/about">About</router-link>-->
    <!-- 头部 -->
    <Header></Header>
    <!-- 中间 -->
    <el-container>
      <!-- 内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 侧边栏 -->
      <Aside></Aside>
    </el-container>
    <!-- 尾部 -->
    <Footer></Footer>
  </nav>
</template>

<script>
import Header from "@/components/Header"
import Aside from "@/components/Aside"
import Footer from "@/components/Footer"

export default {
  name: 'App',
  components: {
    Header,
    Aside,
    Footer
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
