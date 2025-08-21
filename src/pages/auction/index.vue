<template>
  <view class="container">
    <image class="container-img" src="/static/page_bg.png" v-if="!isChildPage"/>
    <scroll-view scroll-y="true" style=" height: 100%;">
      <view class="card-container" v-for="item in auctionList">
        <view class="card-bg"/>
        <view style="padding: 20px">
          <uv-row>
            <text class="text" style="font-weight: 900;font-size: 30px;color: white">{{ item.title }}</text>
          </uv-row>
          <uv-row v-if="item.id">
            <uv-col :span="2">
              <text class="row-title">编号：</text>
            </uv-col>
            <uv-col :span="8">
              <text class="row-content">{{ item.id }}</text>
            </uv-col>
          </uv-row>

        </view>
      </view>
    </scroll-view>
    <button class="btn" @click="newAuction" v-if="isAdmin()">新建拍卖</button>
  </view>
</template>

<script>
import UvCol from "../../uni_modules/uv-row/components/uv-col/uv-col.vue";
import UvRow from "../../uni_modules/uv-row/components/uv-row/uv-row.vue";
import {isAdmin} from "../../util/user";
import {auctionList} from "../../api/auction";

/**
 * @author reone create by 2025/7/22
 */
export default {
  name: "AuctionIndex",
  components: {UvRow, UvCol},
  data() {
    return {
      auctionList: []
    }
  },
  props: {
    isChildPage: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: null
    }
  },
  watch: {},
  created() {
    this.loadData()
  },
  methods: {
    isAdmin,
    loadData() {
      auctionList().then(res => {
        this.auctionList = res.data
      })
    },
    newAuction(){
      uni.navigateTo({
        url: '/pages/auction/add'
      })
    }
  }
}
</script>

<style scoped>
.container {
  background-color: transparent;
}
.card-container {
  width: 90%;
  height: 20%;
  justify-self: center;
  margin-bottom: 20upx;
  position: relative;
  margin-top:10upx;
  &:first-child {
    margin-top: 120upx;
  }
  &:last-child {
    margin-bottom: 10%;
  }
}
.card-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.1;
  border-radius: 12upx;
  box-shadow: 5upx 8upx 12upx rgba(0, 0, 0, 1);
}
.btn {
  width: 80%;
  border-radius: 14rpx;
  background-color: #A4FF7C;
  position: absolute;
  font-size: 14px;
  top: 10px;
  justify-self: center;
}
</style>
