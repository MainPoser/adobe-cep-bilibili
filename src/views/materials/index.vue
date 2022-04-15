<template>
  <div class="materials">
    <el-container>
      <div>
        <el-aside width="180px">
          <el-menu
              class="el-menu-vertical-demo"
              mode="vertical"
              @select="handleSelectMenu"
          >
            <template v-for="(menu) in leftMenuList">
              <sub-menu v-if="menu.children && menu.children.length" :key="menu.id" :item="menu"></sub-menu>
              <el-menu-item v-else :index="menu.id + ''" :key="menu.id">{{ menu.name }}</el-menu-item>
            </template>
          </el-menu>
        </el-aside>
      </div>
      <div class="material-image" style="flex: 1; text-align: center">
        <div v-for="item in materials" :key="item.id" class="block">
          <span class="demonstration">{{ item.name }}</span>
          <el-image @click="downloadResource(item)" style="width: 100px; height: 100px" :src="item.static_cover"
                    fit="fill"/>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import SubMenu from "@/components/SubMenu";
import adobe_cep from '@/assets/adobe-cep'
import constant from '@/assets/constant'
import http_util from '@/assets/util/http'

export default {
  name: 'MaterialView',
  components: {
    SubMenu
  },
  data() {
    return {
      topMenuType: '19',
      leftMenuList: [],
      materials: []
    }
  },
  mounted() {
    // 页面加载获取一次左侧列表数据
    this.getLeftMenuList()
  },
  methods: {
    downloadResource(material) {
      this.$axios({
        url: material.download_url,
        method: constant.AXIOS.HTTP.METHOD.GET,
        responseType: constant.AXIOS.HTTP.RESPONSE_TYPE.ARRAY_BUFFER //必须这么写，标注响应的是二进制流
      }).then(res => {
        let base64Data = http_util.arrayBufferToBase64(res)
        let fileName = http_util.getFileNameByUrl(material.download_url);
        let writeResult = adobe_cep.writeFile(base64Data,
            constant.IO.FILE_ENCODE.BASE64,
            adobe_cep.USER_DIR,
            adobe_cep.EXTENDTION_ID,
            fileName);
        console.log(writeResult)
      }).catch(err => {
        console.log(err)
      })
    },
    getLeftMenuList() {
      this.$axios({
        url: 'http://member.bilibili.com/x/material/bcut/v2/cats',
        method: 'get',
        params: {
          access_key: '',
          apply_for: '',
          build: '',
          device: '',
          mobi_app: '',
          tp: this.topMenuType,
        }
      }).then(res => {
        console.log(res)
        this.leftMenuList = res.data.categories
      }).catch(err => {
        console.log(err)
      })
    },
    handleSelectMenu(key) {
      this.materials = []
      console.log("点击了菜单" + key)
      this.$axios({
        url: 'http://member.bilibili.com/x/material/bcut/v2/list',
        method: 'get',
        params: {
          apply_for: '',
          cat_id: key,
          max_rank: 0,
          mobi_app: '',
          tp: this.topMenuType,
          version: 0
        }
      }).then(res => {
        console.log(res)
        this.materials = res.data.materials
      }).catch(err => {
        console.log(err)
      })
      return true
    }
  }
}
</script>

<style scoped>
.material-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}

.material-image .block:last-child {
  border-right: none;
}

.material-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>