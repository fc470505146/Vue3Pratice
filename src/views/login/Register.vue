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
    <div class="wrapper__input">
      <input
        v-model="data.confirmPassword"
        type="password"
        class="wrapper__input__content"
        placeholder="请输入确认密码"
      />
    </div>
    <div class="wrapper__login-button" @click="handleRegister">注册</div>
    <div class="wrapper__link">
      <span class="wrapper__link__content" @click="toLogin">前往登录</span>
    </div>
  </div>
  <Toast v-show="dataToast.showToast" :message="dataToast.messageToast"/>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'
/**
 * @param {router,showToast}
 * @return {data,handleRegister}
 */
// 处理注册逻辑
function useRegisterEffect (router, showToast) {
  const data = reactive({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const handleRegister = () => {
    if (data.username === '' || data.password === '' || data.confirmPassword === '') {
      showToast('用户名或密码不能为空')
      return
    }
    if (data.confirmPassword !== data.password) {
      showToast('密码不一致')
      return
    }
    post('/api/user/register', data).then((res) => {
      if (res.data?.errno === 0) { router.push({ name: 'Login' }) } else {
        showToast('注册失败')
      }
    }).catch((err) => {
      showToast('请求失败')
      console.log(err)
    })
  }

  return { data, handleRegister }
}

// 处理登录跳转
const handleLoginEffect = (router) => {
  const toLogin = () => {
    router.push({ name: 'Login' })
  }
  return { toLogin }
}
export default {
  components: { Toast },
  name: 'Register',
  setup () {
    const router = useRouter()
    const { toLogin } = handleLoginEffect(router)
    const { dataToast, showToast } = useToastEffect()
    const { data, handleRegister } = useRegisterEffect(router, showToast)
    return {
      toLogin, handleRegister, data, dataToast
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';

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
