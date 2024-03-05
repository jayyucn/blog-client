import type ArticleBrief from '@/data/article/article.brief';
import type ArticleDetail from '@/data/article/article.detail';
import type { Pagination, PaginationList } from '@/interfaces/interface.common';
import { deepClone } from '@/utils/util.object';
import { defineStore } from 'pinia';

interface ArticleDetailState {
  article: ArticleDetail; // 定义一个响应式数据，用于存储文章详情
}

const defaultArticle: ArticleDetail = {
  _id: null,
  id: 0,
  author: '',
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
}

export const useArticleDetailStore = defineStore('articleDetail', {
  state: (): ArticleDetailState => {
    return {
      article: deepClone(defaultArticle),
    }
  },
  getters: {

    getArticle(): ArticleDetail {
      return this.article
    },
    getTitle(): string {
      return this.article.title
    },

    getAuthor(): string {
      return this.article.author
    },
    getUpdatedAt(): string {
      return this.article.updated_at
    },
    getCreateAt(): string {
      return this.article.created_at
    },
    
    getContent(): string {
      return this.article.content
    }
  },
  actions: {
    setArticleDetail(article: ArticleDetail) {
      this.article = deepClone(article)
    },

    clearArticleDetail() {
      this.article = deepClone(defaultArticle)
    }
  },
})

interface PaginationListState {
  pagination: Pagination
  articleList: ArticleBrief[]
}

export type ArticleDetailStore = ReturnType<typeof useArticleDetailStore>

export const useArticleListStore = defineStore('articleList', {
  state: (): PaginationListState => {
    return {
      pagination: {
        current_page: 1,
        total_page: 1,
        page_size: 10,
        total_count: 0,
      },
      articleList: [], // 文章列表
    }
  },
  getters: {
    getPagination(): Pagination {
      return this.pagination
    },

    getCurrentPage(): number {
      return this.pagination.current_page || 1
    },

    getPageSize(): number {
      return this.pagination.page_size || 10
    },

    getTotalCount(): number {
      return this.pagination.total_count || 0
    },

    getArticleList(): ArticleBrief[] {
      return this.articleList
    }
  },
  actions: {
    setPaginationList(list: PaginationList<ArticleBrief>) {
      this.pagination = deepClone(list.pagination)
      this.articleList = deepClone(list.data)
    }
  }

})
export type ArticleListStore = ReturnType<typeof useArticleListStore>

