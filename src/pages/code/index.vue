<template>
  <view class="container">
    <scroll-view scroll-y="true" style=" height: 100%;">
      <view class="card-container" v-for="item in codeList">
        <text class="code-text">129379182</text>
      </view>
    </scroll-view>
    <button class="btn" :loading="codeLoading" loadingMode="" @click="generateCode">生成识别码</button>
  </view>
</template>

<script>
import UvIcon from "../../uni_modules/uv-icon/components/uv-icon/uv-icon.vue";
import UvButton from "../../uni_modules/uv-button/components/uv-button/uv-button.vue";

/**
 * @author reone create by 2025/7/23
 */
export default {
  name: "CodeIndex",
  components: {UvButton, UvIcon},
  data() {
    return {
      codeLoading: false,
      codeList: [{}]
    }
  },
  props: {},
  watch: {},
  created() {
  },
  methods: {
    generateCode() {
      this.codeLoading = true
      setTimeout(() => {
        this.codeList.push({})
        this.codeLoading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.container {
  background-color: transparent;
  height: 100%;
}

.card-container {
  width: 90%;
  height: 20%;
  justify-self: center;
  margin-bottom: 10px;
  margin-top: 5px;
  background-color: #fff;
  opacity: 0.1;
  border-radius: 12px;
  box-shadow: 5px 8px 12px rgba(0, 0, 0, 1);
  &:first-child {
    margin-top: 70px;
  }
  &:last-child {
    margin-bottom: 10%;
  }
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
