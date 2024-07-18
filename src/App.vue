<template>
  <div id="app" class="flex-container">
    <!-- Sidebar 组件 -->
    <Sidebar />

    <!-- 主内容区域 -->
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar
  }
};
</script>

<style scoped>
#app {
  display: flex;
  height: 100vh; /* 使容器占满整个视口高度 */
  width: 100vw; /* 使容器占满整个视口宽度 */
  margin: 0;
  padding: 0;
}

.flex-container {
  display: flex;
  flex-direction: row; /* 使子元素在水平方向上排列 */
  height: 100%; /* 使子元素占满父容器高度 */
  width: 100%; /* 使子元素占满父容器宽度 */
}

.Sidebar {
  width: 15%; /* 设置 Sidebar 宽度为页面宽度的 15% */
  height: 100%; /* 设置 Sidebar 高度为页面高度的 100% */
  background-color: #33689c; /* 可以根据需要设置背景颜色 */
  color: white; /* 可以根据需要设置文字颜色 */
}

.main-content {
  flex: 1; /* 让主内容区域占据剩余空间 */
  padding: 20px;
  overflow-y: auto; /* 如果内容溢出，显示垂直滚动条 */
  background: linear-gradient(to right bottom, white, rgb(53, 115, 230)); /* 从左到右渐变，从白色到蓝色 */
}
</style>
