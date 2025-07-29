<template>
  <view class="container">
    <image class="container-img" src="/static/page_bg.png"></image>
    <view class="content">
      <view class="page">
        <view class="info-container">
          <scroll-view class="scroll-view" scroll-y="true">
            <view class="scroll-container">
              <uv-image mode="widthFix" width="100%"
                        src="https://img0.baidu.com/it/u=2778447173,2923413644&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1117"/>

              <text class="info">名称：中国国家最新标准《汽车和挂车类型的术语和定义》（GB/T
                3730．1—2001）中对汽车有如下定义：由动力驱动，具有4个或4个以上车轮的非轨道承载的车辆，主要用于：载运人员和（或）货物；牵引载运人员和（或）货物的车辆；特殊用途。
                [12]
                国产汽车品牌有：集度、五菱、宝骏、红旗、长安、长城、奇瑞、吉利、荣威、比亚迪，蔚来，小鹏汽车，东风等。
                国外汽车品牌有：丰田、大众、奥迪、奔驰、现代、起亚、标致、凯迪拉克，日产等。
                2025年1月8日消息，国家发展改革委、财政部发布关于2025年加力扩围实施大规模设备更新和消费品以旧换新政策的通知。通知提出，完善汽车置换更新补贴标准。
              </text>
              <uv-divider style="height: 1%;padding-bottom: 900upx"/>
            </view>
          </scroll-view>
        </view>
        <view class="bottom-container">
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import UvSubsection from "../../uni_modules/uv-subsection/components/uv-subsection/uv-subsection.vue";
import CodeIndex from "../code/index.vue";
import AuctionIndex from "./index.vue";
import UvImage from "../../uni_modules/uv-image/components/uv-image/uv-image.vue";
import UvDivider from "../../uni_modules/uv-divider/components/uv-divider/uv-divider.vue";

/**
 * @author reone create by 2025/7/27
 */
export default {
  name: "detail",
  components: {UvDivider, UvImage, AuctionIndex, CodeIndex, UvSubsection},
  data() {
    return {
      subData: null
    }
  },
  props: {},
  watch: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped>
.container {

}
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.info-container{
  height: 100%;
  width: 100%;
  overflow: inherit;
  box-shadow: 10upx 16upx 24upx rgba(0, 0, 0, 0.5);
  .scroll-view{
    height: 100%;
    width: 100%;
    .scroll-container{
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      .info{
        padding: 20upx;
        color: white;;
      }
    }
  }
}
.bottom-container{

}
</style>
