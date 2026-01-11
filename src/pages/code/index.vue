<template>
  <view class="container">
    <scroll-view scroll-y="true" style=" height: 100%;">
      <view class="card-container" v-for="item in userList">
        <view class="card-bg"/>
        <view style="padding: 20upx">
          <uv-row>
            <text class="text" style="font-weight: 900;font-size: 45upx;color: white">识别码：{{ item.code }}</text>
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
    <button class="btn" :loading="codeLoading" loadingMode="" @click="prepareCode">生成识别码</button>
  </view>
</template>

<script>
import UvIcon from "../../uni_modules/uv-icon/components/uv-icon/uv-icon.vue";
import UvButton from "../../uni_modules/uv-button/components/uv-button/uv-button.vue";
import {generateCode, registerUser, userList} from "../../api/user";
import UvCol from "../../uni_modules/uv-row/components/uv-col/uv-col.vue";
import UvRow from "../../uni_modules/uv-row/components/uv-row/uv-row.vue";

/**
 * @author reone create by 2025/7/23
 */
export default {
  name: "CodeIndex",
  components: {UvRow, UvCol, UvButton, UvIcon},
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
    roleName(item) {
      switch (item.role) {
        case 0:
          return '会员'
        case 1:
          return '管理员'
        case -1:
          return '超级管理员'
      }
    },
    loadData() {
      userList().then(res => {
        this.userList = res.data.filter(item => item.id && item.id !== 0)
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

<style lang="scss" scoped>
.container {
  background-color: transparent;
  height: 100%;
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
  border-radius: 12upx;
  background-color: #A4FF7C;
  position: absolute;
  font-size: 24upx;
  top: 20upx;
  justify-self: center;
}

.row-content {
  font-size: 24upx;
  color: white;
}

.row-title {
  font-size: 24upx;
  color: white;
}

.uv-row {
  margin-bottom: 12upx;
}
</style>
