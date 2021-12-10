<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          category__item: true,
          'category__item--active': item.tab === currentTab,
        }"
        v-for="(item, index) in catagoryList"
        :key="index"
        @click="() => changeTab(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in contentList" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__content">
          <h4 class="title">{{ item.name }}</h4>
          <p class="sales">月售{{ item.sales }}</p>
          <p class="price">
            <span class="price__yen">&yen;</span>{{ item.price }}
            <span class="price__origin">&yen;{{ item.oldPrice }}</span>
          </p>
          <div class="number">
            <span
              class="number__minus"
              @click="
                () => changeItemToCart(shopId, item._id, item, -1, shopName)
              "
              >-</span
            >
            {{ productList?.[item._id]?.count?? 0 }}
            <span
              class="number__add"
              @click="
                () => changeItemToCart(shopId, item._id, item, 1, shopName)
              "
              >+</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { get } from '@/utils/request.js'
const catagoryList = reactive([
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
])
// Tab切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref('all')
  const changeTab = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, changeTab }
}
// 列表内容相关逻辑
const useCurrentListEffect = (currentTab, route) => {
  const data = reactive({ contentList: [] })
  const getContentData = () => {
    get(`/api/shop/${route.params.id}/products`, { tab: currentTab.value }).then((result) => {
      if (result.data?.errno === 0) {
        data.contentList = result.data?.data
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  watchEffect(() => {
    getContentData()
  })
  const { contentList } = toRefs(data)
  return { contentList }
}

// 购物车相关逻辑
const useCartEffect = (shopName) => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const productList = computed(() => {
    return store.getters.getProductListById(shopId)
  })
  const changeItemToCart = (shopId, productId, productInfo, number, shopName) => {
    store.commit('changeItemToCart', { shopId, productId, productInfo, number, shopName })
  }
  return { productList, changeItemToCart }
}
export default {
  name: 'Content',
  props: ['shopName'],
  setup (props) {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, changeTab } = useTabEffect()
    const { contentList } = useCurrentListEffect(currentTab, route)
    const { productList, changeItemToCart } = useCartEffect(props.shopName)
    return {
      catagoryList,
      currentTab,
      changeTab,
      contentList,
      productList,
      shopId,
      changeItemToCart
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  top: 1.54rem;
  .category {
    overflow-y: scroll;
    width: 0.76rem;
    height: 100%;
    background: $seach-bgcolor;
    border-radius: .02rem;
    &__item {
      line-height: 0.4rem;
      text-align: center;
      color: $content-fontcolor;
      font-size: 0.14rem;
      &--active {
        background: $bgColor;
      }
    }
  }
  .product {
    flex: 1;
    overflow-y: scroll;

    &__item {
      padding: 0.12rem 0;
      margin: 0 0.18rem 0 0.16rem;
      border-bottom: 0.01rem solid $content-bgcolor;
      display: flex;
      &__img {
        height: 0.68rem;
        width: 0.68rem;
      }
      &__content {
        position: relative;
        padding-left: 0.16rem;
        flex: 1;
        color: $content-fontcolor;
        overflow: hidden;
        .title {
          line-height: 0.2rem;
          font-size: 0.14rem;
          margin: 0 0 0.06rem 0;
          @include ellipsis;
        }
        .sales {
          line-height: 0.2rem;
          font-size: 0.12rem;
          margin: 0 0 0.06rem 0;
        }
        .price {
          margin: 0;
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: $hightLight-fontColor;
          &__yen {
            font-size: 0.12rem;
          }
          &__origin {
            padding-left: 0.06rem;
            font-size: 0.12rem;
            text-decoration: line-through;
            color: #999999;
          }
        }
        .number {
          position: absolute;
          bottom: 0;
          right: 0;
          &__minus,
          &__add {
            display: inline-block;
            height: 0.2rem;
            width: 0.2rem;
            border-radius: 50%;
            font-size: 0.16rem;
            text-align: center;
          }
          &__minus {
            margin-right: 0.1rem;
            border: solid 0.01rem #666666;
          }
          &__add {
            margin-left: 0.1rem;
            background: #0091ff;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
