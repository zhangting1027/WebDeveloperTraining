<template>
  <div id="box">
    <!-- 边框 -->
    <div class="biankuang" v-show="showbutton"></div>
    <!-- 相机页面 -->
    <div class="camera">
      <video id="video" ref="video" v-show="showvideo"></video>
    </div>
    <canvas id="canvas" ref="canvas" :width="screenWidth" :height="screenHeight"></canvas>
    <!-- <div class="btn">
      <button @click="takeagain">重拍</button>
      <button @click="takepicture">拍照</button>
      <button @click="goHome">返回</button>
    </div> -->
    <img
      src="~assets/img/pingce04/4-button.png"
      id="startbutton"
      ref="startbutton"
      @click="takepicture()"
      v-show="showbutton"
    /><!-- 微信二维码 -->
    <div v-if="wechartShow" class="weixinDiv">
      <div class="weixinTimerCount">{{ timerCount }}S</div>
    </div>
    <div v-if="wechartShow">
      <transition name="slide-fade">
        <img :src="qrCodeImage" class="weixincode" />
      </transition>
    </div>
  </div>

  <div id="box2" v-if="showphoto">
    <div class="gohome" @click="goHome">
      <img src="~assets/img/pingce02/home.png" />
    </div>
    <div class="again" @click="takeagain">
      <img src="~assets/img/pingce04/photoagain.png" />
    </div>
    <!-- 拍摄成品 -->
    <div id="box3">
      <div class="biankuang"></div>
      <img class="jietuphoto" :src="picture" />
    </div>

    <!-- 装饰部分 -->
    <!-- 分数和等级-->
    <div class="score">
      <span class="text">{{ score }}</span>
    </div>
    <div class="level">
      <span v-if="score <= 45">入门阶段</span>
      <span v-else-if="score <= 65">进阶阶段</span>
      <span v-else>高级阶段</span>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import $ from 'jquery'
export default {
  data() {
    return {
      securityKey: '9DAD3E8E53CC46D4AD2D73C4024207E2',
      // securityKey: '291aee67fdb34df8b5bf557f96e4fb49',
      score: 0,
      video: null,
      mediaStream: null,
      canvas: null,
      photo: null,
      picture: '',
      // 显示相机
      showvideo: true,
      // 显示相片
      showphoto: false,
      // 显示拍照按钮
      showbutton: true,
      screenWidth: 800,
      screenHeight: 600,
      // 定时器
      timerCount: 20,
      // 隐藏微信区
      wechartShow: false,
      // 二维码
      qrCodeImage: '',
    }
  },
  mounted() {
    this.startup()
    this.getscore()
    this.setTime()
  },
  beforeRouteLeave(to, form, next) {
    this.stopBothVideoAndAudio(this.mediaStream)
    next()
  },
  methods: {
    //  base64转码
    base64ToBlob: function ({ b64data = '', contentType = '', sliceSize = 512 } = {}) {
      return new Promise((resolve, reject) => {
        // 使用 atob() 方法将数据解码
        let byteCharacters = atob(b64data)
        let byteArrays = []
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          let slice = byteCharacters.slice(offset, offset + sliceSize)
          let byteNumbers = []
          for (let i = 0; i < slice.length; i++) {
            byteNumbers.push(slice.charCodeAt(i))
          }
          byteArrays.push(new Uint8Array(byteNumbers))
        }
        let result = new Blob(byteArrays, {
          type: contentType,
        })
        resolve(result)
      })
    },
    // stop both mic and camera
    stopBothVideoAndAudio(stream) {
      stream.getTracks().forEach(function (track) {
        if (track.readyState == 'live') {
          track.stop()
        }
      })
    },
    startup() {
      this.video = this.$refs.video
      this.canvas = this.$refs.canvas
      this.photo = this.$refs.photo

      let that = this
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then(function (stream) {
          that.mediaStream = stream
          that.video.srcObject = stream
          that.video.play()
        })
        .catch(function (err) {
          console.log('An error occurred: ' + err)
        })
    },
    // 微信扫码定时器
    setTime() {
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.timerCount--
        if (this.timerCount === 0) {
          clearInterval(this.timer) // 清除定时器
          this.wechartShow = false
        }
      }, 1000)
    },
    takepicture() {
      // 清除定时器
      clearInterval(this.timer)
      this.timerCount = 20

      let context = this.canvas.getContext('2d')

      context.drawImage(video, 0, 0, this.screenWidth, this.screenHeight)
      let data = this.canvas.toDataURL('image/png')
      this.picture = data

      // 显示相片
      this.showvideo = false
      this.showphoto = true
      // 隐藏拍照按钮
      this.showbutton = false
      // 调用截图方法
      this.$nextTick(() => {
        this.toImage()
      })
      this.setTime()

      this.wechartShow = true

      this.showbutton = false
    },
    takeagain() {
      this.showvideo = true
      this.showphoto = false
      this.showbutton = true
      this.picture = ''
      this.wechartShow = false
      clearInterval(this.timer)
      this.timerCount = 20000
    },
    // html2canvas
    // 页面元素转图片
    toImage() {
      html2canvas(document.querySelector('#box2')).then((canvas) => {
        let dataURL = canvas.toDataURL('image/jpeg', 0.8)
        this.imgUrl = dataURL
        // console.log(this.imgUrl);
        console.log(this.imgUrl)
        if (this.imgUrl !== '') {
          this.dialogTableVisible = true
        }
        // 调用API方法
        this.PostPlayerData4ActionQrcode()
      })
    },
    // 发请求
    PostPlayerData4ActionQrcode() {
      var _this = this
      let base64 = this.imgUrl.split(',')[1]
      this.base64ToBlob({ b64data: base64, contentType: 'image/jpeg' }).then((res1) => {
        let formData = new FormData()
        formData.append('PlayingImage', res1, 'upload.jpeg')
        $.ajax({
          type: 'post',
          contentType: false,
          processData: false,
          url: `https://activity.api.troncell.com/api/UserAction/PostPlayerData4ActionQrcode?QrType=AfterGame&SnsType=WeChat&SecurityKey=${this.securityKey}`,
          data: formData,
          success(res) {
            console.log(res, 111)
            _this.qrCodeImage = res.result.qrCodeImage
          },
        })
      })
    },
    // 获得分数 下面是拍照逻辑
    getscore() {
      this.score = this.$route.params.score
    },
    goHome() {
      this.$router.push('/home')
    },
  },
}
</script>

<style>
#box {
  width: 100vw;
  height: 177.777vw;
  position: absolute;
}
/* 边框 */
.biankuang {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(~assets/img/pingce04/4.png) no-repeat center;
  background-size: 100%;
  z-index: 111;
}
/* 微信 */
#box .weixinDiv {
  position: absolute;
  bottom: 2vw;
  left: 50%;
  transform: translateX(-50%);
  z-index: 102;
  width: 60vw;
  height: 30vw;
  background-image: url(../../assets/img/pingce04/5-weixin.png);
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
}
#box .weixincode {
  width: 23vw;
  position: absolute;
  right: 54.4vw;
  bottom: 6vw;
  z-index: 101;
}

#box2 {
  width: 100vw;
  height: 177.777vw;
  position: absolute;
  background: url(~assets/img/pingce04/5.png) no-repeat center;
  background-size: 100%;
}
#box2 .gohome img {
  width: 100%;
}
#box2 .again img {
  width: 100%;
}
#box2 .gohome {
  position: absolute;
  width: 10vw;
  right: 1vw;
  top: 60%;
  z-index: 111;
}
#box2 .again {
  position: absolute;
  width: 10vw;
  right: 1vw;
  top: 30%;
  z-index: 111;
}

/* 分数和等级 */
#box2 .score {
  position: absolute;
  top: 67vw;
  right: 20vw;
  font-size: 9vw;
  font-family: '演示悠然小楷';
  color: #ffffff;
  width: 16vw;
  height: 16vw;
  background-image: url(../../assets/img/pingce04/5-score.png);
  background-size: cover;
  z-index: 102;
}
#box2 .score .text {
  position: absolute;
  top: 0;
  right: 4vw;
}
#box2 .level {
  position: absolute;
  width: 3vw;
  left: 4vw;
  top: 38vw;
  font-size: 3vw;
  font-weight: bold;
  color: #cf2e2e;
  font-family: 'fangong';
  z-index: 102;
}
#box3 {
  position: absolute;
  width: 64vw;
  height: 114vw;
  left: 50%;
  /* transform: translateX(-50%); */
  margin-left: -32vw;
  z-index: 52;
  top: 18vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#box3 .jietuphoto {
  height: 100%;
  transform: rotateY(180deg);
}
.camera {
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
}
.camera video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* border: 1px solid #000; */
}
#startbutton {
  position: absolute;
  width: 16vw;
  bottom: 45vw;
  right: 10vw;
  z-index: 111;
}
#canvas {
  display: none;
  width: 800px;
  height: 600px;
}
.weixinTimerCount {
  position: absolute;
  left: 36vw;
  bottom: 70%;
  font-size: 5vw;
  font-family: '思源黑体';
  color: #ffffff;
}
</style>
