<template>
  <view class="container">
    <scroll-view scroll-y="true" style=" height: 100%;">
      <view class="card-container" v-for="item in userList">
        <text class="code-text">{{ item.code }}</text>
        <text class="code-text">已生成</text>
        <text class="code-text">{{ JSON.stringify(item) }}</text>
        <button @click="registerUser(item)">确认生成</button>
      </view>
    </scroll-view>
    <button class="btn" :loading="codeLoading" loadingMode="" @click="prepareCode">生成识别码</button>
  </view>
</template>

<script>
import UvIcon from "../../uni_modules/uv-icon/components/uv-icon/uv-icon.vue";
import UvButton from "../../uni_modules/uv-button/components/uv-button/uv-button.vue";
import {generateCode, registerUser, userList} from "../../api/user";

/**
 * @author reone create by 2025/7/23
 */
export default {
  name: "CodeIndex",
  components: {UvButton, UvIcon},
  data() {
    return {
      codeLoading: false,
      userList: []
    }
  },
  props: {},
  watch: {},
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      userList().then(res => {
        this.userList = res.data
      })
    },
    prepareCode() {
      this.codeLoading = true
      generateCode().then(res => {
        const code = res.data
        //在userList首位加一个新的元素
        this.userList.unshift({
          code: code
        })
        this.codeLoading = false
      })
    },
    registerUser(item) {
      if (item.code) {
        registerUser({
          code: item.code
        }).then(res => {
          //将列表中code为item.code的元素替换成res.data
          this.userList = this.userList.map(item => {
            if (item.code === res.data.code) {
              return res.data
            }
            return item
          })
        })
      }
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
