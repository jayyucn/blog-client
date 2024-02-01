<script lang="ts" setup>
import type ArticleBrief from '@/data/article/article.brief';
import { getArticleDetailRoute } from '@/transforms/transform.route';

defineProps<{
    article: ArticleBrief
}>()
</script>

<template>
    <el-row class="list-item-row">
        <el-col class="card" :span="10">
            <img height="150px" width="300px" :src="article.thumbnail" class="image" />
            <el-col>
                <router-link class="link" :to="getArticleDetailRoute(article.id)">
                    <div>
                        <div class="content">
                            <span class="article-title">{{ article.title }}</span>
                            <span class="article-desc">{{ article.description }}</span>
                            <div class="bottom">
                                <time class="time">{{ article.created_at }}</time>
                            </div>
                        </div>
                    </div>
                </router-link>
            </el-col>
        </el-col>

    </el-row>
</template>

<style lang="scss" scoped>
.link {
    color: var(--text-color);
}

.list-item-row {
    background-color: var(--module-bg);
}

.content {
    width: 100%;
    margin: 16px;
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    justify-content: space-between;

    .article-title {
        color: black;
    }

}

.card {
    display: flex;
    flex-direction: row;
    align-items: start;
    width: 100%;

    .image {
        margin: 0px;
        padding: 0px;
        @include leftBorder();
    }
}
</style>