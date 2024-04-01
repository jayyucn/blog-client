<template>
    <div class="homemain">
        <!-- 这里放置主页的主要内容 -->
        <article-list class="list" />
    </div>
</template>

<script setup lang="ts">
import ArticleList from './ArticleList.vue';

</script>

<style lang="scss" scoped>
.homemain { /* 这里放置样式 */ 
    display: block;
    .list {
        padding-top: 50px;
    }
}

</style>