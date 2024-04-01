<template>
  <div class="homepage-container">
    <main class="left">
      <home-main />
    </main>

    <div class="right">
      <recommend-topic />
      <tags />
      <reading-list />
    </div>
  </div>
</template>

<script setup lang="ts">

import HomeMain from './components/HomeMain.vue';
import ReadingList from './components/ReadingList.vue';
import RecommendTopic from './components/RecommendTopic.vue';
import Tags from './components/Tags.vue';

</script>


<style lang="scss" scoped>
$ratio: 61.5%;

.homepage-container {
  justify-content: space-evenly;
  display: flex;
  flex-direction: row;
}

.left {
  display: block;
  flex: 1 1 auto;
  min-width: 0;
}

.right {
  min-height: 100vh;
  border-left: var(--g-solid-border);
  padding-right: 24px; //var(--g-layout-gap);
  box-sizing: border-box;
  display: none;
}

@media(max-width: 551.98px) {}

@media (min-width: 552px) and (max-width: 727.98px) {
  // 在这里添加你的样式

}

@media (min-width: 728px) and (max-width: 903.98px) {
  // 在这里添加你的样式

}

@media (min-width: 904px) and (max-width: 1079.98px) {

  // 在这里添加你的样式
  .right {
    display: block;
    min-width: 352px;
    max-width: 352px;
    padding-left: 24px;
  }
}

@media (min-width: 1080px) {

  // 在这里添加你的样式
  .left {
    min-width: $g-content-max-width;
    max-width: $g-content-max-width;
  }

  .right {
    display: block;
    min-width: 368px;
    max-width: 368px;
    padding-left: clamp(24px, 24px + 100vw - 1080px, 40px);
  }

}
</style>