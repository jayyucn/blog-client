import type ArticleDetail from '@/data/article/article.detail';
import { deepClone } from '@/utils/util.object';
import { defineStore } from 'pinia';

interface ArticleDetailState {
  article: ArticleDetail; // 定义一个响应式数据，用于存储文章详情
}


export const useArticleDetailStore = defineStore('articleDetail', {
  state: (): ArticleDetailState => {
    return {
      article: {
        _id: null,
        id: 0,
        title: '',
        description: '',
        keywords: [],
        content: '',
        thumbnail: '',
        origin: 0,
        featured: false,
        disabled_comments: false,
        tags: [],
        categories: [],
        meta: {
          likes: 0,
          views: 0,
          comments: 0
        },
        updated_at: '',
        created_at: '',
        extends: [],
      },
    }
  },
  getters: {
    getArticle(): ArticleDetail {
      return this.article
    }
  },
  actions: {
    setArticleDetail(article: ArticleDetail) {
      this.article = deepClone(article)
    }
  },
  persist: true
})

export type ArticleDetailStore = ReturnType<typeof useArticleDetailStore>

