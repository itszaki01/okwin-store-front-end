
import { apiService } from "../apiService/emptyApiSplit";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Orders", "OrdersStatus"],
});
export const apiEmptyTemplate = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        getAllLocations: builder.query<void, void>({
            query: () => ({ url: `/store-location?sort=locationIndex` }),
        }),
    }),
});

export const { useGetAllLocationsQuery } = apiEmptyTemplate;
