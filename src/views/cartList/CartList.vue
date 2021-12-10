<template>
  <div>CartList</div>
  <button @click="handleClick">asd</button>
  <BasePop :msg="'asdasd'" v-if="showPop" @clickConfirm="handleClick" />
  <BaseDocker :currentIndex="2"/>
</template>

<script>
import { ref } from 'vue'
import BasePop from '@/components/BasePop'
import BaseDocker from '@/components/BaseDocker'

export default {
  name: 'CartList',
  components: { BasePop, BaseDocker },
  setup () {
    const showPop = ref(true)
    const handleClick = () => {
      showPop.value = !showPop.value
    }
    return { showPop, handleClick }
  }
}
</script>

<style lang="scss" scoped>
</style>
