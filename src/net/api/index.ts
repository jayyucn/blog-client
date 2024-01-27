import ArticleAPI from "./article"

export default class API {
    public static article: ArticleAPI
    public static init() { // 初始化API，例如连接到数据库等操作。
        this.article = new ArticleAPI()
    }
}

window['API'] = API