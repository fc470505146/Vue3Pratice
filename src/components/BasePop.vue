<template>
  <div class="msg">
    <div class="content">{{ msg }}</div>
    <div class="btn">
      <span class="btn__click" @click="handleConfirm">确认</span>
    </div>
  </div>
  <BaseMask :show="true" />
</template>

<script>
import { reactive } from '@vue/reactivity'
import BaseMask from './BaseMask.vue'
export const errObj = reactive({ msg: '', errshow: false, errClick: () => { errObj.errshow = !errObj.errshow } }
)
export default {
  name: 'BasePop',
  props: {
    msg: String
  },
  emits: {
    clickConfirm: true
  },
  components: { BaseMask },
  setup (props, { emit }) {
    const handleConfirm = () => {
      emit('clickConfirm')
    }
    return { handleConfirm }
  }

}
</script>

<style lang="scss" scoped>
.msg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3rem;
  padding: 0.16rem;
  background-color: #fff;
  z-index: 2;
  text-align: center;
  .content {
    overflow-wrap: break-word;
    line-height: 0.32rem;
    font-size: 0.16rem;
    padding-bottom: 0.16rem;
  }
  .btn {
    line-height: 0.32rem;
    font-size: 0.14rem;
    span:hover {
      cursor: pointer;
    }
    &__click {
      padding: 0 0.12rem;
      display: inline-block;
      color: #fff;
      background: #4fb0f9;
      border: 0.01rem solid #4fb0f9;
      border-radius: 0.16rem;
    }
  }
}
</style>
