<template>
  <el-container>
    <el-aside width="15%">
      <el-menu
          background-color="#000000"
          text-color="#ffffff"
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
    <el-main>
      <div v-for="item in demoList" :key="item._id" class="box">
        <span class="name">{{ item.description }}</span>
        <el-image @click="execDemo(item)" style="width: 100px; height: 100px" :src="item.url" fit="fit"/>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import adobe_cep from '@/assets/adobe-cep'

export default {
  name: 'DemoView',
  data() {
    return {
      defaultActiveIndex: '1',
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
      // 根据选中的菜单不同，设置中心区域展示的数据不同
      this.demoList = []
      if (key === 'cs.evalScript') {
        this.demoList = [
          {
            _id: '1',
            description: '点击图片展示cs.evalScript同步处理demo',
            parentKey: 'cs.evalScript',
            key: 'cs.evalScript.sync',
            url: 'https://pic.ntimg.cn/file/20181222/27185307_092020902000_2.jpg'
          }
        ]
      }
      return true
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
  }
}
</script>

<style scoped>
.box {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}

.box:last-child {
  border-right: none;
}

.name {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
