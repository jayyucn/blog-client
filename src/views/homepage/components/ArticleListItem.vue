<script lang="ts" setup>
import type ArticleBrief from "@/data/article/article.brief";
import { i18n } from "@/i18n";
import router from "@/router";
import { getArticlePageRoute } from "@/transforms/transform.route";
import { formatTime } from "@/utils";
import { computed } from "vue";

const { article } = defineProps<{
    article: ArticleBrief
}>();

const tags = computed(() => article.tags.map(tag => i18n.t(`${tag.name}`)));

async function navigateToArticlePage(articleId: number) {
    try {
        const uri = getArticlePageRoute(articleId);
        await router.push(uri);
    } catch (err) {
        console.error(err);
        // Consider adding user feedback here, e.g., a toast notification
    }
}
</script>

<template>
    <div class="article-container" @click="navigateToArticlePage(article.id)">
        <div class="author-info">
            <el-text>
                <el-icon>
                    <Avatar />
                </el-icon>
                {{ article.author || i18n.t('article.anonymous') }}
            </el-text>
            <span>{{ formatTime(article.updated_at, 'yyyy-MM-dd') }}</span>
        </div>
        <div class="article-content">
            <div class="article-main">
                <div class="article-details">
                    <h3 class="article-title">{{ article.title }}</h3>
                    <p class="article-description">{{ article.description }}</p>

                </div>
                <div class="thumbnail-container">
                    <div class="tags-container">
                        <el-tag v-for="tag in tags" :key="tag" type="info">{{ tag }}</el-tag>
                    </div>
                    <el-image :src="article.thumbnail" class="thumbnail-image" alt="Article Thumbnail">
                        <template #placeholder>
                            <div class="thumbnail-loading">Loading...</div>
                        </template>
                        <template #error>
                            <div class="thumbnail-error">
                                <el-icon>
                                    <Picture />
                                </el-icon>
                            </div>
                        </template>
                    </el-image>
                    
                </div>
            </div>
            <div class="tags-categories-container">

                <div class="categories-container">
                    <el-tag v-for="category in article.categories" :key="category.name" type="info"
                        class="category-tag">
                        {{ category.name }}
                    </el-tag>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.article-container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
    }
}

.author-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    color: #757575;

    el-icon {
        margin-right: 8px;
    }
}

.article-main {
    display: flex;
    justify-content: space-between;
}

.article-title {
    font-size: 24px;
    font-weight: bold;
    line-height: 1.3;
    color: #333;
    margin: 0 0 10px 0;
}

.article-description {
    font-size: 16px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 15px;
}


.thumbnail-container {
    position: relative;
    margin-top: 15px;

    .thumbnail-image {
        width: 100%;
        max-width: 150px;
        /* Adjust this value as needed */
        max-height: 200px;
        /* Adjust this value as needed */
        height: auto;
        border-radius: 4px;
        object-fit: cover;
        /* This will ensure the image covers the area without losing its aspect ratio */
    }

    .thumbnail-mask {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30%;
        /* Adjust based on your needs */
        background-color: rgba(0, 0, 0, 0.5);
        /* Semi-transparent black mask */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .thumbnail-loading,
    .thumbnail-error {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
        color: #ccc;
        font-size: 14px;
    }
}

.tags-categories-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
}
.tags-container {
    flex-direction: row-reverse;
    margin-top: -40px;
    padding-bottom: 40px;
}

.tags-container,
.categories-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

el-tag {
    padding: 5px 10px;
    font-size: 12px;
    border: none;
    background-color: #f3f3f3;
    color: #333;
}

.category-tag {
    padding: 2px 8px;
    border-radius: 100px;
    background-color: #f2f2f2;
    color: #242424;
    height: 26px;
    font-size: 13px;
    font-weight: 400;
}
</style>