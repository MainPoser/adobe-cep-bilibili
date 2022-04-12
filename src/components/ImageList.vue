<template>
  <div class="demo-image">
    <el-container>
      <el-aside width="80%">
        <div v-for="item in imageList" :key="item._id" class="block">
          <span class="demonstration">{{ item.description }}</span>
          <el-image style="width: 100px; height: 100px" :src="item.url" fit="fit"/>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'ImageListComponent',
  props: {
    imageList: {
      type: Array
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