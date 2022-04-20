<template>
  <el-container>
    <el-aside width="15%">
      <el-scrollbar height="40vw">
        <el-menu
            background-color="#000000"
            text-color="#ffffff"
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
      </el-scrollbar>
    </el-aside>
    <el-main>
      <div style="margin-left: 30px">
        <el-scrollbar height="35vw">
          <template v-for="item in materials" :key="item.id">
            <MateriaBox :material="item"></MateriaBox>
          </template>
        </el-scrollbar>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import SubMenu from "@/components/SubMenu";
import MateriaBox from "@/components/MaterialBox";
import adobe_cep from '@/assets/adobe-cep'
import constant from '@/assets/constant'
import http_util from '@/assets/util/http'

export default {
  name: 'MemeView',
  components: {
    SubMenu,
    MateriaBox
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
          material_id: 0,
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