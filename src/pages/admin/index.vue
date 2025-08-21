<template>
  <view class="container">
    <image class="container-img" src="/static/page_bg.png"></image>
    <view class="content">
      <view class="page">
        <uv-subsection
            :list="tabs.list"
            style="width: calc(100% - 20px);height: 34px;align-self: center;margin: 10px 0"
            :current="tabs.index"
            mode="subsection"
            inactive-color="#ffffff"
            active-color="#A4FF7C"
            @change="handleSubsectionChange"/>
        <swiper
            style="height: 100%"
            :current="tabs.index"
            @change="handleSwiperChange">
          <swiper-item v-for="(item, index) in tabs.list" :key="index">
            <AuctionIndex v-if="index === 0" :is-child-page="true"/>
            <CodeIndex v-if="index === 1"/>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
import UvSubsection from "../../uni_modules/uv-subsection/components/uv-subsection/uv-subsection.vue";
import AuctionIndex from "../auction/index.vue";
import CodeIndex from "../code/index.vue";

export default {
  components: {CodeIndex, AuctionIndex, UvSubsection},
  data() {
    return {
      tabs: {
        list: ['拍卖列表', '识别码'],
        index: 0
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
}
</style>