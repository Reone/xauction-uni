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
.container{
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  .container-img{
    width: 100%;
  }
  .content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
  }
}
</style>
