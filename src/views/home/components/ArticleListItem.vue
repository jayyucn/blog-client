<script lang="ts" setup>
import type ArticleBrief from "@/data/article/article.brief";
import { i18n } from "@/i18n";
import { getArticleDetailRoute } from '@/transforms/transform.route';
import { formatTime } from "@/utils";

const props = defineProps<{
    article: ArticleBrief
}>()
// const title = ref("这是文章的主要标题");
// const publishDate = ref("2022-01-01");
// const summary = ref("文章摘要用于简要介绍文章的内容");
const tags = computed(()=> props.article.tags.map(tag => i18n.t(`${tag.name}`)));

const tagType = (index: number) => {
    return index % 2 === 0 ? "success" : "info";
};
</script>
<template>
    <div class="article-list-item">
        <img height="150px" width="300px" :src="article.thumbnail" class="image" />
        <div class="article-info">
            <h3 class="title">{{ article.title }}</h3>
            <p style="font-size:1cap;">
                <span>{{ i18n.t('article.author') }} <i>{{ article.author || i18n.t('article.anonymous') }}</i></span>
                <span>{{ i18n.t('article.updated_at') }} {{ formatTime(article.updated_at, 'yyyy-MM-dd') }}</span>
            </p>
            <p class="description">{{ article.description }} <router-link class="link"
                    :to="getArticleDetailRoute(article.id)">{{ i18n.t('article.readmore') }}</router-link></p>
            <p>
                <el-tag v-for="(tag, index) in tags" :key="index" :type="tagType(index)">{{ tag }}</el-tag>
            </p>
        </div>
    </div>
</template>
  

  
<style lang="scss" scoped>
.article-list-item {
    display: flex;
    background-color: var(--module-bg-light);
  border: 1px solid var(--el-border-color);
}

.image {
    margin: 0px;
    padding: 0px;
    @include leftBorder();
}

.article-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 150px;
    padding: 10px;
}

.description {
    display: flex;
}

.link {
    margin-top: -0.1cap;
    margin-left: 1cap;
}

.link:hover {
    background-color: transparent;
}

.title {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
}

p {
    margin: 5px 0;
}

span {
    margin-right: 10px;
}

</style>