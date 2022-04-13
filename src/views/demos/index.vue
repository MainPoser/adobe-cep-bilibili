<template>
  <div class="stickers">
    <el-container>
      <div>
        <el-aside width="180px">
          <el-menu
              :default-active="activeIndex"
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
        <div v-for="item in demoList" :key="item._id" class="block">
          <span class="demonstration">{{ item.description }}</span>
          <el-image @click="execDemo(item)" style="width: 100px; height: 100px" :src="item.url" fit="fit"/>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import adobe_cep from '@/assets/adobe-cep'

export default {
  name: 'DemoView',
  data() {
    return {
      lsideSelect: '',
      activeIndex: '1',
      menuData: [
        {
          index: '1',
          key: 'cs.evalScript',
          name: 'CSI文件的evalScript函数'
        }
      ],
      demoList: []
    }
  },
  methods: {
    // 选中菜单的处理函数
    handleSelectMenu(key) {
      this.lsideSelect = key
    },
    //执行demo案例
    execDemo(demo) {
      if (demo.parentKey === 'cs.evalScript') {
        // 是evalScript函数的菜单
        if (demo.key === 'cs.evalScript.sync') {
          // 是evalScript函数的异步结果同步处理案例
          adobe_cep.sysncCSIEvalScriptFunDemo()
        }
      }
    }
  },
  watch: {
    // 监听选中菜单的值，根据值设置demoList的值，用来在主区域展示
    lsideSelect: function (newval) {
      if (newval === 'cs.evalScript') {
        this.demoList = [
          {
            _id: '1',
            description: '点击图片展示cs.evalScript同步处理demo',
            parentKey: 'cs.evalScript',
            key: 'cs.evalScript.sync',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
        ]
      } else if (newval === 'Hot') {
        this.demoList = [
          {
            _id: '1',
            description: '点击图片展示cs.event处理结果demo',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
        ]
      } else {
        this.demoList = []
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
