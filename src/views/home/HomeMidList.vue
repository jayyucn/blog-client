<script setup lang="ts">
import { i18n } from '@/i18n';
import API from '@/net/api';
import Store from '@/stores';
// import HomeMidListItem from './components/HomeMidListItem.vue';
import type { ArticlePaginateQueryDTO } from '@/net/api/article';
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

const fetchArticles = (page: number = 0, page_size: number = 0) => {
  const param: ArticlePaginateQueryDTO = {
  page: page || currentPage.value,
  page_size: page_size || pageSize.value
}
  API.article.fetchAritcleList(param)
}
const articles = computed(() => Store.articleList.getArticleList || [])
const currentPage = ref(Store.articleList.pagination.current_page)
const pageSize = computed(() => Store.articleList.getPageSize)
const totalCount = computed(() => Store.articleList.getTotalCount)
const handleSizeChange = (val: number) => {
  fetchArticles( 0,  val)
}
const handleCurrentChange = (page: number) => {
  fetchArticles(page)
  console.log(`current page: ${page}`)
}

</script>

<template>
  <el-carousel height="300px" type="card" indicator-position="outside">
    <el-carousel-item v-for="item in 4" :key="item">
      <el-image class="img" fit="scale-down" src="https://gitee.com/jayyucn/static/raw/master/thumbnail/davies-designs-studio-f5_lfi2S-d4-unsplash.jpg" alt="Kitten" />
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

.el-carousel-item {
  @include border;
}
.img {
  padding: 8px;
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