<template>
  <view class="container">
    <scroll-view scroll-y="true" style=" height: 100%;">
      <view class="card-container" v-for="item in codeList">
        <view class="card-bg"/>

      </view>
    </scroll-view>
    <uv-button color="#A4FF7C" class="fab-button"
               :custom-text-style="{color:'#000000'}"
               icon="plus" icon-size="14">
      添加识别码
    </uv-button>
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
      codeList: ['', '', '', '', '', '', '', '', '', '', '', '']
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
  background-color: transparent;
  height: 100%;
}

.card-container {
  width: 90%;
  height: 20%;
  justify-self: center;
  padding-bottom: 10px;
  padding-top: 5px;
  &:first-child {
    padding-top: 70px;
  }
  &:last-child {
    padding-bottom: 10%;
  }
}

.card-bg {
  background-color: #fff;
  opacity: 0.1;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 5px 8px 12px rgba(0, 0, 0, 1);
}

.fab-button {
  width: 80%;
  height: 40px;
  box-shadow: 5px 8px 12px rgba(0, 0, 0, 0.2);
  border-radius: 40px;
  position: absolute;
  top: 10px;
  justify-self: center;
}
</style>
