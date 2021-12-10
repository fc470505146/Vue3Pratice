<template>
  <div class="order-list-wrapper">
    <div class="my-order">我的订单</div>
    <div class="order_content">
      <div class="order-list">
        <div class="order-list__item">
          <div class="order-list__item__title">
            <span class="shop-name">沃尔玛</span>
            <span class="order-state">已取消</span>
          </div>
          <div class="item__detail">
            <div class="item__imgs">
              <img
                src="http://www.dell-lee.com/imgs/vue3/near.png"
                class="item__imgs__img"
              />
              <img
                src="http://www.dell-lee.com/imgs/vue3/near.png"
                class="item__imgs__img"
              />
              <img
                src="http://www.dell-lee.com/imgs/vue3/near.png"
                class="item__imgs__img"
              />
              <img
                src="http://www.dell-lee.com/imgs/vue3/near.png"
                class="item__imgs__img"
              />
            </div>
            <div class="item__info">
              <div class="price">¥66.69</div>
              <div class="product-num">共2件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BaseDocker :currentIndex="3" />
</template>

<script>
import BaseDocker from '@/components/BaseDocker'
export default {
  name: 'OrderList',
  components: { BaseDocker },
  setup () { }
}
</script>

<style lang="scss" scoped>
.order-list-wrapper {
  background-color: #f5f5f5;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .order_content {
    padding: 0.16rem 0.18rem;
    .order-list {
      &__item {
        background-color: #fff;
        border-radius: 0.04rem;
        padding: 0.16rem;
        &__title {
          display: flex;
          justify-content: space-between;
          padding-bottom: .16rem;
          .shop-name {
            line-height: 0.22rem;
            font-size: 0.16rem;
            color: #333;
          }
          .order-state {
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: #999;
          }
        }
        .item__detail {
          display: flex;
        }
        .item__imgs {
          flex: 1;
          &__img {
            width: 0.4rem;
            height: 0.4rem;
            padding-right: 0.12rem;
          }
        }
        .item__info {
          .price {
            padding-bottom: .04rem;
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: #e93b3b;
            text-align: right;
          }
          .product-num {
            font-size: .12rem;
            color: #333333;
            text-align: right;
            line-height: .14rem;
          }
        }
      }
    }
  }
}
.my-order {
  background-color: #fff;
  line-height: 0.44rem;
  text-align: center;
  color: #333;
  font-size: 0.16rem;
}
</style>
