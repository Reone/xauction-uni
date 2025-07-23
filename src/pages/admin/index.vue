<template>
  <view class="container">
    <image class="container-img" src="/static/container_bg.png"></image>
    <view class="content">
      <view class="page">
        <uv-subsection :list="tabs.list" :current="tabs.index"
                       mode="subsection"
                       inactive-color="#ffffff"
                       active-color="#A4FF7C"
                       @change="sectionChange"/>

        <swiper style="height: 100%" @change="sectionChange" :current="tabs.index">
          <swiper-item v-for="(item, index) in tabs.list">

          </swiper-item>
        </swiper>

      </view>
    </view>
  </view>
</template>

<script>
import UvSubsection from "../../uni_modules/uv-subsection/components/uv-subsection/uv-subsection.vue";

/**
 * @author reone create by 2025/7/22
 */
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
  props: {},
  watch: {},
  created() {
  },
  methods: {
    sectionChange(index) {
      this.tabs.index = index;
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
