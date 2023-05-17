<template>
  <div id="box">
    <span class="score">{{ score }}</span>
    <div class="level">
      <span v-if="score <= 45">入门阶段</span>
      <span v-else-if="score <= 65">进阶阶段</span>
      <span v-else>高级阶段</span>
    </div>
    <div class="photo" @click="tophoto()">
      <img src="~assets/img/pingce03/3-button.png" />
    </div>
    <div class="gohome" @click="goHome">
      <img src="~assets/img/pingce02/home.png" />
    </div>
    <div class="timer">{{ timerCount }}S</div>
  </div>
</template>

<script>
export default {
  name: 'score',
  data() {
    return {
      score: '',
      timerCount: 15,
    }
  },
  mounted() {
    this.getscore()
    this.setTime()
  },
  unmounted() {
    clearInterval(this.timer)
  },
  methods: {
    getscore() {
      this.score = this.$route.params.score
    },
    tophoto() {
      this.$router.push({ path: `/takephoto/${this.score}` })
    },
    goHome() {
      this.$router.push('/home')
    },
    setTime() {
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.timerCount--
        if (this.timerCount === 0) {
          clearInterval(this.timer) // 清除定时器
          this.$router.push('/home')
        }
      }, 1000)
    },
  },
}
</script>

<style scoped>
@font-face {
  font-family: '演示悠然小楷';
  src: url(../../assets/font/演示悠然小楷.ttf);
  font-family: 'fangong';
  src: url(../../assets/font/fangong.ttf);
}
#box {
  width: 100vw;
  height: 177.777vw;
  position: relative;
  background: url(~assets/img/pingce03/3.png) no-repeat center;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#box .score {
  position: absolute;
  font-family: '演示悠然小楷';
  top: 38vw;
  font-size: 10vw;
  font-weight: bold;
}
#box .level {
  position: absolute;
  font-family: 'fangong';
  top: 63vw;
  font-size: 10vw;
  color: #946652;
}
#box .photo {
  position: absolute;
  top: 85vw;
}
#box .photo img {
  width: 50vw;
}
#box .gohome {
  position: absolute;
  right: 4vw;
  bottom: 2vh;
}
#box .timer {
  position: absolute;
  bottom: 70vw;
  font-family: '思源黑体';
  font-size: 5vw;
}
</style>
