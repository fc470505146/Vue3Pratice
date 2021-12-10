<template>
  <div class="wrapper">
    <OrderTop  />
    <OrderContent  />
    <OrderBottom  />
  </div>
</template>

<script>

import OrderTop from './OrderTop'
import OrderContent from './OrderContent'
import OrderBottom from './OrderBottom'

export default {
  name: 'OrderConfirm',
  components: { OrderTop, OrderContent, OrderBottom },
  setup () {
    return { }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #f5f5f5;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
