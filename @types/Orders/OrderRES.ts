import { ILocationRES } from "../Locations/LocationRES";
import { Modify } from "../Modify";
import { IProductRES } from "../Products/ProductRES";
import { IOrderDto } from "./OrderDto";

export interface IOrderRES
    extends Modify<
        IOrderDto,
        {
            locationId?: ILocationRES;
            clientCity?: string;
            storeName: string;
            clientPhoneNumber?: string;
            clientName?: string;
            totalCartPrice: number;
            totalProductsPrice: number;
            allowCustomTotalProductsPrice: boolean;
            allowCustomShippingPrice: boolean;
            shippingPrice: number;
            isFreeShipping: boolean;
            stopDeskId?: string;
            store: string;
            isFromSubStore: boolean;
            orderNumber: number;
            cartUID: string;
            orderTracking?: string;
            assignToStoreCallMember?: string;
            totalProductsFees: number;
            isNewClient: boolean;
            isDangerClient: boolean;
            totalPreviousOrders: number;
            previousOrdersAnlytics: {
                confrirmedOrders: number;
                cancledOrders: number;
                returnedOrders: number;
                delivredOrders: number;
            };
            orderedProducts: {
                productId: IProductRES;
                quentity: number;
                totalProductPrice?: number;
                totalProductFees?: number;
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
            createdAt: string;
            updatedAt: string;
            _id: string;
        }
    > {}
