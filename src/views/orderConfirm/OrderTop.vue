<template>
  <div class="top">
    <div class="top__icon iconfont" @click="handleBackClick">&#xe679;</div>
    <div class="top__content">确认订单</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'OrderTop',
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.top {
  position: relative;
  height: 1.425rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  &__content {
    line-height: 0.66rem;
    color: #fff;
    font-size: 0.16rem;
    text-align: center;
  }
  &__icon {
    position: absolute;
    color: #fff;
    top: 0.23rem;
    left: 0.185rem;
    font-size: 0.2rem;
  }
  &__icon:hover{
      cursor: pointer;
  }
}
</style>
