<template>
  <view class="add-page">
    <uv-navbar
        title="新建拍卖"
        :autoBack="true"
        left-text="返回"
        bgColor="transparent"
        :titleStyle="navbarTitle"
        :placeholder="true"
    />

    <scroll-view scroll-y class="form-scroll" :show-scrollbar="false">
      <uv-form ref="form" :formData="auctionForm" :rules="rules">
        <uv-form-item label="标题" prop="title">
          <uv-input v-model="auctionForm.title" placeholder="请输入拍卖标题" />
        </uv-form-item>

        <uv-form-item label="副标题/简介" prop="subTitle">
          <uv-textarea v-model="auctionForm.subTitle" placeholder="用于吸引买家关注" :autoHeight="true" :maxlength="2000" />
        </uv-form-item>

        <uv-form-item label="拍品图片" prop="imgUrl">
          <uv-upload
              :fileList="fileList"
              name="files"
              :maxCount="1"
              :previewFullImage="true"
              :maxSize="5 * 1024 * 1024"
              @afterRead="afterRead"
              @delete="deletePic"
          />
          <text class="upload-hint">建议上传 750×420 以上高清图</text>
        </uv-form-item>

        <uv-form-item label="起拍价" prop="minPrice">
          <uv-input v-model="auctionForm.minPrice" placeholder="请输入起拍价" type="digit" />
        </uv-form-item>

        <uv-form-item label="封顶价" prop="maxPrice">
          <uv-input v-model="auctionForm.maxPrice" placeholder="可选，封顶价格" type="digit" />
        </uv-form-item>

        <uv-form-item label="开始时间" prop="startTime">
          <picker mode="date" :value="auctionForm.startTime" @change="onStartTimeChange">
            <uv-input v-model="auctionForm.startTime" placeholder="请选择日期" readonly />
          </picker>
        </uv-form-item>

        <uv-form-item label="结束时间" prop="endTime">
          <picker mode="date" :value="auctionForm.endTime" @change="onEndTimeChange">
            <uv-input v-model="auctionForm.endTime" placeholder="请选择日期" readonly />
          </picker>
        </uv-form-item>
      </uv-form>
    </scroll-view>

    <button class="submit-btn" :loading="submitting" :disabled="submitting" @click="addAuction">
      {{ submitting ? '提交中...' : '发布拍卖' }}
    </button>
  </view>
</template>

<script>
import UvForm from "../../uni_modules/uv-form/components/uv-form/uv-form.vue";
import UvFormItem from "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.vue";
import UvInput from "../../uni_modules/uv-input/components/uv-input/uv-input.vue";
import UvTextarea from "../../uni_modules/uv-textarea/components/uv-textarea/uv-textarea.vue";
import UvNavbar from "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.vue";
import UvUpload from "../../uni_modules/uv-upload/components/uv-upload/uv-upload.vue";
import {addAuction} from "../../api/auction";
import {toast} from "../../util/common";

export default {
  name: "add",
  components: {UvTextarea, UvInput, UvFormItem, UvForm, UvNavbar, UvUpload},
  data() {
    return {
      submitting: false,
      fileList: [],
      auctionForm: {
        title: '',
        subTitle: '',
        imgUrl: '',
        minPrice: '',
        maxPrice: '',
        status: 1,
        startTime: new Date().toISOString().split('T')[0],
        endTime: ''
      },
      rules: {
        title: [{required: true, message: '请输入标题', trigger: 'blur'}],
        minPrice: [{required: true, message: '请输入起拍价', trigger: 'blur'}],
        startTime: [{required: true, message: '请选择开始时间', trigger: 'change'}],
        endTime: [{required: true, message: '请选择结束时间', trigger: 'change'}]
      },
      navbarTitle: {
        color: '#0f5132',
        fontWeight: 600
      }
    }
  },
  methods: {
    validateForm() {
      if (!this.auctionForm.title) {
        toast('请输入标题')
        return false
      }
      if (!this.auctionForm.minPrice) {
        toast('请输入起拍价')
        return false
      }
      if (!this.auctionForm.startTime || !this.auctionForm.endTime) {
        toast('请选择时间范围')
        return false
      }
      if (new Date(this.auctionForm.endTime) < new Date(this.auctionForm.startTime)) {
        toast('结束时间需晚于开始时间')
        return false
      }
      if (!this.auctionForm.imgUrl) {
        toast('请上传拍品图片')
        return false
      }
      return true
    },
    async addAuction() {
      if (this.submitting) return
      if (!this.validateForm()) return

      this.submitting = true
      uni.showLoading({title: '提交中', mask: true})

      const payload = {
        ...this.auctionForm,
        minPrice: Number(this.auctionForm.minPrice),
        maxPrice: this.auctionForm.maxPrice ? Number(this.auctionForm.maxPrice) : null
      }

      try {
        const res = await addAuction(payload)
        if (res.code === 200) {
          toast('添加成功')
          this.safeBack()
        } else {
          toast(res.msg || '提交失败')
        }
      } catch (err) {
        if (err.message === 'TIMEOUT') {
          toast('服务器响应超时，请稍后重试')
        } else {
          toast(err.errMsg || err.message || '提交失败')
        }
      } finally {
        if (timer) clearTimeout(timer)
        this.submitting = false
        uni.hideLoading()
      }
    },
    safeBack() {
      uni.navigateBack({
        fail: () => {
          uni.reLaunch({url: '/pages/admin/index'})
        }
      })
    },
    onStartTimeChange(e) {
      this.auctionForm.startTime = e.detail.value
    },
    onEndTimeChange(e) {
      this.auctionForm.endTime = e.detail.value
    },
    async afterRead(event) {
      const files = Array.isArray(event.file) ? event.file : [event.file]

      files.forEach(file => {
        this.fileList.push({...file, status: 'uploading', message: '上传中'})
      })

      try {
        const url = await this.uploadFilePromise(files[0].url)
        this.fileList = [{url, status: 'success'}]
        this.auctionForm.imgUrl = url
      } catch (err) {
        this.fileList = []
        toast(err.errMsg || err.message || '上传失败，请重试')
      }
    },
    uploadFilePromise(filePath) {
      const apiBase = 'http://localhost:8080'
      const user = uni.getStorageSync('user') || {}
      const header = user.id ? {'user-id': user.id} : {}
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: apiBase + '/auction/uploadImages',
          filePath,
          name: 'files',
          header,
          success: res => {
            try {
              const result = JSON.parse(res.data)
              if (result.code === 200 && result.data && result.data.length) {
                resolve(result.data[0])
              } else {
                reject(new Error(result.msg || '上传失败'))
              }
            } catch (e) {
              reject(new Error('上传返回解析失败'))
            }
          },
          fail: err => {
            reject(err)
          }
        })
      })
    },
    deletePic() {
      this.fileList = []
      this.auctionForm.imgUrl = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.add-page {
  min-height: 100vh;
  background: var(--color-bg);
  padding: 0 24rpx 160rpx;
  box-sizing: border-box;
}

.form-scroll {
  max-height: calc(100vh - 220rpx);
  padding: 24rpx 0 40rpx;
}

:deep(.uv-form-item__body) {
  background: var(--color-card);
  border-radius: 24rpx;
  padding: 20rpx 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 12rpx 20rpx rgba(15,81,50,0.05);
}

.upload-hint {
  font-size: 22rpx;
  color: var(--color-muted);
  margin-top: 12rpx;
}

.submit-btn {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  height: 96rpx;
  border-radius: 999rpx;
  background: var(--color-primary);
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
  box-shadow: 0 20rpx 30rpx rgba(31,190,107,0.4);
}
</style>
