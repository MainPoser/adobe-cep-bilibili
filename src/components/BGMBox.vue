<template>
  <div class="box">
    <span class="name">{{ bgm.name }}</span>
    <el-row style="padding-left: 15px;">
      <el-button :disabled="isDisabled" @click="downloadResource" style="width: 40%">点击下载</el-button>
      <el-button @click="playMusic" style="width: 40%">点击播放</el-button>
    </el-row>
    <el-progress v-if="show" :percentage="percentage"></el-progress>
    <el-image fit="fill" style="width: 100px; height: 100px" :src="bgm.cover"/>
  </div>
</template>

<script>
import http_util from "@/assets/util/http";
import adobe_cep from "@/assets/adobe-cep";
import constant from "@/assets/constant";

export default {
  name: 'BGMBox',
  props: ['bgm'],
  data() {
    return {
      music: {},
      percentage: 0,
      isDisabled: false,
      show: false,
      playUrl: ''
    }
  },
  mounted() {
    // 挂载之后就获取一下当前BGM对应的播放地址
    this.getPlayUrl()
  },
  methods: {
    // 播放音乐，把音乐信息传递给父组件
    playMusic() {
      this.music.play_url = this.playUrl
      this.music.image_url = this.bgm.cover
      this.music.name = this.bgm.name
      this.$emit('getMusicInfo', this.music)
    },
    getPlayUrl() {
      this.$axios({
        url: constant.API.BILIBILI.MATERIAL_BGM_PLAY_URL,
        method: constant.AXIOS.HTTP.METHOD.GET,
        params: {
          sid: this.bgm.sid
        },
      }).then(res => {
        this.playUrl = res.data.play_url
      }).catch(err => {
        console.log(err)
      })
    },
    downloadResource() {
      // 用户打开保存文件目录选择框
      // 默认保存为素材名称+.+文件类型
      let suffix = 'm4a'
      let showSaveDialogResult = adobe_cep.showSaveDialogEx("选择保存位置", adobe_cep.pathJoin(adobe_cep.USER_DIR, adobe_cep.EXTENDTION_ID), [suffix], this.bgm.name + "." + suffix, "*." + suffix)
      let filePath = ''
      if (0 === showSaveDialogResult.err) {
        if (showSaveDialogResult.data.length === 0) {
          console.log("用户放弃了保存");
          return
        } else {
          console.log("保存文件位置" + showSaveDialogResult.data);
          filePath = showSaveDialogResult.data
        }
      } else {
        console.log("获取保存位置错误：" + showSaveDialogResult.err)
        return
      }
      //进度条恢复为 0
      this.percentage = 0
      //按钮置灰 不可点击
      this.isDisabled = true
      //展示下载框
      this.show = true
      console.log('正在下载，请稍等。');
      this.$axios({
        url: this.playUrl,
        method: constant.AXIOS.HTTP.METHOD.GET,
        responseType: constant.AXIOS.HTTP.RESPONSE_TYPE.ARRAY_BUFFER, //必须这么写，标注响应的是二进制流
        onDownloadProgress: (progressEvent) => {
          //progressEvent.loaded 下载文件的当前大小
          //progressEvent.total  下载文件的总大小 如果后端没有返回 请让他加上！
          let progressBar = Math.round(progressEvent.loaded / progressEvent.total * 100);
          //接收进度为99%的时候需要留一点前端编译的时间
          if (progressBar >= 99) {
            this.percentage = 99;
            console.log('下载完成，文件正在编译。');
          } else {
            this.percentage = progressBar
          }
        }
      }).then(res => {
        let base64Data = http_util.arrayBufferToBase64(res)
        let writeResult = adobe_cep.writeFile(base64Data, constant.IO.FILE_ENCODE.BASE64, filePath)
        console.log(writeResult)
        //编译文件完成后，进度条展示为100%100
        this.percentage = 100
        //下载完成 可以重新点击按钮下载
        this.isDisabled = false
        //进度条隐藏展示
        this.show = false
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
.box {
  padding: 10px 0;
  text-align: center;
  border: solid 1px var(--el-border-color);
  display: inline-block;
  width: 17%;
  box-sizing: border-box;
  vertical-align: top;
}

.name {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>