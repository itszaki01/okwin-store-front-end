import { ICategoryRES } from "./CategoryRES";

export interface ICateogriesRES {
    limit: number;
    currentPage: number;
    totalPages: number;
    totalResults: number;
    next: number | null;
    prev: number | null;
    data: ICategoryRES[];
}
