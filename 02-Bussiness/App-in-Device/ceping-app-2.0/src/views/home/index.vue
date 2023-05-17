<template>
  <div id="box">
    <img src="~assets/img/pingce01/1-button.png" class="button" @click="goToAnswer()" />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
function goToAnswer() {
  $router.push('/answer')
}
</script>

<style scoped>
#box {
  width: 100vw;
  height: 177.777vw;
  position: relative;
  background: url(~assets/img/pingce01/1.png) no-repeat center;
  background-size: 100%;
}
#box img {
  position: absolute;
  width: 45vw;
  left: 50%;
  transform: translateX(-50%);
  bottom: 25%;
}
</style>
