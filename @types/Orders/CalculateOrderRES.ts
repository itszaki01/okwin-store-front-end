export interface ICalculateCartRES {
    data: {
        totalCartPrice: number;
        totalProductsFees: number;
        totalCartProductsPrice: number;
        shippingPrice: number;
        finaleDiscountPrice: number;
    };
}
