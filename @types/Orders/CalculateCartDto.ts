export interface ICalculateCartDto {
    locationId: string;

    stopDeskId?: string;

    shippingType: "للمنزل" | "لنقطة الإستلام" | "مجاني";
    
    coupon?:string
    
    orderedProducts: {
        productId: string;
        quentity: number;
        propertiesSelected?: {
            parentPropertyId: string;
            childPropertiesSelected: {
                childPropertyId: string;
                childPropertyQtty?: number;
            }[];
        }[];
        colorsSelected?: {
            colorId: string;
            colorQtty?: number;
        }[];
        offerId?: string;
    }[];
}
