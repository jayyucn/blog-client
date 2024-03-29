<script setup lang="ts">
import { i18n } from '@/i18n';
import API from '@/net/api';
import type { ArticlePaginateQueryDTO } from '@/net/api/article';
import Store from '@/stores';
import { computed, onBeforeMount, ref, watch } from 'vue';
import ArticleListItem from './ArticleListItem.vue';

const props = defineProps<{
  tagSlug?: string
  categorySlug?: string
  searchKeyword?: string
  date?: string
}>()

onBeforeMount(() => {
  fetchArticles()
  watch(
    () => props,
    () => fetchArticles(),
    { flush: 'post', deep: true }
  )
})

const fetchArticles = (page: number = 0, page_size: number = 0) => {
  const param: ArticlePaginateQueryDTO = {
    page: page || currentPage.value,
    page_size: page_size || pageSize.value
  }
  API.article.fetchAritcleList(param)
}
const articles = computed(() => Store.articleList.getArticleList || [])
const currentPage = ref(Store.articleList.pagination.current_page)
const pageSize = ref(Store.articleList.pagination.page_size)
const totalCount = computed(() => Store.articleList.getTotalCount)
const handleSizeChange = (val: number) => {
  fetchArticles(0, val)
}
const handleCurrentChange = (page: number) => {
  fetchArticles(page)
  console.log(`current page: ${page}`)
}

</script>

<template>
  <div>
    <div v-bind="$attrs" v-if="articles.length > 0" class="list">
      <article-list-item v-for="(article, idx) in articles" :key="idx" :article="article" class="list-item"
        :class="idx" />
      <div class="pagination-container">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
          :small="false" :disabled="false" :background="true" layout="sizes, total, prev, pager, next, jumper"
          :total="totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <div v-else class="empty-list">
      <el-empty :description="i18n.t('article.empty')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-pagination {
  padding: 4px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: $margin-default;
}

.list-item {
  @include border();
  margin-top: $margin-default;
}
</style>