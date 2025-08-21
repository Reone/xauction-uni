<template>
  <view class="container">
    <image class="container-img" src="/static/page_bg.png"></image>
    <view class="content">
      <view class="page">
        <uv-form ref="form" :formData="auctionForm" :rules="rules"
                 style="margin: 10px;"
                 :label-style="{color:'#fff',fontSize:'18px'}"
                 labelPosition="left"
                 label-width="200upx"
        >
          <uv-form-item label="标题" prop="title">
            <uv-input v-model="auctionForm.title" color="#fff" placeholder="请输入拍卖标题"></uv-input>
          </uv-form-item>
          <uv-form-item label="副标题或内容" prop="subTitle" label-position="top" label-width="100%">
            <uv-textarea v-model="auctionForm.subTitle"
                         placeholder="请输入副标题或说明文案"
                         :autoHeight="true" :maxlength="2000"
                         :count="true"></uv-textarea>
          </uv-form-item>
          <uv-form-item label="图片地址" prop="imgUrl">
            <uv-input v-model="auctionForm.imgUrl" color="#fff" placeholder="请输入网络图片地址"></uv-input>
          </uv-form-item>
          <uv-form-item label="起拍价" prop="minPrice">
            <uv-input v-model="auctionForm.minPrice" color="#fff" placeholder="请输入起拍价" type="digit"></uv-input>
          </uv-form-item>
          <uv-form-item label="最高价" prop="maxPrice">
            <uv-input v-model="auctionForm.maxPrice" color="#fff" placeholder="请输入最高价" type="digit"></uv-input>
          </uv-form-item>
          <uv-form-item label="开始时间" prop="startTime">
            <picker mode="date" :value="auctionForm.startTime" @change="onStartTimeChange">
              <uv-input v-model="auctionForm.startTime" color="#fff" placeholder="请输入拍卖开始时间"></uv-input>
            </picker>
          </uv-form-item>
          <uv-form-item label="结束时间" prop="endTime">
            <picker mode="date" :value="auctionForm.endTime" @change="onEndTimeChange">
              <uv-input v-model="auctionForm.endTime" color="#fff" placeholder="请输入拍卖结束时间"></uv-input>
            </picker>
          </uv-form-item>
        </uv-form>

        <button class="btn" @click="addAuction">开始拍卖</button>
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
import UvReadMore from "../../uni_modules/uv-read-more/components/uv-read-more/uv-read-more.vue";
import UvForm from "../../uni_modules/uv-form/components/uv-form/uv-form.vue";
import UvFormItem from "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.vue";
import UvInput from "../../uni_modules/uv-input/components/uv-input/uv-input.vue";
import UvDatetimePicker
  from "../../uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.vue";
import UvTextarea from "../../uni_modules/uv-textarea/components/uv-textarea/uv-textarea.vue";
import {addAuction} from "../../api/auction";
import {toast} from "../../util/common";

/**
 * @author reone create by 2025/7/27
 */
export default {
  name: "detail",
  components: {
    UvTextarea,
    UvDatetimePicker,
    UvInput, UvFormItem, UvForm, UvReadMore, UvDivider, UvImage, AuctionIndex, CodeIndex, UvSubsection
  },
  data() {
    return {
      startTimeDialog: false,
      auctionForm: {
        title: null,
        subTitle: null,
        imgUrl: null,
        minPrice: 0,
        maxPrice: null,
        //startTime默认今天,格式 YYYY-MM-DD
        startTime: new Date().toISOString().split('T')[0],
        endTime: null,
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        subTitle: [
          {required: false, message: '请输入副标题', trigger: 'blur'}
        ],
        imgUrl: [
          {required: false, message: '请选择图片', trigger: 'blur'}
        ],
        minPrice: [
          {required: false, message: '请输入起拍价', trigger: 'blur'}
        ],
        maxPrice: [
          {required: false, message: '请输入最高价', trigger: 'blur'}
        ],
        startTime: [
          {required: false, message: '请输入开始时间', trigger: 'blur'}
        ],
        endTime: [
          {required: false, message: '请输入结束时间', trigger: 'blur'}
        ]
      }
    }
  },
  props: {},
  watch: {},
  created() {
  },
  methods: {
    addAuction() {
      console.log('addAuction', this.auctionForm)
      addAuction(this.auctionForm).then(res => {
        if (res.code === 200) {
          uni.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            uni.navigateBack()
          }, 2000)
        } else {
          uni.showToast({
            title: res.message,
            icon: 'error',
            duration: 2000
          })
        }
      })
    },
    onStartTimeChange(e) {
      this.auctionForm.startTime = e.detail.value
    },
    onEndTimeChange(e) {
      this.auctionForm.endTime = e.detail.value
    }
  }
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

.btn {
  width: 80%;
  border-radius: 14rpx;
  background-color: #A4FF7C;
  font-size: 14px;
  top: 10px;
  justify-self: center;
}
.uv-textarea{
  background-color: transparent;
}
:deep .uni-textarea-textarea{
  color: #fff !important;
}
:deep .uv-textarea__count{
  background-color: transparent !important;
  color: #fff !important;
}

</style>
