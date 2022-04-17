<template>
  <div class="materials">
    <el-container>
      <div>
        <el-aside width="180px">
          <el-menu
              background-color="#000000"
              text-color="#ffffff"
              :default-active="activeMenu"
              class="el-menu-vertical-demo"
              mode="vertical"
              @select="handleSelectMenu"
          >
            <el-sub-menu index="template">
              <template v-slot:title>模板</template>
              <template v-for="(menu) in leftMenuList">
                <sub-menu v-if="menu.children && menu.children.length" :key="menu.id" :item="menu"></sub-menu>
                <el-menu-item v-else :index="menu.id + ''" :key="menu.id">{{ menu.name }}</el-menu-item>
              </template>
            </el-sub-menu>
            <el-menu-item :index="104 + ''">花字</el-menu-item>
            <el-menu-item index="identificationCaption">识别字幕</el-menu-item>
          </el-menu>
        </el-aside>
      </div>
      <div style="flex: 1; text-align: center">
        <template v-for="item in materials" :key="item.id">
          <MateriaBox :material="item"></MateriaBox>
        </template>
      </div>
    </el-container>
  </div>
</template>

<script>
import SubMenu from "@/components/SubMenu";
import MateriaBox from "@/components/MaterialBox";
import adobe_cep from '@/assets/adobe-cep'
import constant from '@/assets/constant'
import http_util from '@/assets/util/http'

export default {
  name: 'TextView',
  components: {
    SubMenu,
    MateriaBox
  },
  data() {
    return {
      topMenuType: '19',
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
    let checkEnv = adobe_cep.checkDirAndTryRepair(adobe_cep.pathJoin(adobe_cep.USER_DIR, adobe_cep.EXTENDTION_ID));
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
    getLeftMenuList() {
      this.$axios({
        url: constant.API.BILIBILI.MATERIAL_PRE,
        method: constant.AXIOS.HTTP.METHOD.GET,
        params: {
          access_key: '',
          apply_for: 0,
          build: '',
          material_id: '',
          mobi_app: '',
          need_category: 1,
          tp: this.topMenuType,
        }
      }).then(res => {
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
      if (key === 'identificationCaption') {
        console.log("点击了识别字幕，目前暂未支持")
        return
      }
      this.$axios({
        url: constant.API.BILIBILI.MATERIAL_LIST,
        method: constant.AXIOS.HTTP.METHOD.GET,
        // 如果是花字菜单项，那就设置tp参数为21，其余情况设置为0(路由传递过来的)
        params: {
          apply_for: '',
          cat_id: key,
          max_rank: 0,
          mobi_app: '',
          tp: key === '104' ? '21' : this.topMenuType,
          version: 0
        }
      }).then(res => {
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
      this.handleSelectMenu(val)
    }
  }
}
</script>

<style scoped>
</style>