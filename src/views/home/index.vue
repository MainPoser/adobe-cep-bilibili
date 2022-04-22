<template>
  <el-container>
    <el-aside width="15%">

    </el-aside>
    <el-main>
      <el-scrollbar height="35vw">
        <el-row align="middle">
          <img
              src="@/assets/profile-picture.jpg"
              alt="找不到照片"
              style="margin-left: 25vw;width: 80px; border-radius: 50px; border: 1px solid #eee;"
          />
          <img
              @click="openInDefaultBrowser('https://gitee.com/ty13363959807/adobe-cep-bilibili')"
              src="@/assets/logo.png" alt="找不到照片"
              style="width: 80px; border-radius: 50px; border: 1px solid #eee;"
          />
          <img
              @click="openInDefaultBrowser('http://bcut.drawyoo.com/')"
              src="@/assets/bcut.png" alt="找不到照片"
              style="width: 80px; border-radius: 50px; border: 1px solid #eee;"/>
        </el-row>
        <el-row align="middle" style="margin-left: 32vw;">
          <a style="color: white">Wilson</a>
        </el-row>
        <el-row style="color: white" align="middle">
          <div style="margin-left: 25vw;color: white">
            邮箱：ty18710388929@163.com
          </div>
        </el-row>
        <el-row align="middle">
          <a style="margin-left: 26vw;color: white" @click="openInDefaultBrowser('http://bcut.drawyoo.com/')">本插件资源均来自必剪,点击访问</a>
        </el-row>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import adobe_cep from '@/assets/adobe-cep'

export default {
  name: 'HomeView',
  methods: {
    openInDefaultBrowser(url) {
      adobe_cep.openURLInDefaultBrowser(url)
    }
  }
}
</script>
<style scoped>

a:link {
  color: red;
}

a:visited {
  color: black;
}
</style>