export interface ISearchQuery {
    page: number;
    limit: number;
    keyword?: string;
    searchMethod?: string;
    searchKey?: string;
    sort?:string
}
