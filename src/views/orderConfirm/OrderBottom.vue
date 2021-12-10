<template>
  <div class="bottom">
    <div class="bottom__price">
      实付金额 <span>&yen;{{ price }}</span>
    </div>
    <div class="bottom__button" @click="showConfirmOrder">提交订单</div>
  </div>
  <div class="pop" v-if="show">
    <div class="pop__title">确认要离开收银台？</div>
    <div class="pop__content">请尽快完成支付，否则将被取消</div>
    <div class="pop__button">
      <span class="pop__button__cancel" @click="handleSubmitOrder(false)"
        >取消订单</span
      >
      <span class="pop__button__determine" @click="handleSubmitOrder(true)"
        >确认支付</span
      >
    </div>
  </div>
  <BaseMask :show="show" />
  <BasePop
    v-if="errObj.errshow"
    :msg="errObj.msg"
    @clickConfirm="errObj.errClick"
  />
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import BaseMask from '../../components/BaseMask'
import { post } from '@/utils/request.js'
import BasePop, { errObj } from '@/components/BasePop'

// 关于下单的逻辑
const useOrderBottomEffect = () => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  const shopId = route.params.id
  const show = ref(false)

  const shopName = computed(() => {
    return store.getters.getShopNameById(shopId)
  })
  const price = computed(() => {
    return store.getters.getCountAndPriceByShopId(shopId).price
  })
  const productListArr = computed(() => {
    return store.getters.getPLSelectedArr(shopId)
  })
  const showConfirmOrder = () => {
    show.value = !show.value
  }
  const handleSubmitOrder = (submit) => {
    if (submit) {
      post('/api/order', {
        addressId: '1',
        shopId: shopId,
        shopName: shopName.value,
        isCanceled: 'false',
        productList: productListArr.value
      }).then((res) => {
        if (res.data?.errno === 0) {
          store.commit('clearCountById', { shopId, productListArr: productListArr.value })
          router.push({ name: 'Home' })
        }
        // throw new Error('test')
      }).catch((err) => {
        console.log(err)
        errObj.msg = '系统出错,请稍后再试'
        errObj.errshow = true
      })
    } else {
      showConfirmOrder()
    }
  }
  return { price, handleSubmitOrder, show, showConfirmOrder }
}

export default {
  name: 'OrderBottom',
  components: { BaseMask, BasePop },
  setup () {
    const { price, handleSubmitOrder, show, showConfirmOrder } = useOrderBottomEffect()
    return { handleSubmitOrder, show, price, showConfirmOrder, errObj }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0.49rem;
  font-size: 0.14rem;
  display: flex;
  background-color: #fff;
  &__price {
    padding-left: 0.24rem;
    flex: 1;
    color: #333;
    span {
      font-weight: bold;
    }
  }
  &__button {
    width: 0.9rem;
    background-color: #4fb0f9;
    color: #fff;
    text-align: center;
  }
  &__button:hover {
    cursor: pointer;
  }
}
.pop {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 0.04rem;
  padding: 0.24rem 0;
  width: 3.01rem;
  text-align: center;
  &__title {
    font-size: 0.18rem;
    color: #333333;
    line-height: 0.25rem;
    padding-bottom: 0.08rem;
  }
  &__content {
    font-size: 0.14rem;
    color: #666666;
    line-height: 0.2rem;
    padding-bottom: 0.3rem;
  }
  &__button {
    line-height: 0.32rem;
    font-size: 0.14rem;
    span:hover {
      cursor: pointer;
    }
    &__cancel {
      padding: 0 0.12rem;
      display: inline-block;
      margin-right: 0.24rem;
      color: #0091ff;
      border: 0.01rem solid #4fb0f9;
      border-radius: 0.16rem;
    }
    &__determine {
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
