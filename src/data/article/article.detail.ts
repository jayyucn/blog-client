import { OriginState } from "@/enums/enum.article"
import type { UniversalKeyValue } from "@/interfaces/interface.common"
import type { Tag } from "element-plus"
import type { Category } from ".."

export default interface ArticleDetail {
  // 文章id
  _id: Object 
  // 文章自增id
  id: number
  // 文章标题
  title: string
  // 文章描述
  description: string
  // 文章关键字
  keywords: string[]
  // 文章内容
  content: string
  // 文章缩略图
  thumbnail: string
  // 文章来源
  origin: OriginState
  // 是否推荐
  featured: boolean
  // 是否禁用评论
  disabled_comments: boolean
  // 文章标签
  tags: Tag[]
  // 文章分类
  categories: Category[]
  // 文章点赞数、浏览数、评论数
  meta: {
    likes: number
    views: number
    comments: number
  }
  // 文章更新时间
  updated_at: string
  // 文章创建时间
  created_at: string
  // 文章扩展信息
  extends: UniversalKeyValue[]
}
