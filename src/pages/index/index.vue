<template>
  <view class="container">
    <image class="container-img" src="/static/container_bg.png"></image>
    <view class="content">
      <input type="text" placeholder="请输入内容" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello h5',
    }
  },
  onLoad() {},
  methods: {
    goMine() {
      uni.navigateTo({
        url: '/pages/mine/index',
      })
    },
  },
}
</script>

<style>
</style>
