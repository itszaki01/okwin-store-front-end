import { ILocationSubDto } from "./LocationSubDto";

export interface ILocationSubRES extends ILocationSubDto {
    _id: string;
    id:string
    store: string;
    createdAt: string;
    updatedAt: string;
}
