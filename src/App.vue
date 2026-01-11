<script>
export default {
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
:root {
  --color-primary: #1fbe6b;
  --color-primary-dark: #169a55;
  --color-primary-light: #e7f8ef;
  --color-text: #1f2a37;
  --color-muted: #6b7280;
  --color-bg: #f4f6f8;
  --color-card: #ffffff;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

page {
  background-color: var(--color-bg);
}

.container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #f9fffb 0%, #f1f5f3 100%);
  position: relative;
  overflow: hidden;

  .container-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.4);
    opacity: 0.25;
  }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
  }
}

button,
.btn,
.btn-primary {
  background-color: var(--color-primary);
  color: #fff;
  border-radius: 999px;
  border: none;
}
</style>
