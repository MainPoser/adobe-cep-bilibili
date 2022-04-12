<template>
  <div class="demo-image">
    <el-container>
      <el-aside width="80%">
        <div v-for="fit in fits" :key="fit" class="block">
          <span class="demonstration">{{ fit }}</span>
          <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"/>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'ImageListComponent',
  data() {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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