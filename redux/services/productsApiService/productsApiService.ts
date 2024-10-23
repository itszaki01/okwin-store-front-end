import { ISearchQuery } from "../../../@types/common/SearchQuery";
import { IOneProductRES } from "../../../@types/Products/OneProductRES";
import { IProductsRES } from "../../../@types/Products/ProductsRES";
import { apiService } from "../apiService/emptyApiSplit";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Orders", "OrdersStatus"],
});
export const productsApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProductsRES, ISearchQuery>({
            query: ({ page, limit, keyword, searchKey, searchMethod }) => {
                let queryString = `?page=${page}&limit=${limit}`;
                if (keyword) {
                    queryString += `&keyword=${keyword}`;
                }
                if (searchKey) {
                    queryString += `&searchKey=${searchKey}`;
                }
                if (searchMethod) {
                    queryString += `&searchMethod=${searchMethod}`;
                }

                return { url: `/store-product-public${queryString}` };
            },
        }),
        getAllProductsOffers: builder.query<IProductsRES, void>({
            query: () => ({ url: `/store-product-public/offers?sort=-updatedAt` }),
        }),
        getProductBySlug: builder.mutation<IOneProductRES, string>({
            query: (slug) => ({ url: `/store-product-public/${slug}` }),
        }),
        getAllRelatedProducts: builder.query<IProductsRES, { searchQuery: ISearchQuery; categoryId?: string }>({
            query: ({ searchQuery: { page, limit }, categoryId }) => ({
                url: `/store-product-public/relatedProducts/${categoryId}?page=${page}&limit=${limit}`,
            }),
        }),

        sendProductPageView: builder.mutation<void, string>({
            query: (productId) => ({ url: `/store-dashboard-public/product-page-view/${productId}`, method: "POST" }),
        }),
    }),
});

export const {
    useGetAllProductsOffersQuery,
    useGetAllRelatedProductsQuery,
    useGetAllProductsQuery,
    useGetProductBySlugMutation,
    useSendProductPageViewMutation,
} = productsApiService;
