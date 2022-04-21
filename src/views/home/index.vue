<template>
  <el-container>
    <el-aside style="width: 15%">
      <el-scrollbar height="40vw">
      </el-scrollbar>
    </el-aside>
    <el-main style="width: 80%">
      <el-scrollbar height="35vw">
        <div class="card">
          <img
              src="@/assets/profile-picture.jpg"
              alt="找不到照片"
              style="width: 80px; border-radius: 50px; border: 1px solid #eee;"
          />
          <h3 style="color: white">Wilson</h3>
          <h3 style="color: white" @click="openInDefaultBrowser('http://bcut.drawyoo.com/')">本插件资源均来自必剪,点击访问</h3>
        </div>
        <img alt="请求图片失败" src="https://gitee.com/ty13363959807/static_resource/raw/master/Adobe-CEP.jpg"
             style="width: 100%;height: 100%"/>
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
.card {
  border-bottom: 1px solid #eee;
  padding: 5px;
  height: 200px;
  box-sizing: border-box;
}

.tags {
  min-height: 200px;
  padding: 5px 0 20px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.tags .title {
  font-size: 14px;
  color: #969696;
}

.tags .item {
  display: inline-block;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #eee;
  color: #333;
  margin: 10px 10px 0 0;
  text-decoration: none;
}

.tags .item :hover {
  color: #409eff;
}
</style>