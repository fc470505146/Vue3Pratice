import { createStore } from 'vuex'
function Shop (shopId, shopName) {
  this.shopId = shopId
  this.shopName = shopName
  this.productList = {}
}
const getProductList = (state, shopId) => {
  return state.cartList[shopId]?.productList
}
const setLocalCartList = (state) => {
  localStorage.cartList = JSON.stringify(state.cartList)
}
const getLocalCartList = () => {
  return localStorage.cartList ? JSON.parse(localStorage.cartList) : {}
}
export default createStore({
  state: {
    cartList: getLocalCartList()
    // 第一层:shopId
    // 1: {
    // shopId:1
    // shopName:''
    // productList{
    // 1: {
    //   _id: '1',
    //   name: '番茄250g/份',
    //   imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //   sales: 10,
    //   price: 33.6,
    //   oldPrice: 39.6,
    //   count: 2
    //   unselected: true / false
    // }
    // }
    // }
  },
  mutations: {
    changeItemToCart (state, payload) {
      const { shopId, productId, productInfo, number, shopName } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) {
        shopInfo = new Shop(shopId, shopName)
      }
      const productList = shopInfo.productList
      let product = productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.unselected = false
      product.count += number
      if (product.count < 0) product.count = 0
      productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeProductNum (state, payload) {
      const { shopId, productId, number } = payload
      const productList = getProductList(state, shopId)
      const product = productList[productId]
      product.unselected = false
      product.count += number
      if (product.count <= 0) {
        delete productList[productId]
      }
      setLocalCartList(state)
    },
    clearCart (state, payload) {
      const { shopId } = payload
      state.cartList[+shopId].productList = {}
      setLocalCartList(state)
    },
    changeSelected (state, payload) {
      const { shopId, productId } = payload
      const productList = getProductList(state, shopId)
      const product = productList[productId]
      product.unselected = !product.unselected
      setLocalCartList(state)
    },
    changeAllSelected (state, payload) {
      const { shopId, refValue } = payload
      const productList = getProductList(state, shopId)
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          product.unselected = !refValue
        }
      }
      setLocalCartList(state)
    },
    clearCountById (state, payload) {
      const { shopId, productListArr } = payload
      const productList = getProductList(state, shopId)
      productListArr.forEach((item) => {
        productList[item._id].count = 0
      })
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getCountAndPriceByShopId: (state) => (shopId) => {
      const productList = state.cartList[shopId]?.productList
      let total = 0
      let price = 0
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          total += product.count
          if (!product.unselected) { price += (product.count * product.price) }
        }
      }
      return { total, price: price.toFixed(2) }
    },
    getProductListById: (state) => (shopId) => {
      return getProductList(state, shopId)
    },
    getShopNameById: (state) => (shopId) => {
      return state.cartList?.[shopId]?.shopName
    },
    getPLSelectedArr: (state) => (shopId) => {
      const productList = getProductList(state, shopId)
      const products = []
      for (const i in productList) {
        if (!productList[i].unselected && productList[i].count > 0) { products.push(productList[i]) }
      }
      return products
    }
  }
})
