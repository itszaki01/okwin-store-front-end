import { IStorePageRES } from "./StorePageRES";

export interface IStorePagesRES{
    results: number;
    limit: number;
    currentPage: number;
    totalPages: number;
    totalResults: number;
    next: null | number;
    prev: null | number;
    data: IStorePageRES[];
}