<script setup lang="ts">
import HomeRight from './components/HomeRight.vue';
import SideNav from './components/SideNav.vue';
</script>

<template>
  <div class="container">
    <div class="blank-top"></div>
    <div class="home">
      <SideNav class="left" />
      <router-view class="home-center" />
      <HomeRight class="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
}
.blank-top {
  height: 68px;
}

.home {
  display: flex;
  width: 100%;
  gap: 20px;
  resize: horizontal;
  justify-content: space-between;
  min-height: 100%;
}



@media screen and (max-width: 1024px) {
  .left{
    display: none;
  }
  .right {
    display: none;
  }
  .center{
    width: 100%;
  }
}

@media screen and (min-width: 1024px) {

  .left {
    flex: 1;
    justify-self: start;
    left: 0px;
    min-width: 300px;
   
  }
  .home-center {
    flex: 3;
    display: flex;
    flex-direction: column;
  } 
   .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
  }

}
</style>
