<template>
  <div class="stickers">
    <Lside @select="select" :menuData="menuData"></Lside>
    <div>选择了{{ lsideSelect }}</div>
  </div>
</template>

<script>
import Lside from '@/components/Lside'

export default {
  name: 'StickerView',
  data() {
    return {
      lsideSelect: '',
      menuData: [
        {
          index: '1',
          key:'My',
          name: '我的收藏'
        }, {
          index: '2',
          key:'Hot',
          name: '热门'
        }, {
          index: '3',
          key:'Funny',
          name: '搞笑'
        }, {
          index: '4',
          key:'Life',
          name: '生活'
        }]
    }
  },
  components: {
    Lside
  },
  methods: {
    select(data) {
      this.lsideSelect = data
    }
  }
}
</script>
