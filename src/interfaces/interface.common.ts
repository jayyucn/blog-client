export interface UniversalKeyValue {
    name: string
    value: string
  }
  
  export interface Pagination {
    current_page: number
    total_page: number
    page_size: number
    total_count: number
  }
  
  export interface PaginationList<D> {
    data: Array<D>
    pagination: Pagination
  }
  