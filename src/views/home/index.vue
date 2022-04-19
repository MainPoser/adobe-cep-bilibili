<template>
  <el-container>
    <el-aside style="width: 15%" >
      列表
    </el-aside>
    <el-main style="width: 80%">
      <div class="card">
        <img
            src="@/assets/profile-picture.jpg"
            alt="找不到照片"
            style="width: 80px; border-radius: 50px; border: 1px solid #eee;"
        />
        <h3 style="color: white">Wilson</h3>
      </div>
      <div class="tags">
        <div class="title" style="text-align: center;color: white">支持平台</div>
        <router-link
            v-for="item in labelList"
            class="item"
            :key="item._id"
            :to="{name:'articles',query:{tag_name:item.name}}"
        >
          <span :key="item._id">{{ item.name }}</span>
        </router-link>
        <el-tag class="item" type="info" @click="openInDefaultBrowser('http://bcut.drawyoo.com/')">必剪</el-tag>
      </div>
      <div class="card">
        <h3 style="color: white">本插件资源均来自必剪</h3>
        <el-row>
          <h3 style="color: white" @click="openInDefaultBrowser('http://bcut.drawyoo.com/')">点此访问</h3>
        </el-row>
        <el-row>
          <img src="@/assets/bcut.jpg" alt="找不到照片"/>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import adobe_cep from '@/assets/adobe-cep'

export default {
  name: 'HomeView',
  data() {
    return {
      labelList: [{
        _id: '1',
        name: '文章1'
      }, {
        _id: '2',
        name: '文章2'
      }
      ]
    }
  },
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