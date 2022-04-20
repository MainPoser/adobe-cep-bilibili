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
            background-color="#000000"
            text-color="#ffffff"
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
      </el-scrollbar>
    </el-aside>
    <el-main>
      <div v-if="musicLibraryOpen" style="margin-left: 30px;">
        <el-scrollbar height="32vw">
          <template v-for="item in musicLibraryMaterials" :key="item.id">
            <BGMBox @getBGMInfo="playMusic" :bgm="item"></BGMBox>
          </template>
          <el-row>
            <div class="demo-pagination-block">
              <div class="demonstration">分页信息</div>
              <el-pagination
                  v-model:currentPage="musicLibraryCurrentPage"
                  :page-size="musicLibraryPageSize"
                  :page-sizes="[10, 20, 30, 40]"
                  :small="true"
                  :default-page-size="10"
                  :background="true"
                  layout="total,sizes,prev,pager,next"
                  :total="musicLibraryTotal"
                  @size-change="musicLibrarySizeChange"
                  @current-change="musicLibraryCurrentChange"
              />
            </div>
          </el-row>
        </el-scrollbar>
      </div>
      <div v-else style="margin-left: 30px;">
        <el-scrollbar height="35vw">
          <template v-for="item in soundEffectsMaterials" :key="item.id">
            <MateriaBox :material="item"></MateriaBox>
          </template>
        </el-scrollbar>
      </div>
      <audio ref="audio" controls="controls" style="width: 100%; height: 60px">
        Your browser does not support the audio element.
      </audio>
    </el-main>
  </el-container>

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
      musicLibraryCurrentPage: 1,
      musicLibraryPageSize: 20,
      topMenuType: '40',
      musicLibraryTotal: 0,
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
    let checkEnv = adobe_cep.checkDirAndTryRepair(adobe_cep.pathJoin(adobe_cep.USER_DIR, adobe_cep.EXTENDTION_ID));
    if (checkEnv.err === 0) {
      console.log("cehck dir " + adobe_cep.pathJoin(adobe_cep.USER_DIR, adobe_cep.EXTENDTION_ID) + " success")
    } else {
      adobe_cep.alertMsg(checkEnv.err + ": " + checkEnv.msg)
    }
  },
  methods: {
    // 播放音乐
    playMusic(music) {
      console.log(music)
      // 绑定音乐地址
      this.$refs.audio.src = music.play_url
      // 重置播放时间
      this.$refs.audio.currentTime = 0
      // 播放音乐
      this.$refs.audio.play()
    },
    // 音乐库每页长度改变
    musicLibrarySizeChange() {
      this.musicLibrarySelectMenu()
    },
    // 音乐库当前页更新
    musicLibraryCurrentChange() {
      this.musicLibrarySelectMenu()
    },
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
      this.musicLibraryMaterials = []
      console.log("点击了音乐库菜单" + key)
      this.$axios({
        url: constant.API.BILIBILI.MATERIAL_BGM_LIST,
        method: constant.AXIOS.HTTP.METHOD.GET,
        params: {
          pn: this.musicLibraryCurrentPage,//第几页
          ps: this.musicLibraryPageSize,//每页多少个
          tid: key
        }
      }).then(res => {
        this.musicLibraryMaterials = res.data.list
        this.musicLibraryTotal = res.data.pager.total
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
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
  margin-top: 10px;
}
</style>