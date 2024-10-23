import { IOneStorePageRES } from "../../../@types/StorePages/OneStorePageRES";
import { IStorePagesRES } from "../../../@types/StorePages/StorePagesRES";
import { apiService } from "../apiService/emptyApiSplit";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Orders", "OrdersStatus"],
});
export const storePagesApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        getAllStorePages: builder.query<IStorePagesRES, void>({
            query: () => ({ url: `/store-page-public?sort=pageIndex` }),
        }),
        getOneStorePageBySlug: builder.mutation<IOneStorePageRES, string>({
            query: (pageSlug) => ({ url: `/store-page-public/${pageSlug}` }),
        }),
    }),
});

export const { useGetAllStorePagesQuery, useGetOneStorePageBySlugMutation } = storePagesApiService;
