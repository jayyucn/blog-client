<script setup lang="ts">
import HomeRight from './components/HomeRight.vue';
// import HomeMidList from './HomeMidList.vue'
import SideNav from './components/SideNav.vue';


</script>


<template>
  <div class="home">
    <el-row class="row-bg" >
      <el-col :span="4" class="grid-content left">
        <SideNav />
      </el-col>
      <el-divider direction="vertical" />
      <el-col :span="15" class="grid-content mid">
        <div class="blank-top mid"></div>
        <router-view />
      </el-col>
      <el-divider direction="vertical" />
      <el-col :span="4" class="grid-content right">
        <HomeRight />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>

.blank-top.mid {
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
    // width: 100%;
    // max-width:80%;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  }

  // .left  
  // .right 
  // {
  //   max-width: 300px;
  // }

  .grid-content.right {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
  }
}
</style>
