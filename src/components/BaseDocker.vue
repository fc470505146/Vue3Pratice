<template>
  <div class="wrapper__docker">
    <div class="docker">
      <template v-for="item in dockerList" :key="item.id">
        <router-link :to="item.to">
          <div
            :class="{
              docker__item: true,
              'docker__item--active': item.id === currentIndex,
            }"
          >
            <div class="docker__icon iconfont" v-html="item.icon"></div>
            <div class="docker__title">{{ item.title }}</div>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseDocker',
  props: {
    currentIndex: Number
  },
  setup () {
    const dockerList = [
      { id: 1, icon: '&#xe6b8;', title: '首页', to: { name: 'Home' } },
      { id: 2, icon: '&#xe7e5;', title: '购物车', to: { name: 'CartList' } },
      { id: 3, icon: '&#xe7b3;', title: '订单', to: { name: 'OrderList' } },
      { id: 4, icon: '&#xe78b;', title: '我的', to: { name: 'Home' } }]
    return { dockerList }
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/viriables.scss";
a {
  color: initial;
  text-decoration: none;
}
.wrapper__docker {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 0.4rem;
}
.docker {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgcolor;
  color: $content-fontcolor;
  &__item {
    text-align: center;
    &--active {
      color: #1fa4fc;
    }
  }
  &__item:hover {
    cursor: pointer;
  }
  &__icon {
    line-height: 0.29rem;
  }
  &__title {
    display: block;
    line-height: 0.2rem;
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center 10%;
  }
}
</style>
