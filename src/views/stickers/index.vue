<template>
  <div class="stickers">
    <el-container>
      <div>
        <el-aside width="180px">
          <el-menu
              :default-active="defaultActiveIndex"
              class="el-menu-demo"
              mode="vertical"
              @select="handleSelectMenu"
          >
            <el-menu-item :key="item.index" v-for="(item) in menuData" :index="item.key">{{
                item.name
              }}
            </el-menu-item>
          </el-menu>
        </el-aside>
      </div>
      <div class="demo-image" style="flex: 1; text-align: center">
        <div v-for="item in imageList" :key="item._id" class="block">
          <span class="demonstration">{{ item.description }}</span>
          <el-image style="width: 100px; height: 100px" :src="item.url" fit="fit"/>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'StickerView',
  data() {
    return {
      defaultActiveIndex: '1',
      menuData: [
        {
          index: '1',
          key: 'My',
          name: '我的收藏'
        }, {
          index: '2',
          key: 'Hot',
          name: '热门'
        }
      ],
      imageList: []
    }
  },
  methods: {
    handleSelectMenu(key) {
      this.imageList = []
      if (key === 'My') {
        this.imageList = [
          {
            _id: '1',
            description: '老鹰',
            url: 'https://www.2008php.com/09_Website_appreciate/10-07-11/1278862200_222.jpg'
          },
          {
            _id: '1',
            description: '山水',
            url: 'https://pic.ntimg.cn/file/20161008/3395888_173302467034_2.jpg'
          }
        ]
      }
      if (key === 'Hot') {
        this.imageList = [
          {
            _id: '1',
            description: '案例图片',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image .block:last-child {
  border-right: none;
}

.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
