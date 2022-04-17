<template>
  <div class="materials">
    <el-container>
      <div>
        <el-aside width="180px">
          <el-menu
              :default-active="activeMenu"
              class="el-menu-vertical-demo"
              mode="vertical"
              @select="soundEffectsSelectMenu"
          >
            <el-sub-menu index="soundEffects">
              <template v-slot:title>音效</template>
              <template v-for="(menu) in soundEffectsMenuList">
                <sub-menu v-if="menu.children && menu.children.length" :key="menu.id" :item="menu"></sub-menu>
                <el-menu-item v-else :index="menu.id + ''" :key="menu.id">{{ menu.name }}</el-menu-item>
              </template>
            </el-sub-menu>
          </el-menu>
          <el-menu
              class="el-menu-vertical-demo"
              mode="vertical"
              @select="musicLibrarySelectMenu"
          >
            <el-sub-menu index="musicLibrary">
              <template v-slot:title>音乐库</template>
              <template v-for="(menu) in musicLibraryMenuList">
                <sub-menu v-if="menu.children && menu.children.length" :key="menu.id" :item="menu"></sub-menu>
                <el-menu-item v-else :index="menu.id + ''" :key="menu.id">{{ menu.name }}</el-menu-item>
              </template>
            </el-sub-menu>
          </el-menu>
        </el-aside>
      </div>
      <div v-if="musicLibraryOpen" style="flex: 1; text-align: center">
        <template v-for="item in musicLibraryMaterials" :key="item.id">
          <BGMBox :bgm="item"></BGMBox>
        </template>
      </div>
      <div v-else style="flex: 1; text-align: center">
        <template v-for="item in soundEffectsMaterials" :key="item.id">
          <MateriaBox :material="item"></MateriaBox>
        </template>

      </div>
    </el-container>
  </div>
</template>

<script>
import SubMenu from "@/components/SubMenu";
import MateriaBox from "@/components/MaterialBox";
import BGMBox from "@/components/BGMBox";
import adobe_cep from '@/assets/adobe-cep'
import constant from '@/assets/constant'
import http_util from '@/assets/util/http'

export default {
  name: 'MemeView',
  components: {
    SubMenu,
    MateriaBox,
    BGMBox
  },
  data() {
    return {
      topMenuType: '40',
      activeMenu: '',
      musicLibraryOpen: false,
      musicLibraryMenuList: [],
      musicLibraryMaterials: [],
      soundEffectsMenuList: [],
      soundEffectsMaterials: []
    }
  },
  mounted() {
    // 页面加载获取路由携带的父菜单的id
    this.getParams()
    // 页面加载获取一次音效列表数据
    this.getSoundEffectsMenuList()
    // 页面加载获取一次音乐库列表数据
    this.getMusicLibraryMenuList()
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
    getMusicLibraryMenuList() {
      this.$axios({
        url: constant.API.BILIBILI.MATERIAL_BGM_PRE,
        method: constant.AXIOS.HTTP.METHOD.GET,
        params: {
          pn: 0,
          ps: 0,
          tid: 0
        }
      }).then(res => {
        this.musicLibraryMenuList = res.data.typelist
      }).catch(err => {
        console.log(err)
      })
    },
    musicLibrarySelectMenu(key) {
      this.musicLibraryOpen = true
      this.soundEffectsMaterials = []
      console.log("点击了音乐库菜单" + key)
      this.$axios({
        url: constant.API.BILIBILI.MATERIAL_BGM_LIST,
        method: constant.AXIOS.HTTP.METHOD.GET,
        params: {
          pn: 1,//第几页
          ps: 30,//每页多少个
          tid: key
        }
      }).then(res => {
        this.musicLibraryMaterials = res.data.list
      }).catch(err => {
        console.log(err)
      })
      return true
    },
    getSoundEffectsMenuList() {
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
        this.soundEffectsMenuList = res.data.categories
        if ((this.soundEffectsMenuList) && this.soundEffectsMenuList.length > 0) {
          this.activeMenu = http_util.getChildrenId(this.soundEffectsMenuList[0])
        }
      }).catch(err => {
        console.log(err)
      })
    },
    soundEffectsSelectMenu(key) {
      this.musicLibraryOpen = false
      this.soundEffectsMaterials = []
      console.log("点击了音效菜单" + key)
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
        this.soundEffectsMaterials = res.data.materials
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
      this.soundEffectsSelectMenu(val)
    }
  }
}
</script>

<style scoped>

</style>