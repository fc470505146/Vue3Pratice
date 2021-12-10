<template>
  <div class="mask" v-if="show" @click="handleClickCart"></div>
  <div class="cart">
    <div class="product" v-if="show">
      <div class="product__header">
        <div
          :class="{
            product__header__icon: true,
            iconfont: true,
            'product__header__icon--active': allSelectedActive,
          }"
          @click="changeAllSelected"
        >
          &#xe608;
        </div>
        <div class="product__header__all" @click="changeAllSelected">全选</div>
        <div class="product__header__clear">
          <span class="product__header__clear__btn" @click="clearCart"
            >清空购物车</span
          >
        </div>
      </div>
      <div class="product__gap"></div>
      <div class="product__content">
        <template v-for="item in productList" :key="item?._id">
          <div class="product__content__item" v-if="item.count != 0">
            <div
              :class="{
                item__icon: true,
                iconfont: true,
                'item__icon--active': item?.unselected,
              }"
              @click="() => changeSelected(item._id, item)"
            >
              &#xe608;
            </div>
            <div class="item__info">
              <img :src="item?.imgUrl" class="item__info__img" />
              <div class="item__info__detail">
                <h4 class="title">{{ item?.name }}</h4>
                <p class="price">
                  <span class="price__yen">&yen;</span>{{ item?.price }}
                  <span class="price__origin">&yen;{{ item?.oldPrice }}</span>
                </p>
              </div>
              <div class="item__info__number">
                <span
                  class="minus"
                  @click="() => changeProductNum(item._id, -1)"
                  >-</span
                >
                {{ item?.count ?? 0 }}
                <span class="add" @click="() => changeProductNum(item._id, 1)"
                  >+</span
                >
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
          class="check__icon__img"
          @click="handleClickCart"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计:<span class="check__info__price">&yen; {{ price }}</span>
      </div>

      <div class="check__button" @click="TogoOrderConfirm">去结算</div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

// 购物车全选、增减相关功能
function useCartListEffect (store, shopId) {
  const productList = computed(() => {
    return store.getters.getProductListById(shopId)
  })
  const allSelectedActive = computed(() => {
    let res = false
    const productList = store.getters.getProductListById(shopId)
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.unselected) {
          res = true
          break
        }
      }
    }
    return res
  })
  const changeProductNum = (productId, number) => {
    store.commit('changeProductNum', { productId, number, shopId })
  }
  const clearCart = () => {
    store.commit('clearCart', { shopId })
  }
  const changeSelected = (productId) => {
    store.commit('changeSelected', { shopId, productId })
  }
  const changeAllSelected = () => {
    const refValue = allSelectedActive.value
    store.commit('changeAllSelected', { shopId, refValue })
  }
  return {
    productList,
    changeProductNum,
    clearCart,
    changeSelected,
    allSelectedActive,
    changeAllSelected
  }
}

// 购物车显示、金额计算相关功能
function useDisplayCountEffect (store, shopId) {
  const router = useRouter()
  const total = computed(() => {
    return store.getters.getCountAndPriceByShopId(shopId).total
  })
  const price = computed(() => {
    return store.getters.getCountAndPriceByShopId(shopId).price
  })
  const show = ref(false)
  const handleClickCart = () => {
    total.value > 0 ? show.value = !show.value : show.value = false
  }
  const TogoOrderConfirm = () => {
    if (price.value > 0) { router.push('/orderConfirm/' + shopId) }
  }
  return { total, handleClickCart, price, show, TogoOrderConfirm }
}
export default {
  name: 'Cart',
  setup () {
    const store = useStore()
    const route = useRoute()
    const shopId = route.params.id
    const {
      productList, changeProductNum, clearCart,
      changeSelected, allSelectedActive, changeAllSelected
    } = useCartListEffect(store, shopId)
    const { total, handleClickCart, price, show, TogoOrderConfirm } = useDisplayCountEffect(store, shopId)
    return {
      shopId,
      total,
      price,
      show,
      handleClickCart,
      productList,
      changeProductNum,
      clearCart,
      changeSelected,
      allSelectedActive,
      changeAllSelected,
      TogoOrderConfirm
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
a {
  text-decoration: none;
  color: initial;
}
.mask {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.cart {
  z-index: 2;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.product {
  &__header {
    padding: 0 0.18rem;

    display: flex;
    color: #333;
    font-size: 0.14rem;
    line-height: 0.52rem;
    &__icon {
      color: #0091ff;
      font-size: 0.2rem;
      margin-right: 0.1rem;
      &--active {
        color: #cdcdb4;
      }
    }
    &__clear {
      flex: 1;
      text-align: right;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__gap {
    border-bottom: 0.01rem solid #f1f1f1;
  }
  &__content {
    max-height: 1.95rem;
    overflow-y: auto;
    padding-bottom: 0.16rem;
    &__item {
      padding: 0 0.18rem;

      display: flex;
      padding-top: 0.16rem;
      .item__icon {
        color: #0091ff;
        line-height: 0.46rem;
        font-size: 0.2rem;
        margin-right: 0.16rem;
        &--active {
          color: #cdcdb4;
        }
      }
      .item__info {
        flex: 1;
        display: flex;
        &__img {
          width: 0.46rem;
          height: 0.46rem;
          margin: 0 0.16rem 0 0;
        }
        &__detail {
          flex: 1;
          line-height: 0.2rem;
          .title {
            font-size: 0.14rem;
            margin: 0;
            color: #333;
          }
          .price {
            margin: 0.06rem 0 0 0;
            color: #e93b3b;
            font-size: 0.14rem;
            &__yen {
              display: inline-block;
              font-size: 0.12rem;
            }
            &__origin {
              display: inline-block;
              padding-left: 0.12rem;
              font-size: 0.2rem;
              color: #999999;
              text-decoration: line-through;
              transform: scale(0.5);
              transform-origin: left 90%;
            }
          }
        }
        &__number {
          line-height: 0.49rem;
          .add,
          .minus {
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 50%;
            line-height: 0.2rem;
            text-align: center;
            font-size: 0.16rem;
          }
          .add {
            background-color: #0091ff;
            color: #fff;
            margin-left: 0.16rem;
          }
          .minus {
            border: 0.01rem solid #333;
            margin-right: 0.16rem;
          }
        }
      }
    }
  }
}
.check {
  display: flex;

  height: 0.49rem;
  line-height: 0.49rem;
  color: #333;
  &__icon {
    width: 0.84rem;
    position: relative;
    &__img {
      display: block;
      height: 0.28rem;
      width: 0.26rem;
      margin: 0.105rem auto;
    }
    &__tag {
      position: absolute;
      padding: 0 0.05rem;
      background-color: $hightLight-fontColor;
      border-radius: 50%;
      min-width: 0.2rem;
      height: 0.2rem;
      font-size: 0.12rem;
      line-height: 0.2rem;
      text-align: center;
      color: #fff;
      top: 0.03rem;
      left: 0.45rem;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    font-size: 0.12rem;
    &__price {
      font-size: 0.18rem;
      color: $hightLight-fontColor;
      font-weight: bold;
    }
  }
  &__button {
    height: 0.49rem;
    width: 0.98rem;
    text-align: center;
    font-size: 0.14rem;
    background: #4fb0f9;
    color: #fff;
  }
}
</style>
