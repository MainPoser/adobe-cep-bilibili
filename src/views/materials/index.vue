<template>
  <div class="materials">
    <el-container>
      <div>
        <el-aside width="180px">
          <el-menu
              :default-active="defaultActiveIndex"
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
      <div class="demo-image" style="flex: 1; text-align: center">
        <div v-for="item in materialList" :key="item._id" class="block">
          <span class="demonstration">{{ item.description }}</span>
          <el-image style="width: 100px; height: 100px" :src="item.url" fit="fill"/>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import SubMenu from "@/components/SubMenu";

export default {
  name: 'MaterialView',
  components: {
    SubMenu
  },
  data() {
    return {
      defaultActiveIndex: '1',
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
      materialList: []
    }
  },
  mounted() {
    // 页面加载获取一次左侧列表数据
    this.getLeftMenuList()
  },
  methods: {
    getLeftMenuList() {
      this.$axios.get("/api/x/material/bcut/v2/cats?access_key=&apply_for=0&build=&device=&mobi_app=&tp=" + this.topMenuType)
          .then(res => {
            debugger
            this.leftMenuList = res.data.categories
            this.defaultActiveIndex = res.data.categories[0].id + ''
            console.log(res)
          })
          .catch(err => {
            debugger
            console.log(err)
          })
    },
    handleSelectMenu(key) {
      this.materialList = []
      if (key === '999919') {
        this.materialList = [
          {
            _id: '1',
            description: '热门',
            url: 'https://www.2008php.com/09_Website_appreciate/10-07-11/1278862200_222.jpg'
          },
          {
            _id: '1',
            description: '热门',
            url: 'https://pic.ntimg.cn/file/20161008/3395888_173302467034_2.jpg'
          }
        ]
      }
      if (key === '120155') {
        this.materialList = [
          {
            _id: '1',
            description: 'UP必备',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
        ]
      }
      return true
    }
  }
}
</script>
