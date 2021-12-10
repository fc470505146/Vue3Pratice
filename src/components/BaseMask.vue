<template>
  <div class="mask" v-if="show"></div>
</template>

<script>
export default {
  name: 'BaseMask',
  props: {
    show: Boolean
  },
  setup () {}
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
