<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
html, body {
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #000; /* 防止弹性滚动露白 */
  overflow-x: hidden; /* 防止横向滚动 */
}

.container {
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  position: relative; /* 为绝对定位子元素建立包含块 */

  .container-img {
    width: 100%;
    height: inherit;
    object-fit: cover; /* 确保图片覆盖整个容器 */
  }

  .content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
