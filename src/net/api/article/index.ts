import type ArticleBrief from "@/data/article/article.brief"
import type ArticleDetail from "@/data/article/article.detail"
import type { PaginationList } from "@/interfaces/interface.common"
import http from "@/net/http"
import { ResponseStatus } from "@/net/http/types"
import Store from "@/stores"
import { APIKey } from "../apikey"
export interface PaginationParam {
    page: number
    pageSize: number

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
    public async fetchAritcleList(param: any = {}): Promise<void> {
        const rsp = await http.get<PaginationList<ArticleBrief>>({
            url: `${APIKey.ARTICLE_LIST}`,
            ...param
        })
        // rsp = json as any
        if (rsp.status == ResponseStatus.Success) {
            Store.articleList.setPaginationList(rsp.result) // 更新全局状态
        }
    }
}