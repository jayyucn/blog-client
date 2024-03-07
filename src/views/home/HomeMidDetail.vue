<script setup lang="ts">
import { i18n } from '@/i18n';
import API from '@/net/api';
import Store from '@/stores';
import { formatToDate } from '@/utils/util.time';
import CustomPreview from './components/CustomPreview.vue';

const props = defineProps<{
  articleId: number
}>()

const fetchArticleDetail = async (id: number) => {
  if (id) {
    await API.article.fetchAritcleDetail(id);
  }
}

onBeforeMount(() => {
  console.log('onBeforeMount');
  fetchArticleDetail(props.articleId);
})

watch(
  () => props.articleId,
  (id) => {
    console.log('articleId changed:', id);
    fetchArticleDetail(id);
  },
  { flush: 'post' }
);


// 引入文章详情相关的状态和属性
const articleDetail = computed(() => Store.articleDetail.article)
// const {title: articleTitle, author, updated_at:updatedAt } = computed(()=> articleDetail.value).value

const content = computed(() => {
  return Store.articleDetail.getContent;
})


onMounted(() => {
  window.scrollTo(0, 0);
})
onBeforeUpdate(() => console.log('onBeforeUpdate'))
onUpdated(() => console.log('onUpdated'))
onBeforeUnmount(() => console.log('onBeforeUnmount'))
onUnmounted(() => {
  console.log('onUnmounted')
  // 清除文章详情相关的状态和属性 
  Store.articleDetail.clearArticleDetail() 
})
onActivated(() => console.log('onActivated'))
onDeactivated(() => console.log('onDeactivated'))
onErrorCaptured(() => console.log('onErrorCaptured'))

</script>


<template>
  <div class="container">
    <!-- 博客头部区域 -->
    <el-card class="blog-header-card">
      <template #header>
        <h1 class="blog-title">{{ articleDetail.title }}</h1>

        <!-- 作者信息 -->
        <div class="author-info">
          <span class="author-tag">{{ i18n.t('article.author') }} <span class="author-name">{{ articleDetail.author || i18n.t('article.anonymous') }}</span></span>
        </div>

        <!-- 发布/更新日期 -->
        <div class="publish-date">
          <el-tag type="info" class="publish-date-tag">
            {{ i18n.t('article.updated_at') }}: {{ formatToDate(articleDetail.updated_at) }}
          </el-tag>
        </div>
      </template>

      <!-- 博客内容区域 -->
      <div class="blog-content">
        <CustomPreview class="preview" :text="content"/>
      </div>
    </el-card>


  </div>
</template>

<style lang="scss" scoped>
.container {
  @include border;
  user-select: text;
}



.preview {
  padding: 4px;
}

.blog-header-card {
  // background-color: #f5f7fa;
  display: block;
  background: linear-gradient(to top right, #ddd, #fff);

  .blog-title {
    //居中
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .author-tag {
    font-size: 16px;
    color: #333;
  }

  .author-name {
    font-size: 18px;
    color: #333;
    font-weight: bold;
  }

  // ... 其他样式
}
</style>