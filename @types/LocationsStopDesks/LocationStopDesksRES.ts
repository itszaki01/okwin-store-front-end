import { ILocationStopDeskRES } from "./LocationStopDeskRES";

export interface ILocationStopDesksRES {
    results: number;
    limit: number;
    currentPage: number;
    totalPages: number;
    totalResults: number;
    next: null | number;
    prev: null | number;
    data: ILocationStopDeskRES[];
}