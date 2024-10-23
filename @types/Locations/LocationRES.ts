import { Modify } from "../Modify";
import { ILocationDto } from "./LocationDto";
export interface ILocationRES
    extends Modify<
        ILocationDto,
        {
            totalConfirmedOrders: number;
            totalCompletedOrders: number;
            totalReturnedOrders: number;
            totalStopDesks: number;
            totalSubLocations: number;
            percentageCompletedOrders: number;
            percentageReturnedOrders: number;
            store: string;
            _id: string;
            id:string
            createdAt: string;
            updatedAt: string;
        }
    > {}
