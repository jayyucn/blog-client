<script setup lang="ts">
import HomeRight from './components/HomeRight.vue';
// import HomeMidList from './HomeMidList.vue'
import SideNav from './components/SideNav.vue';


</script>


<template>
  <div class="blank-top"></div>
  <div class="home">
    <el-row class="row-bg" :gutter="20">
      <el-col :span="4" class="grid-content left" >
        <SideNav />
      </el-col>
      <el-divider direction="vertical" />
      <el-col :span="15" class="grid-content mid">
          <router-view/>
      </el-col>
      <el-divider direction="vertical" />
      <el-col :span="4" class="grid-content right">
        <HomeRight />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.blank-top {
  // height: var(--header-height);
}

@media (min-width: 1024px) {
  .home {
    display: flex;
    margin-top: 85px;//$header-height;
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

  .right
  .left {
    max-width: 300px;
  }

  .grid-content.right {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
  }
}
</style>
