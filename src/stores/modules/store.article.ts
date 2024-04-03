import type ArticleBrief from '@/data/article/article.brief';
import type ArticleDetail from '@/data/article/article.detail';
import type { Pagination, PaginationList } from '@/interfaces/interface.common';
import API from '@/net/api';
import { ResponseStatus } from '@/net/http/types';
import { deepClone } from '@/utils/util.object';
import * as lodash from 'lodash';
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
  state: (): ArticleDetailState => ({
    article: defaultArticle,
  }),
  actions: {
    async fetchArticleDetail(articleId: number) {
      const rsp = await API.article.fetchAritcleDetail(articleId);
      if (rsp.status == ResponseStatus.Success) {
        lodash.merge(this.article, rsp.result); // 合并对象，保持响应性
      Object.assign(this.article, rsp.result); // 直接更新状态，保持响应性
      } else {
        this.clearArticleDetail(); // 可以添加错误处理逻辑
      }
    },
    clearArticleDetail() {
      lodash.merge(this.article, defaultArticle); // 合并对象，保持响应性
    }
  },
});

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
    },
    setCurrentPage(page: number): void {
      this.pagination.current_page = page
    },
  }

})
export type ArticleListStore = ReturnType<typeof useArticleListStore>

