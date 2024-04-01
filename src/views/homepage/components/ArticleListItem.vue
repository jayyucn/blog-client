<script lang="ts" setup>
import type ArticleBrief from "@/data/article/article.brief";
import { i18n } from "@/i18n";
import { getArticleDetailRoute } from '@/transforms/transform.route';
import { formatTime } from "@/utils";
import { computed } from "vue";

const { article } = defineProps<{
    article: ArticleBrief
}>();

const tags = computed(() => article.tags.map(tag => i18n.t(`${tag.name}`)));

</script>

<template>
    <div class="article-list-item">
        <div class="article-imag-div">
            <el-image :src="article.thumbnail" class="article-image" alt="Article Thumbnail">
                <template #placeholder>
                    <div class="image-slot-placeholder">Loading<span class="dot">...</span></div>
                </template>
                <template #error>
                    <div class="image-slot-error">
                        <el-icon>
                            <Picture />
                        </el-icon>
                    </div>
                </template>
            </el-image>
        </div>
        <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <div class="article-meta">
                <el-text><el-icon>
                        <Avatar />
                    </el-icon> {{ article.author || i18n.t('article.anonymous') }}</el-text>
                <span> {{ formatTime(article.updated_at, 'yyyy-MM-dd') }}</span>
            </div>
            <p class="article-description">{{ article.description }}</p>
            <router-link :to="getArticleDetailRoute(article.id)" class="read-more-link">{{ i18n.t('article.readmore')
                }}</router-link>
        </div>
        <div class="article-flags">
            <div class="flag article-tags">
                <el-tag v-for="(tag, index) in tags" :key="index" type="info">{{ tag }}</el-tag>
            </div>
            <div class="flag article-categories">
                <el-tag v-for="(cat, index) in article.categories" :key="index" :type="cat.type">{{ cat.name
                    }}</el-tag>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.article-list-item {
    display: flex;
    max-height: 450px;
    border-bottom: var(--g-solid-border);

    .article-flags {
        display: block;
        position: relative;
        //固定宽度，结合下面的overflow-x: visible; 实现tags 溢出时显示
        width: 60px;
        overflow-x: visible;
        direction: rtl;
        //和父容器等高
        height: inherit;
        margin: 10px 10px 10px auto;

        .flag {
            width: 600px;
        }

        .article-categories {
            position: absolute;
            bottom: 0px;
        }
    }
}

.article-imag-div {
    background-color: var(--module-bg);
    margin: 0px;
    width: 120px;
    height: 80px;
    @include border();
}

.article-image {
    width: inherit;
    height: inherit;
    padding: 4px;

    .image-slot-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: var(--el-text-color-secondary);
        font-size: 14px;
    }

    .image-slot-error {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: var(--el-text-color-secondary);
        font-size: 30px;
    }

    .dot {
        animation: dot 2s infinite steps(3, start);
        overflow: hidden;
    }
}


.article-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;

    .article-title {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
    }

    .article-meta {
        display: flex;
        justify-content: start;
        align-items: center;

        gap: 8px;
        font-size: 14px;
        color: $text-color-weak;
    }

    .article-description {
        margin-top: 8px;
    }

    .read-more-link {
        margin-top: auto;
        width: 300px;
        padding-bottom: 20px;
    }

    .read-more-link:hover {
        background-color: transparent;
    }
}
</style>