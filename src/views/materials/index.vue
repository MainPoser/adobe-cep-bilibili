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
          <el-image @click="downloadResource" style="width: 100px; height: 100px" :src="item.static_cover" fit="fill"/>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import SubMenu from "@/components/SubMenu";
import adobe_cep from '@/assets/adobe-cep'

export default {
  name: 'MaterialView',
  components: {
    SubMenu
  },
  data() {
    return {
      topMenuType: '19',
      leftMenuList: [{
        "pid": 0,
        "id": 999919,
        "name": "热门",
        "rank": 0,
        "global_rank": 0,
        "cover": "",
        "type": 19,
        "cat_tp": 0,
        "apply_biz": 0,
        "ctime": 0,
        "mtime": 0,
        "children": null,
        "res_cnt": 0
      }, {
        "pid": 0,
        "id": 120155,
        "name": "UP必备",
        "rank": 167,
        "global_rank": 1,
        "cover": "http://i0.hdslb.com/bfs/creative/0060095c06674feec639ef5fa8b6c7e0a15cf45a.png",
        "type": 19,
        "cat_tp": 0,
        "apply_biz": 1,
        "ctime": 1620722913,
        "mtime": 1649779181,
        "children": [{
          "pid": 120155,
          "id": 73,
          "name": "经典素材",
          "rank": 209,
          "global_rank": 1,
          "cover": "",
          "type": 19,
          "cat_tp": 0,
          "apply_biz": 1,
          "ctime": 1594650704,
          "mtime": 1649779181,
          "children": null,
          "res_cnt": 0
        }, {
          "pid": 120155,
          "id": 150100,
          "name": "一键三连",
          "rank": 212,
          "global_rank": 1,
          "cover": "",
          "type": 19,
          "cat_tp": 0,
          "apply_biz": 1,
          "ctime": 1608719466,
          "mtime": 1649779181,
          "children": null,
          "res_cnt": 0
        }, {
          "pid": 120155,
          "id": 76,
          "name": "转场",
          "rank": 213,
          "global_rank": 1,
          "cover": "",
          "type": 19,
          "cat_tp": 0,
          "apply_biz": 1,
          "ctime": 1594650750,
          "mtime": 1649779181,
          "children": null,
          "res_cnt": 0
        }, {
          "pid": 120155,
          "id": 180118,
          "name": "片头",
          "rank": 214,
          "global_rank": 1,
          "cover": "",
          "type": 19,
          "cat_tp": 0,
          "apply_biz": 1,
          "ctime": 1625716214,
          "mtime": 1649779181,
          "children": null,
          "res_cnt": 0
        }, {
          "pid": 120155,
          "id": 120213,
          "name": "片尾",
          "rank": 215,
          "global_rank": 1,
          "cover": "",
          "type": 19,
          "cat_tp": 0,
          "apply_biz": 1,
          "ctime": 1626092223,
          "mtime": 1649779181,
          "children": null,
          "res_cnt": 0
        }, {
          "pid": 120155,
          "id": 120204,
          "name": "计时器",
          "rank": 216,
          "global_rank": 1,
          "cover": "",
          "type": 19,
          "cat_tp": 0,
          "apply_biz": 1,
          "ctime": 1625725068,
          "mtime": 1649779181,
          "children": null,
          "res_cnt": 0
        }],
        "res_cnt": 0
      }],
      materials: []
    }
  },
  mounted() {
    // 页面加载获取一次左侧列表数据
    this.getLeftMenuList()
  },
  methods: {
    downloadResource(material){
      // 下载某资源，暂时把资源输出到console
      adobe_cep.alertMsg(material)
      console.log(material)
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
      console.log("出发了点击事件：" + key)
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