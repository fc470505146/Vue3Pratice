<template>
  <div class="mask" v-if="show"></div>
  <div class="pop" v-if="show">
    <div class="pop__title">确认要离开收银台？</div>
    <div class="pop__content">请尽快完成支付，否则将被取消</div>
    <div class="pop__button">
      <span class="pop__button__cancel">取消订单</span>
      <span class="pop__button__determine">确认支付</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  props: ['show'],
  setup (props) {

  }
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
.pop {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 4px;
  padding: 0.24rem 0;
  width: 3.01rem;
  text-align: center;
  &__title {
    font-size: 18px;
    color: #333333;
    line-height: 0.25rem;
    padding-bottom: 0.08rem;
  }
  &__content {
    font-size: 14px;
    color: #666666;
    line-height: 0.2rem;
    padding-bottom: 0.3rem;
  }
  &__button {
    line-height: 0.32rem;
    font-size: 14px;
    span:hover {
      cursor: pointer;
    }
    &__cancel {
      padding: 0 0.12rem;
      display: inline-block;
      margin-right: 0.24rem;
      color: #0091ff;
      border: 0.01rem solid #4fb0f9;
      border-radius: 16px;
    }
    &__determine {
      padding: 0 0.12rem;
      display: inline-block;
      color: #fff;
      background: #4fb0f9;
      border: 0.01rem solid #4fb0f9;
      border-radius: 16px;
    }
  }
}
</style>
