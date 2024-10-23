export interface ILocationStopDeskDto {
    stopDeskAddress: string;
    stopDeskShippingPrice: number;
    locationId?: string;
    allowStopDeskShippingFakePrice: boolean;
    stopDeskShippingFakePrice?: number;
    isActive:boolean,
    stopDeskIndex?:number
}
