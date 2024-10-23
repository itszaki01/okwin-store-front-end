import { ICategoryRES } from "../Categories/CategoryRES";

export interface IProductRES {
    allowSpecialGoogleSheet?: boolean;

    specialGoogleSheetsApiKey?: string;

    showProduct: boolean;

    disableAddToShoppingCart?: boolean;

    disableSuggestedProducts?: boolean;

    productSku?: string;

    name: string;

    productShortName: string;

    productFees?: number;

    price: number;

    description?: string;

    freeShipping: boolean;

    isLimitedQtty: boolean;

    remainingQtty: number;

    landingPage?: boolean;

    rating?: number;

    oldPrice: number;

    slug: string;

    seoKeywords?: string[];

    seoDescreption?: string;

    seoImgUrl?: string;

    productDesc?: string;

    category?: ICategoryRES;

    categorySub?: string;

    imageCover: string;

    pageViews: number;
    totalConfirmedOrders: number;
    totalCompletedOrders: number;
    totalReturnedOrders: number;
    percentageCompletedOrders: number;
    percentageReturnedOrders: number;
    hasMultiSelect: boolean;
    hasOffers: boolean;
    hasProperties?: boolean;
    hasCustomPrices?: boolean;
    hasReviews?: boolean;
    hasColors?: boolean;
    hasProperteisLimtedQtty?: boolean;
    hasOtherProperties?: boolean;
    totalRemainingQttyColors: number;
    totalRemainingQttyOtherProperties: number;
    totalPropertiesRemainingQtty: number;
    totalRemainingQtty: number;
    images: [
        {
            _id: string;
            imageUrl: string;
            imageVar?: string;
        }
    ];
    colors?: {
        multiSelect: boolean;
        allowCustomPrices: boolean;

        list: [
            {
                _id: string;
                hex: string;
                colorSku?: string;
                name: string;
                imageVar?: string;
                isLimitedQtty: boolean;
                remainingQtty?: number;
                allowCustomPrice: boolean;
                allowCustomFees: boolean;
                customFees: number;
                customPrice: number;
                ordredQtty?: number;
            }
        ];
    };
    otherProperties?: [
        {
            _id: string;
            title: string;
            multiSelect: boolean;
            allowCustomPrices: boolean;
            properties: [
                {
                    _id: string;
                    name: string;
                    hasIcon: boolean;
                    propertySku?: string;
                    imageVar?: string;
                    isLimitedQtty: boolean;
                    remainingQtty?: number;
                    ordredQtty?: number;
                    allowCustomPrice: boolean;
                    customPrice: number;
                    allowCustomFees: boolean;
                    customFees: number;
                    iconUrl: string;
                }
            ];
        }
    ];
    offers?: {
        _id: string;
        offerName: string;
        quanitity: number;
        offerProductPrice: number;
        freeShipping: boolean;
        bestOffer: boolean;
        allowCustomImg: boolean;
        customImgLink: string;
        customColor?: string;
    }[];

    reviews?: {
        _id: string;
        gender: "male" | "female";
        allowRaterProfileImage: boolean;
        raterProfileImage: string;
        raterName: string;
        rating: number;
        review: string;
        imageUrl: string;
    }[];
    createdAt: string;
    updatedAt: string;
    _id: string;
}
