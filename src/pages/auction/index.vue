<template>
  <view class="container">
    <scroll-view scroll-y="true" style=" height: 100%;">
      <view class="card-container" v-for="item in userList">
        <view class="card-bg"/>
        <view style="padding: 20px">
          <uv-row>
            <text class="text" style="font-weight: 900;font-size: 30px;color: white">识别码：{{ item.code }}</text>
          </uv-row>
          <uv-row v-if="item.id">
            <uv-col :span="2">
              <text class="row-title">编号：</text>
            </uv-col>
            <uv-col :span="8">
              <text class="row-content">{{ item.no }}</text>
            </uv-col>
          </uv-row>
          <uv-row v-if="item.id">
            <uv-col :span="2">
              <text class="row-title">昵称：</text>
            </uv-col>
            <uv-col :span="8">
              <text class="row-content">{{ item.nick }}</text>
            </uv-col>
          </uv-row>
          <uv-row v-if="item.id">
            <uv-col :span="2">
              <text class="row-title">角色：</text>
            </uv-col>
            <uv-col :span="8">
              <text class="row-content">{{ roleName(item) }}</text>
            </uv-col>
          </uv-row>
          <uv-row v-if="!item.id">
            <uv-col :span="8"/>
            <uv-col :span="4">
              <button @click="registerUser(item)" size="mini">确认生成</button>
            </uv-col>
          </uv-row>
        </view>
      </view>
    </scroll-view>
    <button class="btn" @click="newAuction">新建拍卖</button>
  </view>
</template>

<script>
import UvCol from "../../uni_modules/uv-row/components/uv-col/uv-col.vue";
import UvRow from "../../uni_modules/uv-row/components/uv-row/uv-row.vue";

/**
 * @author reone create by 2025/7/22
 */
export default {
  name: "AuctionIndex",
  components: {UvRow, UvCol},
  data() {
    return {
      subData: null
    }
  },
  props: {
    status: {
      type: String,
      default: null
    }
  },
  watch: {},
  created() {
  },
  methods: {
    newAuction(){
      uni.navigateTo({
        url: '/pages/auction/detail'
      })
    }
  }
}
</script>

<style scoped>
.container {
  background-color: transparent;
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
