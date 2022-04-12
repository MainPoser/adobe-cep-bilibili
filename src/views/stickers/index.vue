<template>
  <div class="stickers">
    <el-container>
      <div style="width: 200px;">
        <Lside @select="select" :menuData="menuData"></Lside>
      </div>
      <div style="flex: 1; text-align: center">
        <ImageList v-if="lsideSelect==='My'" :image-list="imageList"></ImageList>
      </div>
    </el-container>
  </div>
</template>

<script>
import Lside from '@/components/Lside'
import ImageList from '@/components/ImageList'

export default {
  name: 'StickerView',
  data() {
    return {
      lsideSelect: '',
      menuData: [
        {
          index: '1',
          key: 'My',
          name: '我的收藏'
        }, {
          index: '2',
          key: 'Hot',
          name: '热门'
        }, {
          index: '3',
          key: 'Funny',
          name: '搞笑'
        }, {
          index: '4',
          key: 'Life',
          name: '生活'
        }
      ],
      imageList: [
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {_id: '1', description: '案例图片', url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'}
      ]
    }
  },
  components: {
    Lside,
    ImageList
  },
  methods: {
    select(data) {
      this.lsideSelect = data
    }
  },
  watch: {
    lsideSelect: function (newval, oldval) {
      console.log(newval, oldval)
    }
  }
}
</script>
