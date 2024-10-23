import { IProductRES } from "../Products/ProductRES";
import { IStorSettingsRES } from "../StoreSettings/StoreSettingsRES";

export interface IOrderDto {
    locationId?: string;

    clientCity?: string;

    cartUID:string

    clientPhoneNumber?: string;

    clientSecondPhoneNumber?: string;

    clientFullAdress?:string

    clientName?:string

    stopDeskId?: string;

    shippingType: "للمنزل" | "لنقطة الإستلام" | "مجاني";

    shippingDetails: {
        fieldName: string;
        fieldValue: string;
        fieldType: IStorSettingsRES['orderFormInputs'][number]['inputType']
        fieldId: string;
    }[];

    coupon?:string

    orderedProducts: {
        productId: string;
        productObj: IProductRES;
        totalCartProductsPrice?:number,
        quentity: number;
        propertiesSelected?: {
            parentPropertyId: string;
            childPropertiesSelected: {
                childPropertyId: string;
                childPropertyQtty?: number;
                chidlProeprtyObj?: NonNullable<IProductRES["otherProperties"]>[number]["properties"][number];
            }[];
        }[];
        colorsSelected?: {
            colorId: string;
            colorQtty?: number;
            colorObj?: NonNullable<IProductRES["colors"]>["list"][number];
        }[];
        offerId?: string;
    }[];
}
