<template>
  <div class="materials">
    <el-container>
      <div>
        <el-aside width="180px">
          <el-menu
              :default-active="activeMenu"
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
          <el-button :disabled="item.isDisabled" @click="downloadResource(item)" class="demonstration">点击下载</el-button>
          <el-progress v-if="item.show" :percentage="item.percentage"></el-progress>
          <audio controls="controls" style="width: 100px; height: 100px" :src="item.download_url">
            Your browser does not support the audio element.
          </audio>
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
  name: 'MemeView',
  components: {
    SubMenu
  },
  data() {
    return {
      topMenuType: '40',
      activeMenu: '',
      leftMenuList: [],
      materials: []
    }
  },
  mounted() {
    // 页面加载获取路由携带的父菜单的id
    this.getParams()
    // 页面加载获取一次左侧列表数据
    this.getLeftMenuList()
    // 检查一次资源目录
    let checkEnv = adobe_cep.checkEnv(adobe_cep.pathJoin(adobe_cep.USER_DIR, adobe_cep.EXTENDTION_ID));
    if (checkEnv.err === 0) {
      console.log("cehck dir " + adobe_cep.pathJoin(adobe_cep.USER_DIR, adobe_cep.EXTENDTION_ID) + " success")
    } else {
      adobe_cep.alertMsg(checkEnv.err + ": " + checkEnv.msg)
    }
  },
  methods: {
    // 接收参数的方法
    getParams() {
      this.topMenuType = this.$route.query.menuType;
    },
    downloadResource(material) {
      // 用户打开保存文件目录选择框
      let fileName = http_util.getFileNameByUrl(material.download_url);
      let suffix = fileName.split('.')[1];
      let showSaveDialogResult = adobe_cep.showSaveDialogEx("选择保存位置", adobe_cep.pathJoin(adobe_cep.USER_DIR, adobe_cep.EXTENDTION_ID, material.name), [suffix], fileName, "*." + suffix)
      let filePath = adobe_cep.pathJoin(adobe_cep.USER_DIR, adobe_cep.EXTENDTION_ID, fileName);
      if (0 === showSaveDialogResult.err) {
        if (showSaveDialogResult.data.length === 0) {
          console.log("用户放弃了保存");
          return
        } else {
          console.log("获取的保存框的值" + showSaveDialogResult.data);
          filePath = showSaveDialogResult.data
        }
      } else {
        console.log("打开保存位置错误：" + showSaveDialogResult.err)
        return
      }
      //进度条恢复为 0
      this.materials[this.materials.findIndex(item => item.id === material.id)].percentage = 0
      //按钮置灰 不可点击
      this.materials[this.materials.findIndex(item => item.id === material.id)].isDisabled = true
      //展示下载框
      this.materials[this.materials.findIndex(item => item.id === material.id)].show = true
      this.$axios({
        url: material.download_url,
        method: constant.AXIOS.HTTP.METHOD.GET,
        responseType: constant.AXIOS.HTTP.RESPONSE_TYPE.ARRAY_BUFFER, //必须这么写，标注响应的是二进制流
        onDownloadProgress: (progressEvent) => {
          //progressEvent.loaded 下载文件的当前大小
          //progressEvent.total  下载文件的总大小 如果后端没有返回 请让他加上！
          let progressBar = Math.round(progressEvent.loaded / progressEvent.total * 100);
          //接收进度为99%的时候需要留一点前端编译的时间
          if (progressBar >= 99) {
            this.materials[this.materials.findIndex(item => item.id === material.id)].percentage = 99;
            console.log('下载完成，文件正在编译。');
          } else {
            this.materials[this.materials.findIndex(item => item.id === material.id)].percentage = progressBar
            console.log('正在下载，请稍等。');
          }
        }
      }).then(res => {
        let base64Data = http_util.arrayBufferToBase64(res)
        let writeResult = adobe_cep.writeFile(base64Data, constant.IO.FILE_ENCODE.BASE64, filePath);
        console.log(writeResult)
        //编译文件完成后，进度条展示为100%100
        this.materials[this.materials.findIndex(item => item.id === material.id)].percentage = 100
        //下载完成 可以重新点击按钮下载
        this.materials[this.materials.findIndex(item => item.id === material.id)].isDisabled = false
        //进度条隐藏展示
        this.materials[this.materials.findIndex(item => item.id === material.id)].show = false
      }).catch(err => {
        console.log(err)
      })
    },
    getLeftMenuList() {
      this.$axios({
        url: constant.API.BILIBILI.MATERIAL_PRE,
        method: constant.AXIOS.HTTP.METHOD.GET,
        params: {
          access_key: '',
          apply_for: 0,
          build: '',
          material_id: 0,
          mobi_app: '',
          need_category: 1,
          tp: this.topMenuType,
        }
      }).then(res => {
        console.log(res)
        this.leftMenuList = res.data.categories
        if ((this.leftMenuList) && this.leftMenuList.length > 0) {
          this.activeMenu = http_util.getChildrenId(this.leftMenuList[0])
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleSelectMenu(key) {
      this.materials = []
      console.log("点击了菜单" + key)
      this.$axios({
        url: constant.API.BILIBILI.MATERIAL_LIST,
        method: constant.AXIOS.HTTP.METHOD.GET,
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
  },
  // 如果不用watch进行监听，则会出现参数只获取一次的情况
  watch: {
    '$route'() {
      this.getParams();
    },
    'activeMenu'(val) {
      console.log("监听到默认菜单变化为：" + val)
      this.handleSelectMenu(val)
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