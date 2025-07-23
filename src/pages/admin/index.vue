<template>
  <view class="container">
    <image class="container-img" src="/static/container_bg.png"></image>
    <view class="content">
      <view class="page">
        <uv-subsection
            :list="tabs.list"
            style="width: calc(100% - 20px);height: 34px"
            :current="tabs.index"
            mode="subsection"
            inactive-color="#ffffff"
            active-color="#A4FF7C"
            @change="handleSubsectionChange"
        />

        <swiper
            style="height: 100%"
            :current="tabs.index"
            @change="handleSwiperChange"
        >
          <swiper-item v-for="(item, index) in tabs.list" :key="index">
            {{ item + index }}
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
import UvSubsection from "../../uni_modules/uv-subsection/components/uv-subsection/uv-subsection.vue";

export default {
  components: {UvSubsection},
  data() {
    return {
      tabs: {
        list: ['草稿箱', '已发布', '识别码'],
        index: 1
      }
    }
  },
  methods: {
    handleSubsectionChange(index) {
      // 防止事件循环
      if (this.tabs.index !== index) {
        this.tabs.index = index;
      }
    },
    handleSwiperChange(e) {
      const index = e.detail.current;
      // 防止事件循环
      if (this.tabs.index !== index) {
        this.tabs.index = index;
      }
    }
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 10px;
}
</style>