import type ArticleBrief from "@/data/article/article.brief"
import type ArticleDetail from "@/data/article/article.detail"
import type { PaginationList } from "@/interfaces/interface.common"
import http from "@/net/http"
import { ResponseStatus } from "@/net/http/types"
import Store from "@/stores"
import { APIKey } from "../apikey"

export enum SortType {
    Asc = 1, // 升序
    Desc = -1, // 降序
    Hottest = 2 // 热序
  }

  export enum PublishState {
    Draft = 0, // 草稿
    Published = 1, // 已发布
    Recycle = -1 // 回收站
  }
  export enum PublicState {
    Public = 1, // 公开
    Secret = -1, // 私密
    Reserve = 0 // 保留（限制）
  }
  export enum OriginState {
    Original = 0, // 原创
    Reprint = 1, // 转载
    Hybrid = 2 // 混合
  }
export interface PaginationParam {
    page: number
    page_size: number

}

export interface KeywordQueryDTO {
    keyword?: string
}

export interface PaginateOptionWithHotSortDTO extends PaginationParam {
    sort?: SortType
}

export interface ArticlePaginateQueryDTO extends PaginateOptionWithHotSortDTO, KeywordQueryDTO {
    state?: PublishState
    public?: PublicState
    origin?: OriginState
    featured?: boolean;
    tag_slug?: string;
    category_slug?: string;
}

export default class ArticleAPI {
    /**
     * 获取文章详情
     *
     * @param {number} articcleId 
     * @memberof ArticleAPI
     */
    public async fetchAritcleDetail(articcleId: number): Promise<void> {
        const rsp = await http.get<ArticleDetail>({ url: `${APIKey.ARTICLE}/${articcleId}` })
        if (rsp.status == ResponseStatus.Success) {
            Store.articleDetail.setArticleDetail(rsp.result) // 更新全局状态
        }
    }

    /**
     * 获取文章列表
     *
     * @return {*}  {Promise<void>}
     * @memberof ArticleAPI
     */
    public async fetchAritcleList(query: ArticlePaginateQueryDTO = {
        page: 0,
        page_size: 0
    }): Promise<void> {
        const rsp = await http.get<PaginationList<ArticleBrief>>({
            url: `${APIKey.ARTICLE_LIST}`,
            params: query
        })
        // rsp = json as any
        if (rsp.status == ResponseStatus.Success) {
            Store.articleList.setPaginationList(rsp.result) // 更新全局状态
        }
    }
}