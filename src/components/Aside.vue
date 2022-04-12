<template>
  <div style="width: 300px;">
    <div class="card" style="padding-top: 50px;">
      <img
          src="../assets/logo.png"
          alt="找不到照片"
          style="width: 80px; border-radius: 50px; border: 1px solid #eee;"
      />
      <h2>TianYao</h2>
    </div>
    <div class="tags">
      <div class="title">标签云</div>
      <router-link
          v-for="item in labelList"
          class="item"
          :key="item._id"
          :to="`/articles?tag_id=${item._id}&tag_name=${item.name}`"
      >
        <span :key="item._id">{{ item.name }}</span>
      </router-link>
      <el-tag class="item" type="info">Tag 3</el-tag>
      <el-tag class="item" type="info">Tag 4</el-tag>

    </div>
    <div class="card">
      <h3>本站公众号</h3>
      <img src="../assets/logo.png" alt="找不到照片" style="width: 100px;"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsideComponent',
  data() {
    return {
      labelList: [{
        _id: '1',
        name: '测试1'
      }, {
        _id: '2',
        name: '测试2'
      }
      ]
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
————————————————
版权声明：本文为CSDN博主「starter_yo~」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_55054495/article/details/122783710