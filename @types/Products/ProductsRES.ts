import { IProductRES } from "./ProductRES";

export interface IProductsRES {
    results: number;
    limit: number;
    currentPage: number;
    totalPages: number;
    totalResults: number;
    next: null | number;
    prev: null | number;
    data: IProductRES[];
}
