<template>
  <div class="box">
    <span class="name">{{ bgm.name }}</span>
    <el-button :disabled="isDisabled" @click="downloadResource(bgm)">点击下载</el-button>
    <el-progress v-if="show" :percentage="percentage"></el-progress>
    <!--  如果素材的类型是音频type===20-->
    <audio controls="controls" style="width: 100px; height: 100px"
           :src="bgm.waves_url">
      Your browser does not support the audio element.
    </audio>
    <!--  除了音频之外的素材-->
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
      percentage: 0,
      isDisabled: false,
      show: false
    }
  },
  methods: {
    downloadResource(bgm) {
      // 用户打开保存文件目录选择框
      let fileName = http_util.getFileNameByUrl(bgm.waves_url);
      let suffix = fileName.split('.')[1];
      // 默认保存为素材名称+.+文件类型
      let showSaveDialogResult = adobe_cep.showSaveDialogEx("选择保存位置", adobe_cep.pathJoin(adobe_cep.USER_DIR, adobe_cep.EXTENDTION_ID), [suffix], bgm.name + "." + suffix, "*." + suffix)
      let filePath = ''
      if (0 === showSaveDialogResult.err) {
        if (showSaveDialogResult.data.length === 0) {
          console.log("用户放弃了保存");
          return
        } else {
          console.log("获取的保存框的值" + showSaveDialogResult.data);
          filePath = showSaveDialogResult.data
        }
      } else {
        console.log("打开保存位置错误：" + showSaveDialogResult.err)
        return
      }
      //进度条恢复为 0
      this.percentage = 0
      //按钮置灰 不可点击
      this.isDisabled = true
      //展示下载框
      this.show = true
      this.$axios({
        url: bgm.download_url,
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
            console.log('正在下载，请稍等。');
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