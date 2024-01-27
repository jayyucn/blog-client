<script lang="ts" setup>
import {type IArticle} from '@/interfaces/interface.article'
  import { getArticleDetailRoute } from '@/transforms/transform.route'

defineProps<{
    article: IArticle
  }>()
</script>

<template>
    <el-row class="list-item-row">
        <el-col class="card" :span="10">
            <img height="150px" :src="article.thumbnail"
                class="image" />
            <el-col >
                <div>
                    <div class="content">
                        <router-link class="link" :to="getArticleDetailRoute(article.id)" :title="article.title">
              {{ article.title }}
            </router-link>
                    <span class="article-desc" >{{ article.description }}</span>
                    <div class="bottom">
                        <time class="time">{{ article.created_at }}</time>
                    </div>
                </div>
                </div>
            </el-col>
        </el-col>

    </el-row>
</template>

<style lang="scss" scoped>
.list-item-row {
    background-color: var(--module-bg);
}

.content {
    width: 100%;
    margin: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    

}
.article-title{

    font: 200;
}
.card {
    display: flex;
    flex-direction: row;
    align-items: start;
    width: 100%;

    .image {
        margin: 0px;
        padding: 0px;
    }
}
</style>