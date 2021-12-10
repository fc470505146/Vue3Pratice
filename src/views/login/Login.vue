<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        v-model="data.username"
        placeholder="请输入手机号码"
        type="text"
        class="wrapper__input__content"
      />
    </div>
    <div class="wrapper__input">
      <input
        v-model="data.password"
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__link">
      <span class="wrapper__link__content" @click="handleRegister"
        >立即注册</span
      ><span class="wrapper__link__border">|</span
      ><span class="wrapper__link__content">忘记密码</span>
    </div>
  </div>
  <Toast v-show="dataToast.showToast" :message="dataToast.messageToast" />
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request'
import Toast, { useToastEffect } from '@/components/Toast'
/**
 *
 * @return {data, handleLogin}//数据信息和跳转登录事件
 */
const useLoginEffect = (showToast, router) => {
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = () => {
    if (data.username === '' || data.password === '') {
      showToast('用户名或密码不能为空')
      return
    }
    post('/api/user/login', data
    ).then((res) => {
      if (res.data?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    }).catch((err) => {
      showToast('请求失败')
      console.log(err)
    })
  }
  return { data, handleLogin }
}

const handleRegisterClick = (router) => {
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}
export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const router = useRouter()
    const { dataToast, showToast } = useToastEffect()
    const { data, handleLogin } = useLoginEffect(showToast, router)
    const { handleRegister } = handleRegisterClick(router)
    return {
      handleLogin, handleRegister, data, dataToast
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    height: 0.48rem;
    background: #f9f9f9;
    border-radius: 0.06rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    &__content {
      padding: 0;
      width: 100%;
      line-height: 0.48rem;
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.16rem;
      border: none;
      background: none;
      outline: none;
    }
  }
  &__login-button {
    line-height: 0.48rem;
    background: #0091ff;
    font-size: 0.16rem;
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    border-radius: 0.04rem;
    text-align: center;
    color: $bgColor;
  }
  &__link {
    margin: 0 1.18rem;
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    min-width: 1.78rem;
    overflow: hidden;
    white-space: nowrap;
    &__content {
      padding: 0 0.12rem;
      line-height: 0.2rem;
    }
    &__border {
      display: inline-block;
      line-height: 0.17rem;
      width: 0.03rem;
    }
  }
}
</style>
