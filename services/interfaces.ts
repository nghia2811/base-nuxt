export * from '~/services/history'

export interface Pagination {
    total?: number
    page?: number
    limit?: number
    order_by?: string,
    order_desc?: boolean
}
