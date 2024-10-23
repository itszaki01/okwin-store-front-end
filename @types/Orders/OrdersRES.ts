import { IOrderRES } from "./OrderRES";

export interface IOrdersRES {
    results: number;
    limit: number;
    currentPage: number;
    totalPages: number;
    totalResults: number;
    next: null | number;
    prev: null | number;
    data: IOrderRES[];
}
