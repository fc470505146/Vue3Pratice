<template>
  <div class="show">
    <img :src="item.imgUrl" alt="" class="show__img" />
    <div
    :class="{'show__content':true,'show__content--bordered':hideBorder?false:true}"
    >
      <div class="show__content__title">{{ item.name }}</div>
      <div class="show__content__tags">
        <span class="tag">月售:{{ item.sales }}</span>
        <span class="tag">起送:{{ item.expressLimit }}</span>
        <span class="tag">基础运费:{{ item.expressPrice }}</span>
      </div>
      <p class="show__content__hightLight">
        {{ item.slogan }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowInfo',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";

.show {
  padding-top: 0.12rem;
  display: flex;
  &__img {
    width: 0.56rem;
    height: 0.56rem;
    padding: 0 0.16rem 0 0;
  }
  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    &--bordered {
      border-bottom: 0.01rem solid $content-bgcolor;
    }
    &__title {
      color: $content-fontcolor;
      font-size: 0.16rem;
      line-height: 0.22rem;
      padding-bottom: 0.08rem;
    }
    &__tags {
      color: $content-fontcolor;
      font-size: 0.13rem;
      padding-bottom: 0.08rem;
      .tag {
        padding-right: 0.16rem;
        line-height: 0.18rem;
      }
    }
    &__hightLight {
      color: $hightLight-fontColor;
      font-size: 0.13rem;
      line-height: 0.18rem;
      margin: 0;
    }
  }
}
</style>
