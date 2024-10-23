import { ICalculateCartRES } from "../../../@types/Orders/CalculateOrderRES";
import { IOneOrderRES } from "../../../@types/Orders/OneOrderRES";
import { IOrderDto } from "../../../@types/Orders/OrderDto";
import { IUncompletedOrderDto } from "../../../@types/Orders/UncompletedOrderDto";
import { apiService } from "../apiService/emptyApiSplit";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Orders", "OrdersStatus"],
});
export const orderApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<IOneOrderRES, IOrderDto>({
            query: (orderDto) => {
                const cleanedOrdredProducts = orderDto.orderedProducts.map((ordredProduct) => {
                    const { productObj, ...rest } = ordredProduct;
                    return rest;
                });
                return { url: `/store-order-cart-public`, body: { ...orderDto, orderedProducts: cleanedOrdredProducts }, method: "POST" };
            },
        }),
        createUncompletedOrder: builder.mutation<void, IUncompletedOrderDto>({
            query: (uncompletedOrderDto) => {
                return { url: `/store-order-uncompleted-public`, body: uncompletedOrderDto, method: "POST" };
            },
        }),
        calculateSingleCartProduct: builder.mutation<ICalculateCartRES, { orderedProducts: IOrderDto["orderedProducts"]; storeId: string }>({
            query: ({ orderedProducts, storeId }) => {
                const cleanedOrdredProducts = orderedProducts.map((ordredProduct) => {
                    const { productObj, ...rest } = ordredProduct;
                    return rest;
                });
                return {
                    url: `/store-order-cart-public/calculateCart?storeId=${storeId}`,
                    body: { orderedProducts: cleanedOrdredProducts },
                    method: "POST",
                };
            },
        }),
        calculateCart: builder.mutation<ICalculateCartRES, { orderDto: IOrderDto; storeId: string }>({
            query: ({ orderDto, storeId }) => {
                const cleanedOrdredProducts = orderDto.orderedProducts.map((ordredProduct) => {
                    const { productObj, ...rest } = ordredProduct;
                    return rest;
                });
                return {
                    url: `/store-order-cart-public/calculateCart?storeId=${storeId}`,
                    body: { ...orderDto, orderedProducts: cleanedOrdredProducts },
                    method: "POST",
                };
            },
        }),
    }),
});

export const { useCreateOrderMutation, useCalculateCartMutation, useCalculateSingleCartProductMutation, useCreateUncompletedOrderMutation } =
    orderApiService;
