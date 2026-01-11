<template>
  <view class="detail-page">
    <uv-navbar
        title="拍品详情"
        :autoBack="true"
        left-text="返回"
        bgColor="transparent"
        :titleStyle="navbarTitle"
        :placeholder="true"
    />

    <scroll-view scroll-y class="detail-scroll" :show-scrollbar="false">
      <uv-image
          class="hero-image"
          mode="widthFix"
          width="100%"
          :src="auction?.imgUrl || defaultCover"
      />

      <view class="info-card" v-if="auction">
        <text class="info-title">{{ auction.title }}</text>
        <text class="info-subtitle" v-if="auction.subTitle">{{ auction.subTitle }}</text>

        <view class="info-grid">
          <view class="grid-item">
            <text class="grid-label">编号</text>
            <text class="grid-value">{{ auction.id }}</text>
          </view>
          <view class="grid-item">
            <text class="grid-label">状态</text>
            <text class="grid-value status-pill">{{ statusName(auction.status) }}</text>
          </view>
          <view class="grid-item">
            <text class="grid-label">起拍价</text>
            <text class="grid-value price">¥{{ auction.minPrice }}</text>
          </view>
          <view class="grid-item">
            <text class="grid-label">封顶价</text>
            <text class="grid-value">¥{{ auction.maxPrice || '—' }}</text>
          </view>
          <view class="grid-item">
            <text class="grid-label">开始时间</text>
            <text class="grid-value">{{ auction.startTime || '待定' }}</text>
          </view>
          <view class="grid-item">
            <text class="grid-label">结束时间</text>
            <text class="grid-value">{{ auction.endTime || '待定' }}</text>
          </view>
        </view>
      </view>

      <view class="offer-card">
        <view class="offer-header">
          <text class="offer-title">出价记录</text>
          <text class="offer-tip">向下拖动可查看更多</text>
        </view>
        <scroll-view scroll-y class="offer-scroll">
          <view v-if="!offers.length" class="empty-offer">暂无出价</view>
          <view class="offer-item" v-for="offer in offers" :key="offer.id">
            <view>
              <text class="offer-price">¥{{ offer.price }}</text>
              <text class="offer-user">{{ offer.user?.nick || '匿名竞拍者' }}</text>
            </view>
            <text class="offer-status" v-if="offer.win === 1">中标</text>
          </view>
        </scroll-view>
      </view>
    </scroll-view>

    <view class="bid-bar">
      <uv-input
          v-model="bidPrice"
          placeholder="输入您的出价"
          type="digit"
          class="bid-input"
      />
      <button class="bid-button" @click="submitOffer" :loading="submitting" :disabled="submitting">
        {{ submitting ? '提交中...' : '提交' }}
      </button>
    </view>
  </view>
</template>

<script>
import UvImage from "../../uni_modules/uv-image/components/uv-image/uv-image.vue";
import UvInput from "../../uni_modules/uv-input/components/uv-input/uv-input.vue";
import {auctionInfo} from "../../api/auction";
import {addOffer, offerList} from "../../api/offer";
import {getUserId} from "../../util/user";
import {toast} from "../../util/common";
import UvNavbar from "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.vue";

export default {
  name: "detail",
  components: {UvInput, UvImage, UvNavbar},
  data() {
    return {
      auctionId: null,
      auction: null,
      offers: [],
      bidPrice: '',
      submitting: false,
      defaultCover: 'https://via.placeholder.com/750x420?text=Auction',
      navbarTitle: {
        color: '#0f5132',
        fontWeight: 600
      }
    }
  },
  onLoad(options) {
    this.auctionId = options.id
    this.loadAuction()
    this.loadOffers()
  },
  methods: {
    statusName(status) {
      const map = {
        0: '草稿',
        1: '未开始',
        2: '进行中',
        3: '中止',
        4: '完成',
        5: '流标'
      }
      return map[status] || '待发布'
    },
    loadAuction() {
      if (!this.auctionId) return
      auctionInfo(this.auctionId).then(res => {
        this.auction = res.data
      })
    },
    loadOffers() {
      if (!this.auctionId) return
      offerList({auctionId: this.auctionId}).then(res => {
        this.offers = res.data || []
      })
    },
    submitOffer() {
      if (!this.bidPrice) {
        toast('请输入出价')
        return
      }

      const price = Number(this.bidPrice)
      if (isNaN(price) || price <= 0) {
        toast('请输入有效的出价金额')
        return
      }

      const userId = getUserId()
      if (!userId) {
        toast('请先登录')
        setTimeout(() => {
          uni.reLaunch({url: '/pages/login/index'})
        }, 1500)
        return
      }

      this.submitting = true
      addOffer({
        auctionId: this.auctionId,
        userId,
        price: price
      }).then(() => {
        toast('出价成功')
        this.bidPrice = ''
        this.loadOffers()
        this.loadAuction()
      }).catch(err => {
        // 错误已在 request.js 中处理
        console.error('出价失败:', err)
      }).finally(() => {
        this.submitting = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-page {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 140rpx;
}

.detail-scroll {
  max-height: calc(100vh - 140rpx);
}

.hero-image {
  width: 100%;
  border-radius: 0 0 32rpx 32rpx;
}

.info-card {
  background: var(--color-card);
  margin: 24rpx;
  padding: 32rpx;
  border-radius: 28rpx;
  box-shadow: 0 20rpx 40rpx rgba(15, 81, 50, 0.08);
}

.info-title {
  font-size: 40rpx;
  font-weight: 700;
  color: var(--color-text);
}

.info-subtitle {
  font-size: 26rpx;
  color: var(--color-muted);
  margin-top: 10rpx;
  display: block;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-top: 24rpx;
}

.grid-label {
  font-size: 24rpx;
  color: var(--color-muted);
}

.grid-value {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--color-text);
}

.price {
  color: var(--color-primary);
}

.status-pill {
  color: var(--color-primary);
}

.offer-card {
  background: var(--color-card);
  margin: 0 24rpx 24rpx;
  padding: 32rpx;
  border-radius: 28rpx;
  box-shadow: 0 12rpx 24rpx rgba(15,81,50,0.07);
}

.offer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.offer-title {
  font-size: 32rpx;
  font-weight: 600;
}

.offer-tip {
  font-size: 24rpx;
  color: var(--color-muted);
}

.offer-scroll {
  max-height: 360rpx;
  margin-top: 20rpx;
}

.offer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.offer-item:last-child {
  border-bottom: none;
}

.offer-price {
  font-size: 34rpx;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.offer-user {
  display: block;
  font-size: 24rpx;
  color: var(--color-muted);
}

.offer-status {
  color: var(--color-primary);
  font-weight: 600;
}

.empty-offer {
  text-align: center;
  color: var(--color-muted);
  padding: 80rpx 0;
}

.bid-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 16rpx 24rpx 40rpx;
  display: flex;
  gap: 16rpx;
  box-shadow: 0 -8rpx 24rpx rgba(0,0,0,0.08);
}

.bid-input {
  flex: 1;
  background: #f4f6f8;
  border-radius: 999rpx;
  padding: 0 24rpx;
}

.bid-button {
  min-width: 160rpx;
  border-radius: 999rpx;
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
}
</style>
