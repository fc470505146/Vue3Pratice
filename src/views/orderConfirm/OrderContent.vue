<template>
  <div class="content">
    <div class="content__address">
      <div class="content__address__title">收货地址</div>
      <div class="content__address__position">
        北京理工大学国防科技园2号楼10层
      </div>
      <div class="content__address__user">
        <span class="userName">瑶妹（先生）</span>
        <span class="userPhone">18911024266</span>
      </div>
    </div>
    <div class="content__shop">
      <div class="content__shop__title">{{ shopName }}</div>
      <div class="content__shop__productList">
        <div
          class="content__shop__item"
          v-for="item in productList"
          :key="item._id"
        >
          <img :src="item.imgUrl" class="item__img" />
          <div class="item__info">
            <div class="item__info__title">{{ item.name }}</div>
            <div class="item__info__price">
              <span class="singlePrice">
                <span class="yen">&yen;</span
                >{{ `${item.price}x${item.count}` }}</span
              >
              <span class="totalPrice">
                <span class="yen">&yen;</span
                >{{ (item.price * item.count).toFixed(2) }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from '@vue/reactivity'
const useContentEffect = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const shopName = computed(() => {
    return store.getters.getShopNameById(shopId)
  })
  const productList = computed(() => {
    return store.getters.getPLSelectedArr(shopId)
  })
  const price = computed(() => {
    return store.getters.getCountAndPriceByShopId(shopId).price
  })
  return { shopName, productList, price }
}
export default {
  name: 'OrderContent',
  setup () {
    const { shopName, productList } = useContentEffect()
    return { shopName, productList }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 0.685rem;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  padding: 0 0.18rem;
  &__address {
    position: relative;
    padding: 0.16rem;
    background-color: #fff;
    border-radius: 0.04rem;
    &__title {
      color: #333;
      line-height: 0.22rem;
      font-size: 0.16rem;
      font-weight: bold;
      margin-bottom: 0.14rem;
    }
    &__position {
      line-height: 0.2rem;

      color: #333;
      font-size: 0.14rem;
      margin-bottom: 0.06rem;
    }
    &__user {
      line-height: 0.18rem;

      color: #666;
      font-size: 0.12rem;
      .userName {
        padding-right: 0.06rem;
      }
    }
  }
  &__shop {
    overflow: scroll;
    max-height: 2rem;
    background-color: #fff;
    margin-top: 0.16rem;
    padding: 0.16rem;
    color: #333;
    &__title {
      font-size: 0.16rem;
      line-height: 0.22rem;
      margin-bottom: 0.16rem;
    }
    &__productList {
      max-height: 3.1rem;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    &__item {
      display: flex;
      margin-bottom: 0.16rem;

      .item__img {
        height: 0.46rem;
        width: 0.46rem;
        padding-right: 0.16rem;
      }
      .item__info {
        flex: 1;
        &__title {
          font-size: 0.14rem;
          line-height: 0.2rem;
          padding-bottom: 0.06rem;
        }
        &__price {
          display: flex;
          font-size: 0.12rem;
          line-height: 0.14rem;
          .singlePrice {
            flex: 1;
            color: #e93b3b;
          }
          .totalPrice {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
