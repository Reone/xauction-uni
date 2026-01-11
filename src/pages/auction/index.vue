<template>
  <view :class="['auction-page', {'auction-page--child': isChildPage}]">
    <uv-navbar
        v-if="!isChildPage"
        title="雅珍拍卖"
        :autoBack="false"
        bgColor="transparent"
        :titleStyle="navbarTitle"
        :fixed="true"
        :placeholder="true"
    />

    <view class="hero" v-if="!isChildPage"> 
      <view>
        <text class="hero-title">臻品甄选</text>
        <text class="hero-subtitle">每日甄选优质藏品，指尖一触即发</text>
      </view>
      <button class="hero-refresh" @click="manualRefresh" :loading="loading">
        {{ loading ? '刷新中' : '刷新' }}
      </button>
    </view>

    <scroll-view
        :class="['list-scroll', {'list-scroll--child': isChildPage}]"
        scroll-y="true"
        :refresher-enabled="true"
        :refresher-triggered="refresherTriggered"
        refresher-default-style="circle"
        @refresherrefresh="handleRefresh"
    >
      <view v-if="!auctionList.length && !loading" class="empty-state">
        <image src="/static/empty.png" mode="widthFix" class="empty-img"/>
        <text class="empty-text">暂无拍品，稍后再来看看</text>
      </view>

      <view class="auction-card" v-for="item in auctionList" :key="item.id" @click="goDetail(item)">
        <uv-image
            class="card-cover"
            width="100%"
            height="168px"
            :src="item.imgUrl || defaultCover"
            radius="18px"
        />
        <view class="card-body">
          <text class="card-title">{{ item.title }}</text>
          <text class="card-subtitle" v-if="item.subTitle">{{ item.subTitle }}</text>
          <view class="card-meta">
            <view>
              <text class="price-label">起拍价</text>
              <text class="card-price">¥{{ item.minPrice || '--' }}</text>
            </view>
            <view class="status-pill" :class="'status-' + (item.status ?? 'unknown')">
              {{ statusName(item.status) }}
            </view>
          </view>
          <view class="card-timeline">
            <text>开始 {{ item.startTime || '待定' }}</text>
            <text>结束 {{ item.endTime || '待定' }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <button class="fab" v-if="isAdmin()" @click="newAuction">新建
      <text class="fab-icon">＋</text>
    </button>
  </view>
</template>

<script>
import {isAdmin} from "../../util/user";
import {auctionList} from "../../api/auction";
import UvImage from "../../uni_modules/uv-image/components/uv-image/uv-image.vue";
import UvNavbar from "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.vue";

export default {
  name: "AuctionIndex",
  components: {UvNavbar, UvImage},
  data() {
    return {
      auctionList: [],
      loading: false,
      refresherTriggered: false,
      defaultCover: 'https://via.placeholder.com/750x420?text=Auction',
      navbarTitle: {
        color: '#0f5132',
        fontWeight: 600
      }
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
  created() {
    this.loadData()
  },
  methods: {
    isAdmin,
    statusName(status) {
      const map = {
        0: '草稿',
        1: '未开始',
        2: '进行中',
        3: '中止',
        4: '已完成',
        5: '流标'
      }
      return map[status] || '待发布'
    },
    loadData() {
      this.loading = true
      return auctionList({status: this.status}).then(res => {
        this.auctionList = res.data || []
      }).finally(() => {
        this.loading = false
      })
    },
    handleRefresh() {
      if (this.refresherTriggered) return
      this.refresherTriggered = true
      this.loadData().finally(() => {
        setTimeout(() => {
          this.refresherTriggered = false
        }, 400)
      })
    },
    manualRefresh() {
      this.handleRefresh()
    },
    goDetail(item) {
      if (!item.id) return
      uni.navigateTo({
        url: `/pages/auction/detail?id=${item.id}`
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

<style lang="scss" scoped>
.auction-page {
  min-height: 100vh;
  background: var(--color-bg);
  padding: 0 20rpx 140rpx;
  box-sizing: border-box;
}

.auction-page--child {
  padding: 0;
  background: transparent;
}

.hero {
  margin-top: 20rpx;
  padding: 40rpx;
  background: linear-gradient(135deg, #18c964, #0fa958);
  border-radius: 32rpx;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 20rpx 40rpx rgba(23, 201, 103, 0.3);
}

.hero-title {
  font-size: 40rpx;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 26rpx;
  opacity: 0.85;
  margin-top: 12rpx;
  display: block;
}

.hero-refresh {
  padding: 12rpx 30rpx;
  border-radius: 999rpx;
  border: 1rpx solid rgba(255,255,255,.6);
  background: rgba(255,255,255,.2);
  color: #fff;
  font-size: 26rpx;
}

.list-scroll {
  margin-top: 32rpx;
  max-height: calc(100vh - 320rpx);
  padding-bottom: 160rpx;
}

.list-scroll--child {
  margin-top: 0;
  max-height: 100%;
}

.auction-card {
  background: var(--color-card);
  border-radius: 28rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 12rpx 24rpx rgba(15, 81, 50, 0.08);
}

.card-cover {
  width: 100%;
}

.card-body {
  margin-top: 18rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--color-text);
}

.card-subtitle {
  font-size: 26rpx;
  color: var(--color-muted);
  margin-top: 8rpx;
  display: block;
}

.card-meta {
  margin-top: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-label {
  font-size: 24rpx;
  color: var(--color-muted);
  margin-right: 8rpx;
}

.card-price {
  font-size: 36rpx;
  font-weight: 700;
  color: var(--color-primary);
  margin-left: 8rpx;
}

.status-pill {
  padding: 8rpx 24rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  background: var(--color-primary-light);
  color: var(--color-primary-dark);
}

.card-timeline {
  margin-top: 18rpx;
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: var(--color-muted);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 0;
  color: var(--color-muted);
}

.empty-img {
  width: 220rpx;
  margin-bottom: 30rpx;
}

.empty-text {
  font-size: 26rpx;
}

.fab {
  position: fixed;
  right: 30rpx;
  bottom: 80rpx;
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  border: none;
  box-shadow: 0 20rpx 30rpx rgba(31, 190, 107, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

.fab-icon {
  font-size: 40rpx;
  line-height: 1;
}
</style>
