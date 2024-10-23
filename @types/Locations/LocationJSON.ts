export interface ILocationJSON {
    locationName: string;
    locationIndex?: number;
    shippingToHomePrice: number;
    stopDesks?: {
        stopDeskAddress: string;
        stopDeskShippingPrice: number;
    }[];
    subLocations?: string[];
}
