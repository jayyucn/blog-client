<script setup lang="ts">
import { i18n } from '@/i18n';
import API from '@/net/api';
import Store from '@/stores';
import { countCharacters } from '@/utils/util.string';
import { formatToDate } from '@/utils/util.time';
import CustomPreview from './components/CustomPreview.vue';

const props = defineProps<{
  articleId: number
}>()

const fetchArticleDetail = async (id: number) => {
  if (id) {
    loading.value = true;
    await API.article.fetchAritcleDetail(id);
    loading.value = false;
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

const loading = ref(false);
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
    <el-card class="blog-header-card">
      <!-- 博客头部区域 -->
      <template #header>
        <h1 class="blog-title">{{ articleDetail.title }}</h1>
        <div class="article-info">
          <!-- 作者信息 -->
          <div class="author-info">
            <span class="info author-tag">
              <el-icon>
                <Avatar />
              </el-icon>
              <span class="author-name">{{ articleDetail.author || i18n.t('article.anonymous') }}</span>
            </span>
          </div>
          <div class="info characters">
            <el-tooltip class="info date" effect="dark" :content="i18n.t('article.wordcount')"
              placement="bottom"><el-icon>
                <EditPen />
              </el-icon> </el-tooltip>{{ countCharacters(articleDetail.content) || 0 }}
          </div>
          <!-- 发布/更新日期 -->
          <div class="info date">
            <el-tooltip effect="dark" :content="i18n.t('article.updated_at')" placement="bottom">
              <el-icon>
                <Clock />
              </el-icon>
            </el-tooltip>
            {{ formatToDate(articleDetail.updated_at) }}
          </div>
          <div class="info views">
            <el-tooltip effect="dark" :content="i18n.t('article.views')" placement="bottom">
              <el-icon>
                <View />
              </el-icon>
            </el-tooltip>
            {{ articleDetail.meta.views || 0 }}
          </div>
        </div>
      </template>

      <!-- 博客内容区域 -->
      <div class="blog-content">
        <CustomPreview class="preview" :text="content" />
      </div>
      <template #footer>
        <div class="blog-footer">
          <div class="tags" v-if="articleDetail.tags && articleDetail.tags.length > 0">
            <el-tag v-for="(tag, index) in articleDetail.tags" :key="index" type="success" effect="dark" round>{{
  tag.name }}</el-tag>
          </div>
        </div>
      </template>
    </el-card>
    <el-skeleton :loading="loading" animated :rows="10">
      <template #default>
        
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="scss" scoped>
.container {
  user-select: text;
  background-color: transparent;
}

.article-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: $text-color-weak;

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
}

.blog-footer {
  display: flex;
  gap: 16px;

  .tags {
    display: flex;
    gap: 4px;
  }
}

.preview {
  padding: 4px;
}

.blog-header-card {
  border: 0px;
  box-shadow: none;
  display: block;
  background-color: transparent;

  .blog-title {
    //居中
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .author-name {
    font-weight: bold;
  }

  // ... 其他样式
}
</style>