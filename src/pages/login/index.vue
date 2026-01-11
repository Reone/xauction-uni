<template>
  <view class="container">
    <image class="container-img" src="/static/container_bg.png"></image>
    <text class="title-txt">X-Auction</text>
    <view class="content">
      <view class="page">
        <text class="version">0809</text>
        <input v-model="code" placeholder="6位识别码" class="input-code" maxlength="6"/>
        <button class="btn" @click="login" :loading="loading" :disabled="loading">{{ loading ? '登录中...' : '登入' }}</button>
      </view>
    </view>
  </view>
</template>

<script>

import {loginByCode} from "../../api/user";

export default {
  data() {
    return {
      code: '',
      loading: false
    }
  },
  onLoad() {
    // 清除旧的登录信息
    uni.removeStorageSync('token')
    uni.removeStorageSync('user')
  },
  methods: {
    login() {
      if (!this.code || this.code.length !== 6) {
        uni.showToast({
          title: '请输入6位识别码',
          icon: 'none'
        })
        return
      }

      this.loading = true
      loginByCode({code: this.code}).then(res => {
        const user = res.data.user || res.data
        const token = res.data.token

        uni.setStorageSync('token', token)
        uni.setStorageSync('user', user)

        if (user.role === 0) {
          uni.navigateTo({
            url: '/pages/auction/index'
          })
        } else {
          uni.navigateTo({
            url: '/pages/admin/index'
          })
        }
      }).catch(err => {
        console.error('登录失败:', err)
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>


.title-txt {
  color: #fff;
  font-size: 34px;
  font-weight: 800;
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  justify-self: center;
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .input-code {
    background-color: #ffffff;
    padding: 30rpx 40rpx;
    border-radius: 14rpx;
    text-align: center;
    letter-spacing: 10px;
    font-weight: 500;
    font-size: large;
  }

  .btn {
    top: 30%;
    border-radius: 14rpx;
    background-color: #A4FF7C;
    color: black;
    font-size: 16px;
    padding: 6rpx 150rpx;
  }
}

.version {
  position: absolute;
  top: 10%;
  left: 10%;
  justify-self: center;
  color: #ffffff;
  font-size: 9px;
  opacity: 0.5;
}
</style>
