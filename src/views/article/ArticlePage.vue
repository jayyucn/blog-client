<template>
  <div class="article-container">
    <div class="navigation-panel">
      <div class="navigation-toggle" @click="toggleNav">
        <!-- <i class="iconfont icon-menu">{{ navToggle ? "<<<" : ">>>" }}</i> -->
      </div>
      <div class="navigation-list">
        <!-- v-show="navToggle" -->
        <ArticleNav :content="article.content" />
      </div>
    </div>
    <div class="article-main">
      <div class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-metadata">
          <div class="metadata-item author">
            <el-icon>
              <Avatar />
            </el-icon>
            <div class="author-name">{{ article.author || i18n.t('article.anonymous') }}</div>
          </div>
          <div class="metadata-item word-count">
            <el-tooltip class="item-tooltip" effect="dark" :content="i18n.t('article.wordcount')" placement="bottom">
              <el-icon>
                <EditPen />
              </el-icon>
            </el-tooltip>
            {{ countCharacters(article.content) || 0 }}
          </div>
          <div class="metadata-item updated-date">
            <el-tooltip effect="dark" :content="i18n.t('article.updated_at')" placement="bottom">
              <el-icon>
                <Clock />
              </el-icon>
            </el-tooltip>
            {{ formatToDate(article.updated_at) }}
          </div>
          <div class="metadata-item views">
            <el-tooltip effect="dark" :content="i18n.t('article.views')" placement="bottom">
              <el-icon>
                <View />
              </el-icon>
            </el-tooltip>
            {{ article.meta.views || 0 }}
          </div>
        </div>
      </div>
      <div class="article-body">
        <CustomPreview class="article-preview" :text="article.content" />
      </div>
      <div class="article-footer">
        <div class="article-tags" v-if="article.tags && article.tags.length > 0">
          <el-tag v-for="(tag, index) in article.tags" :key="index" type="success" effect="dark" round>
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { i18n } from '@/i18n';
import Store from '@/stores';
import { countCharacters } from '@/utils/util.string';
import { formatToDate } from '@/utils/util.time';
import { ElMessage } from 'element-plus';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import ArticleNav from './components/ArticleNav.vue';
import CustomPreview from './components/CustomPreview.vue';

const props = defineProps<{
  articleId: number
}>()
const articleDetail = Store.articleDetail;
const article = articleDetail.article;
const loading = ref(false);

onMounted(() => {
  window.scrollTo(0, 0);
})

onUnmounted(() => {
  console.log('onUnmounted')
  // 清除文章详情相关的状态和属性 
  articleDetail.clearArticleDetail()
})

watch(
  () => props.articleId,
  async (id) => {
    if (!id) return
    loading.value = true;
    await articleDetail.fetchArticleDetail(id);
    loading.value = false;
  },
  {
    flush: 'post',
    immediate: true
  }
);

const navToggle = ref(true);// 控制左侧导航的显示与隐藏
function toggleNav() {
  ElMessage.info(`点击了切换导航按钮 ${navToggle.value}`);
  navToggle.value = !navToggle.value;
}

</script>

<style lang="scss" scoped>
.article-container {
  justify-content: space-evenly;
  display: flex;
  scrollbar-width: thin;
  /* Firefox */
  // scrollbar-color: #888 #f7f7f7; /* Firefox */
  align-items: center;
  flex-direction: row;
  user-select: text;

  .navigation-panel {
    position: fixed;
    width: 200px;
    top: 10%;
    height: 80%;
    overflow-y: auto;
    left: 0;
    transition: transform 0.3s ease;
    scrollbar-width: thin;
    /* Firefox */
    -ms-overflow-style: none;

    /* IE and Edge */
    &::-webkit-scrollbar {
      width: 8px;
      /* width of the entire scrollbar */
    }

    &::-webkit-scrollbar-track {
      background: #f7f7f7;
      /* color of the tracking area */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      /* color of the scroll thumb */
      border-radius: 8px;
      /* roundness of the scroll thumb */
    }

    &.is-active {
      transform: translateX(0);
    }
  }

  .article-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: $g-content-max-width;

    .article-body {
      display: block;
    }

    .article-header,
    .article-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .article-header {
      text-align: center;

      .article-title {
        padding: 0 20px;
        font-size: 28px;
        font-weight: bold;
      }

      .article-metadata {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        font-size: 14px;

        .metadata-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    .article-footer.article-tags {
      flex-wrap: wrap;
      gap: 10px;
    }
  }
}

@media (max-width: $g-screen-width728) {

  .article-main {
    // margin-left: 0;
    width: 100%;
  }

}

@media (max-width: $g-screen-width1080) {
  .article-container {
    flex-direction: column;
  }

  // 在这里添加你的样式
  .navigation-panel {
    display: none;
  }
}
</style>