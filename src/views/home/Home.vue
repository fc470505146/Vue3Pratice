<template>
  <div class="wrapper">
    <Top />
    <Stores />
  </div>
  <BaseDocker :currentIndex="1" />
</template>
<script>
import BaseDocker from '@/components/BaseDocker'
import Top from './Top'
import Stores from './Stores'
export default {
  name: 'Home',
  components: { BaseDocker, Top, Stores }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem;
  overflow-y: auto;
}
</style>
