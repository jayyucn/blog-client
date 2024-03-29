<template>
  <div class="article-detail">
    <div class="article-nav">
      <!-- 左侧文章目录导航 -->
      <div class="nav-toggle" @click="toggleNav">
        <i class="iconfont icon-menu"></i>
      </div>
      <div v-if="navToggle" class="nav-list">
        <!-- 文章目录列表 -->
        <ArticleNav :content="content" />
      </div>
    </div>
    <div class="article-content">
      <div class="header">
        <!-- 文章标题 -->
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
      </div>
      <div class="content">
        <!-- 文章内容 -->
        <CustomPreview class="preview" :text="content" />
      </div>
      <div class="footer">
        <!-- 文章底部 -->
        <div class="tags" v-if="articleDetail.tags && articleDetail.tags.length > 0">
          <el-tag v-for="(tag, index) in articleDetail.tags" :key="index" type="success" effect="dark" round>{{
        tag.name }}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { i18n } from '@/i18n';
import API from '@/net/api';
import Store from '@/stores';
import { countCharacters } from '@/utils/util.string';
import { formatToDate } from '@/utils/util.time';
import { computed, onBeforeMount, onUnmounted, ref, watch } from 'vue';
import ArticleNav from './components/ArticleNav.vue';
import CustomPreview from './components/CustomPreview.vue';

const props = defineProps<{
  articleId: number
}>()

const articleDetail = computed(() => Store.articleDetail.article)


const content = computed(() => {
  return Store.articleDetail.getContent;
}) // 文章内容

const loading = ref(false);
const fetchArticleDetail = async (id: number) => {
  if (id) {
    loading.value = true;
    await API.article.fetchAritcleDetail(id);
    loading.value = false;
  }
}

onBeforeMount(() => {
  console.log('onBeforeMount', props.articleId);
  fetchArticleDetail(props.articleId);
})

onUnmounted(() => {
  console.log('onUnmounted')
  // 清除文章详情相关的状态和属性 
  Store.articleDetail.clearArticleDetail()
})

watch(
  () => props.articleId,
  (id) => {
    console.log('articleId changed:', id);
    fetchArticleDetail(id);
  },
  { flush: 'post' }
);


const navToggle = ref(true);// 控制左侧导航的显示与隐藏

function toggleNav() {
  navToggle.value = !navToggle.value;
}

</script>

<style lang="scss" scoped>
.article-detail {
  display: flex;
  justify-content: center;
  align-items: start;
}

.article-nav {
  position: fixed;
  width: 200px;
  height: 1000px;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 100;
}

.footer {
  display: flex;
  align-items: start;
  gap: 16px;

  .tags {
    display: flex;
    gap: 4px;
  }
}

.article-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
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

.header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}


.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>