<template>
  <div>
    <div class="left">
      <article-list />
    </div>
    <div class="right">
      <recommend-topic />
      <tags />
      <reading-list />
    </div>
  </div>
</template>

<script setup lang="ts">

import ArticleList from './components/ArticleList.vue';
import ReadingList from './components/ReadingList.vue';
import RecommendTopic from './components/RecommendTopic.vue';
import Tags from './components/Tags.vue';

</script> 


<style lang="scss" scoped>
.left {
  width: 60%;
  display: flex;
  flex-direction: column;
}

.right {
  width: 40%;
  display: none;
}

@media (max-width: 768px) {
  .left {
    width: 100%;
  }

  .right {
    display: flex;
    flex-direction: column;
  }
}
</style>