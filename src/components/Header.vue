<template>
  <el-row>
    <div style="width: 15%;text-align: center">
      <img src="../assets/logo.png" alt="找不到照片" style="width:50px"/>
    </div>
    <el-menu
        background-color="#000000"
        text-color="#ffffff"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        style="width: 80%"
    >
      <el-menu-item index="1">
        <router-link to="/" class="a">首页</router-link>
      </el-menu-item>
      <el-menu-item index="19">
        <router-link :to="{path:'materials',query:{menuType:'19'}}" class="a">素材库</router-link>
      </el-menu-item>
      <el-menu-item index="40">
        <router-link :to="{path:'memes',query:{menuType:'40'}}" class="a">B站热Geng</router-link>
      </el-menu-item>
      <el-menu-item index="20">
        <router-link :to="{path:'musics',query:{menuType:'20'}}" class="a">音频</router-link>
      </el-menu-item>
      <el-menu-item index="0">
        <router-link :to="{path:'texts',query:{menuType:'0'}}" class="a">文本</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link :to="{path:'stickers',query:{menuType:'7'}}" class="a">贴纸</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/articles" class="a">文章</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/demos" class="a">功能示例</router-link>
      </el-menu-item>
    </el-menu>
  </el-row>

</template>

<script>

export default {
  name: 'HeaderComponents',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect: (key, keyPath) => {
      console.log(key, keyPath);
    }
  }
}
</script>
<style scoped>

</style>