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
          <div class="info author-info">
            <el-icon>
              <Avatar />
            </el-icon>
            <div class="author-name">{{ articleDetail.author || i18n.t('article.anonymous') }}</div>
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
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


onMounted(() => {
  window.scrollTo(0, 0);
})

onUnmounted(() => {
  console.log('onUnmounted')
  // 清除文章详情相关的状态和属性 
  Store.articleDetail.clearArticleDetail()
})

watch(
  () => props.articleId,
  (id) => {
    fetchArticleDetail(id);
  },
  {
    flush: 'post',
    /** watch 默认是懒执行的：仅当数据源变化时，才会执行回调。
     * immediate选项会在创建侦听器时，立即执行一遍回调。
     */
    immediate: true 
  }
);


const navToggle = ref(true);// 控制左侧导航的显示与隐藏

function toggleNav() {
  navToggle.value = !navToggle.value;
}

</script>

<style lang="scss" scoped>
.article-detail {
  display: flex;
  // justify-content: center;
  align-items: start;
  font-size: 14px;
}

.article-nav {
  position: fixed;
  width: 200px;
  top: 10%;
  height: 80%;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
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
  width: $g-content-max-width;
  user-select: text;
  background-color: transparent;
}

.article-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  line-height: 20px;
  // font-size: 0.58em;
  font-size: 14px;
  // font-weight: 400;
  color: $text-color-weak;

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
}

.header {
  font-weight: 700;
  margin-bottom: 20px;
}


.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>