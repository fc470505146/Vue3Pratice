<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Toast',
  props: ['message']
}
/**
 * @return {dataToast,showToast}
 */
export const useToastEffect = () => {
  const dataToast = reactive({
    showToast: false,
    messageToast: ''
  })
  const showToast = (message) => {
    dataToast.showToast = true
    dataToast.messageToast = message
    setTimeout(() => {
      dataToast.showToast = false
      dataToast.messageToast = ''
    }, 2000)
  }
  return { dataToast, showToast }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';

    .toast{
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        padding: .1rem;
        background: rgba(0,0,0,.35);
        color:$bgColor;
    }
</style>
