import type ArticleDetail from "@/data/article/article.detail"
import http from "@/net/http"
import Store from "@/stores"
import { APIKey } from "../apikey"

export default class ArticleAPI {
    /**
     * 获取文章详情
     *
     * @param {number} articcleId 
     * @memberof ArticleAPI
     */
    public async fetchAritcleDetail(articcleId:number): Promise<void> {
        const rsp = await http.get<ArticleDetail>({url: `${APIKey.ARTICLE}/${articcleId}`})
        if(rsp.code == 0){ 
            Store.articleDetail.setArticleDetail(rsp.result) // 更新全局状态
        }
    }
}