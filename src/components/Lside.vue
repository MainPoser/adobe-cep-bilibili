<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="vertical"
          @select="handleSelect"
      >
        <el-menu-item :key="item.index" v-for="(item) in menuData" :index="item.key">{{ item.name }}</el-menu-item>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>

export default {
  name: 'LsideComponents',
  props: {
    menuData: {
      type: Array,
    }
  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key) {
      this.$emit('select', key)
    }
  }
}
</script>

<style scoped>
.card {
  border-bottom: 1px solid #eee;
  padding: 5px;
  height: 200px;
  box-sizing: border-box;
}

.tags {
  min-height: 200px;
  padding: 5px 0 20px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.tags .title {
  font-size: 14px;
  color: #969696;
}

.tags .item {
  display: inline-block;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #eee;
  color: #333;
  margin: 10px 10px 0 0;
  text-decoration: none;
}

.tags .item :hover {
  color: #409eff;
}
</style>