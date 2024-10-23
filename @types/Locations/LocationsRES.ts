import { ILocationRES } from "./LocationRES";

export interface ILocationsRES {
    results: number;
    limit: number;
    currentPage: number;
    totalPages: number;
    totalResults: number;
    next: null | number;
    prev: null | number;
    data: ILocationRES[];
}