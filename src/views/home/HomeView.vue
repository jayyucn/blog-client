<script setup lang="ts">
import HomeRight from './components/HomeRight.vue';
import SideNav from './components/SideNav.vue';
</script>

<template>
  <div class="home">
    <el-row class="row-bg" gutter="8">
      <el-col :span="4" class="grid-content left">
        <SideNav />
      </el-col>
      <el-col :span="15" class=" center">
        <div class="blank-top"></div>
        <router-view />
      </el-col>
      <el-col :span="4" class="grid-content right">
        <HomeRight />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.blank-top {
  height: 85px;
}

@media (min-width: 1024px) {
  .home {
    display: flex;
    min-height: 100%;
    width: min(80%, 1800px);

    .el-divider {
      height: 100%;
    }
  }

  .row-bg {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  }

  .left {
    width: 300px;
    overflow: visible;
    display: block;
    position: relative;
    //固定宽度，结合下面的overflow-x: visible; 实现tags 溢出时显示
    overflow-x: visible;
    direction: rtl;
  }

  .grid-content {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
  }
}
</style>
