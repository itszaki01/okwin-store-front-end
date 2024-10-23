
import { IOneStoreSettingsRES } from "../../../@types/StoreSettings/OneStoreSettingsRES";
import { apiService } from "../apiService/emptyApiSplit";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Orders", "OrdersStatus"],
});
export const storeSettingsApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        getStoreSettings: builder.query<IOneStoreSettingsRES, void>({
            query: () => ({ url: `/store-public` }),
        }),
        sendStorePageView: builder.mutation<void, string>({
            query: (source) => ({ url: `/store-dashboard-public/store-page-view?source="${source}"`,method:'POST' }),
        }),
    }),
});

export const { useGetStoreSettingsQuery,useSendStorePageViewMutation } = storeSettingsApiService;
