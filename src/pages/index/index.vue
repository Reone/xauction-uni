<template>
  <view class="container">
    <image class="container-img" src="/static/container_bg.png"></image>
    <view class="content">
      <view class="page">
        <input v-model="code" placeholder="6位识别码" class="input-code" maxlength="6"/>
        <button class="btn" src="/static/btn.png" @click="login">登入</button>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      // code: null,
      code:'252207'
    }
  },
  onLoad() {},
  methods: {
    login() {
      if(this.code === '252207'){
        uni.reLaunch({
          url: '/pages/admin/index',
        })
      }
    },
  },
}
</script>

<style scoped>
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
</style>
