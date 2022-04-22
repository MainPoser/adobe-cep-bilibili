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
        <el-row style="margin-bottom: 20px;margin-left: 30px">
          <el-input
              type="text"
              prefix-icon="el-icon-search"
              v-model="music_kw_content"
              placeholder="请输入音频名称，回车检索"
              style="width: 270px; cursor: pointer"
              @keyup.enter="searchmaterials"
          ></el-input>
          <el-button @click="searchmaterials">搜索</el-button>
        </el-row>
        <el-scrollbar height="28vw">
          <template v-for="item in musicLibraryMaterials" :key="item.id">
            <BGMBox @getMusicInfo="playMusic" :bgm="item"></BGMBox>
          </template>
        </el-scrollbar>
        <el-row>
          <div class="demo-pagination-block">
            <el-pagination
                :currentPage="musicLibraryCurrentPage"
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
      </div>
      <div v-else style="margin-left: 30px;">
        <el-scrollbar height="35vw">
          <template v-for="item in soundEffectsMaterials" :key="item.id">
            <MateriaBox @getMusicInfo="playMusic" :material="item"></MateriaBox>
          </template>
        </el-scrollbar>
      </div>
      <p style="margin-left: 30px;color: white">正在播放：{{ music.name }}</p>
      <audio ref="audio" controls autoplay loop :src="music.play_url"
             style="width: 85%; height: 30px;margin-left: 30px;">
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
      music_kw_content: '',
      music: {},
      musicLibrarySelectMenuKey: '',
      musicLibraryCurrentPage: 1,
      musicLibraryPageSize: 10,
      musicLibraryTotal: 0,
      musicLibraryOpen: false,
      musicLibraryMenuList: [],
      musicLibraryMaterials: [],
      topMenuType: '40',
      activeMenu: '',
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
    //检索接口
    searchmaterials() {
      // 重置音乐库当前页码
      this.musicLibraryCurrentPage = 1
      // 重置音乐库列表
      this.musicLibraryMaterials = []
      this.$axios({
        url: constant.API.BILIBILI.MATERIAL_BGM_SEARCH,
        method: constant.AXIOS.HTTP.METHOD.GET,
        params: {
          kw: this.music_kw_content,
          pn: this.musicLibraryCurrentPage,
          ps: this.musicLibraryPageSize
        }
      }).then(res => {
        this.musicLibraryMaterials = res.data.bgm
        this.musicLibraryTotal = res.data.pager.total
      }).catch(err => {
        console.log(err)
      })
    },
    // 播放音乐
    playMusic(music) {
      console.log(music)
      // 重置播放时间
      this.$refs.audio.currentTime = 0
      // 设置当前播放音乐
      this.music = music

    },
    // 音乐库每页长度改变
    musicLibrarySizeChange(val) {
      this.musicLibraryPageSize = val
      this.musicLibrarySelectMenu(this.musicLibrarySelectMenuKey)
    },
    // 音乐库当前页更新
    musicLibraryCurrentChange(val) {
      this.musicLibraryCurrentPage = val
      this.musicLibrarySelectMenu(this.musicLibrarySelectMenuKey)
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
      this.musicLibrarySelectMenuKey = key
      this.musicLibraryOpen = true
      this.musicLibraryMaterials = []
      console.log("点击了音乐库菜单" + this.musicLibrarySelectMenuKey)
      this.$axios({
        url: constant.API.BILIBILI.MATERIAL_BGM_LIST,
        method: constant.AXIOS.HTTP.METHOD.GET,
        params: {
          pn: this.musicLibraryCurrentPage,//第几页
          ps: this.musicLibraryPageSize,//每页多少个
          tid: this.musicLibrarySelectMenuKey
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

</style>