import type { UniversalKeyValue } from "@/interfaces/interface.common"

// 导出标签接口
export interface Tag {
    // 标签id
    _id: string
    // 标签自增id
    id: number
    // 标签名称
    name: string
    // 标签路径
    slug: string
    // 标签描述
    description: string
    // 标签更新时间
    updated_at: string
    // 标签创建时间
    created_at: string
    // 标签扩展信息
    extends: UniversalKeyValue[]
    // 标签文章数量
    article_count: number
  }

  // 导出分类接口
  export interface Category {
    // 分类id
    _id: string
    // 分类自增id
    id: number
    // 分类父id
    pid: string
    // 分类名称
    name: string
    // 分类路径
    slug: string
    // 分类描述
    description: string
    // 分类更新时间
    updated_at: string
    // 分类创建时间
    created_at: string
    // 分类扩展信息
    extends: UniversalKeyValue[]
    // 分类文章数量
    article_count: number
  }
 