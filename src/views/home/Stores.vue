<template>
  <div class="stores">
    <div class="stores__title">附近店铺</div>
    <router-link
      v-for="item in storeList"
      :to="`/shop/${item._id}`"
      :key="item._id">
      <ShowInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShowInfo from '@/components/ShowInfo'
const useStoreEffective = () => {
  const storeList = ref([])
  get('/api/shop/hot-list')
    .then(res => {
      if (res.data?.errno === 0) {
        storeList.value = res.data?.data
      }
    })
    .catch(err => {
      console.log(err)
    })
  return { storeList }
}
export default {
  components: { ShowInfo },
  name: 'Stores',
  setup () {
    const { storeList } = useStoreEffective()
    return {
      storeList
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
.stores {
  a{
    text-decoration: none;
  }
  &__title {
    color: $content-fontcolor;
    font-size: 0.18rem;
    font-weight: normal;
    padding: 0.16rem 0 0.02rem 0;
  }
}
</style>
