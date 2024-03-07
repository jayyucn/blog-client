<script setup lang="ts">
import { i18n } from '@/i18n';
import API from '@/net/api';
import Store from '@/stores';
// import HomeMidListItem from './components/HomeMidListItem.vue';
import ArticleListItem from './components/ArticleListItem.vue';

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

const fetchArticles = (param: any = {}) => {
  API.article.fetchAritcleList(param)
}
const articles = computed(() => Store.articleList.getArticleList || [])
// const pagination = computed(() => Store.articleList.getPagination)
const currentPage = computed(() => Store.articleList.getCurrentPage)
const pageSize = computed(() => Store.articleList.getPageSize)
const totalCount = computed(() => Store.articleList.getTotalCount)
// const total = pagination.value.total_count
// const pageCount = pagination.total_page
const handleSizeChange = (val: number) => {
  API.article.fetchAritcleList({ page_size: val })
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

</script>

<template>
  <el-carousel height="300px" indicator-position="outside">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 class="small justify-center" text="2xl">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  <div v-if="articles.length > 0" class="list">
    <ArticleListItem v-for="(article, idx) in articles" :key="idx" :article="article" class="list-item" :class="idx" />
    <div class="pagination-container">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        :small="false" :disabled="false" :background="true" layout="sizes, total, prev, pager, next, jumper"
        :total="totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
  <div v-else class="empty-list">
    <el-empty :description="i18n.t('article.empty')" />
  </div>
</template>

<style lang="scss" scoped>

.el-pagination{
  padding: 4px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: var(--module-bg-light);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
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