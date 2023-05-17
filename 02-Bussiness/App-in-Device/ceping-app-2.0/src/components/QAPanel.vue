<template>
  <div id="box" v-show="data">
    <div class="top">
      <div class="topInfo">
        <div class="number">第{{ questionIndex }}题</div>
      </div>
    </div>
    <div class="content">
      <span :class="[data.title.length < 30 ? 'content-text' : 'content-text2']">{{ data.title }}</span>
    </div>
    <div class="time">{{ timerCount }} S</div>
    <div class="bottom">
      <TransitionGroup name="list" tag="div" :css="true" class="bottom-flex">
        <div
          class="answer"
          :class="answerclass(item.prefix)"
          v-for="item in data.questionItems"
          :key="item.id"
          :data-index="index"
          @click="chooseAnswer(item, index)"
        >
          <span>{{ item.content }}</span>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QAPanel',
}
</script>

<script setup>
import gsap from 'gsap'
const $emit = defineEmits()
const props = defineProps({
  title: String,
  data: Object,
  index: Number,
  total: Number,
  questionIndex: String,
  timerCount: Number,
})
function chooseAnswer(answerItem, answerIndex) {
  let score = parseInt(answerItem.score * 25)
  props.data.questionItems.forEach((item) => {
    item.chosen = false
  })
  answerItem.chosen = true
  console.log('answerItem in QAItemPanel', answerItem, score, props.index)
  $emit('answered', score, props.index)
}
function onItemEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    delay: el.dataset.index * 0.05,
    onComplete: done,
  })
}
function onBeforeEnter(el) {
  el.style.opacity = 0
  //el.style.transform.translateX = 50
  //el.style.height = 0
}
function onItemLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    delay: el.dataset.index * 0,
    onComplete: done,
    duration: 0,
    x: 50,
  })
}
const answerclass = function (prefix) {
  switch (prefix) {
    case 'A':
      return 'answer-1'
    case 'B':
      return 'answer-2'
    case 'C':
      return 'answer-3'
    case 'D':
      return 'answer-4'
    case 'E':
      return 'answer-5'
    default:
      console.log('nothing happened')
      break
  }
}
</script>

<style scoped>
@font-face {
  font-family: '演示悠然小楷';
  src: url(../assets/font/演示悠然小楷.ttf);
}
.top {
  position: absolute;
  top: 28%;
  text-align: center;
  font-size: 7vw;
  color: #946652;
  font-family: '演示悠然小楷';
}
.content {
  position: absolute;
  top: 35%;
  width: 58%;
}
.content-text {
  font-family: '思源黑体';
  font-size: 3.4vw;
  line-height: 6vw;
  font-weight: bold;
}
.content-text2 {
  font-family: '思源黑体';
  font-size: 3.2vw;
  line-height: 4vw;
  font-weight: bold;
}
.time {
  position: absolute;
  top: 45%;
  width: 50%;
  font-family: '思源黑体';
  color: #946652;
  font-size: 3vw;
  text-align: center;
}
.bottom {
  position: relative;
  top: 21%;
  width: 86%;
}
.bottom-flex {
  height: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.answer {
  position: relative;
  /* line-height: 10vw; */
  height: 10vw;
  text-align: center;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  font-size: 3.6vw;
  font-family: '思源黑体';
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.answer-1 {
  background-image: url(../assets/img/pingce02/2-a.png);
  width: 68vw;
}
.answer-2 {
  background-image: url(../assets/img/pingce02/2-b.png);
  width: 74vw;
}
.answer-3 {
  background-image: url(../assets/img/pingce02/2-c.png);
  width: 80vw;
}
.answer-4 {
  background-image: url(../assets/img/pingce02/2-d.png);
  width: 86vw;
}
.answer-5 {
  background-image: url(../assets/img/pingce02/2-e.png);
  width: 92vw;
}
</style>
