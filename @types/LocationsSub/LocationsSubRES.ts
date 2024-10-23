import { ILocationSubRES } from "./LocationSubRES";

export interface ILocationsSubRES {
    results: number;
    limit: number;
    currentPage: number;
    totalPages: number;
    totalResults: number;
    next: null | number;
    prev: null | number;
    data: ILocationSubRES[];
}