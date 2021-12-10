<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe619;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe61d; </span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe600;</span>
    <span class="search__text"> 山姆会员商店优惠商品 </span>
  </div>
  <div class="banner">
    <img src="../../assets/picture/banner.jpg" alt="" class="banner__img" />
  </div>
  <div class="icons">
    <div v-for="item in iconList" :key="item.id" class="icons__item">
      <img :src="item.imgUrl" alt="" class="icons__item__img" />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'Top',
  setup () {
    const iconList = [
      { id: 1, imgUrl: require('@/assets/picture/超市.png'), desc: '超市' },
      { id: 2, imgUrl: require('@/assets/picture/菜市场.png'), desc: '菜市场' },
      {
        id: 3, imgUrl: require('@/assets/picture/水果店.png'), desc: '水果店'
      }, {
        id: 4, imgUrl: require('@/assets/picture/鲜花.png'), desc: '鲜花'
      }, {
        id: 5, imgUrl: require('@/assets/picture/医药健康.png'), desc: '医药健康'
      }, {
        id: 6, imgUrl: require('@/assets/picture/家居.png'), desc: '家具'
      }, {
        id: 7, imgUrl: require('@/assets/picture/蛋糕.png'), desc: '蛋糕'
      }, {
        id: 8, imgUrl: require('@/assets/picture/签到.png'), desc: '签到'
      }, {
        id: 9, imgUrl: require('@/assets/picture/大牌免运.png'), desc: '大牌免运'
      }, {
        id: 10, imgUrl: require('@/assets/picture/红包.png'), desc: '红包'
      }]
    return {
      iconList
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  color: $content-fontcolor;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    font-size: 0.2rem;
    right: 0;
    top: 0.17rem;
    .iconfont--avtive {
      color: $bgColor;
      width: 0.1rem;
      height: 0.1rem;
      // font-size: 0.1rem;
      // line-height: 0.2rem;
      background-color: #f00;
      border-radius: 50%;
      position: absolute;
      right: 0.01rem;
      top: -0.02rem;
    }
  }
}
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  color: $seach-fontColor;
  border-radius: 0.16rem;
  background: $seach-bgcolor;
  .iconfont {
    display: inline-block;
    font-size: 0.16rem;
    padding: 0 0.08rem 0 0.16rem;
  }
  &__text {
    font-size: 0.14rem;
    display: inline-block;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      margin: 0 auto;
      width: 0.4rem;
      height: 0.4rem;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap {
  background: $content-bgcolor;
  height: 0.1rem;
  margin: 0 -0.18rem;
}
</style>
