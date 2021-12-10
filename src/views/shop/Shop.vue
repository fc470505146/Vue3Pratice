<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBack">&#xe679;</div>
      <div class="search__content">
        <div class="search__content__icon iconfont">&#xe600;</div>
        <input
          type="text"
          placeholder="请输入商品名称搜索"
          class="search__content__input"
        />
      </div>
    </div>
    <ShowInfor :item="item" :hideBorder="true" v-show="item._id"/>
    <Content :shopName="item.name"/>
    <Cart/>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { get } from '@/utils/request.js'
import ShowInfor from '@/components/ShowInfo'
import Content from './Content'
import Cart from './Cart.vue'
const useShopInfoEffect = (route) => {
  const data = reactive({ item: { _id: false } })
  const { item } = toRefs(data)
  const getDataItem = () => {
    get(`/api/shop/${route.params.id}`).then((res) => {
      if (res.data?.errno === 0) {
        data.item = res.data.data
      }
    }).catch((err) => { console.log(err) })
  }
  return { item, getDataItem }
}
const useBackRouterEffect = (router) => {
  const handleBack = () => {
    router.back()
  }
  return { handleBack }
}
export default {
  name: 'Shop',
  components: { ShowInfor, Content, Cart },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { item, getDataItem } = useShopInfoEffect(route)
    const { handleBack } = useBackRouterEffect(router)
    getDataItem()

    return { item, handleBack }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';

.wrapper {
  padding: 0 0.18rem;
}
.search {
  margin: 0.2rem 0 0.04rem 0;
  display: flex;
  line-height: 0.32rem;
  &__back {
    width: 0.32rem;
    font-size: 0.22rem;
    color: #b6b6b6;
  }
  &__content {
    flex: 1;
    display: flex;
    background: $seach-bgcolor;
    border-radius: .16rem;

    &__icon {
      width: 0.45rem;
      text-align: center;
      font-size: 0.18rem;
      color: $seach-fontColor;
    }

    &__input {
      flex: 1;
      border: none;
      background: none;
      outline: none;
      padding: 0;
      color: $content-fontcolor;
      font-size: 0.14rem;
        &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
