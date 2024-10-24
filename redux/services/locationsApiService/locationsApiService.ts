import { ILocationsRES } from "../../../@types/Locations/LocationsRES";
import { ILocationStopDesksRES } from "../../../@types/LocationsStopDesks/LocationStopDesksRES";
import { ILocationsSubRES } from "../../../@types/LocationsSub/LocationsSubRES";
import { apiService } from "../apiService/emptyApiSplit";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Orders", "OrdersStatus"],
});
export const locationsApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        getAllLocations: builder.query<ILocationsRES, { allowLocations: boolean }>({
            query: ({ allowLocations }) => {
                if (allowLocations) {
                    return { url: `/store-location-public?domain=${location.hostname}&sort=locationIndex` };
                } else {
                    throw new Error("الرجاء تفعيل المناطق ");
                }
            },
        }),
        getAllLocationStopDesks: builder.query<ILocationStopDesksRES, string | undefined>({
            query: (locationId) => {
                if (locationId) {
                    return { url: `/store-location-stop-desk-public/${locationId}?domain=${location.hostname}&sort=stopDeskIndex` };
                } else {
                    throw new Error("الرجاء إختيار منطقة");
                }
            },
        }),
        getAllLocationSubLocations: builder.query<ILocationsSubRES, string | undefined>({
            query: (locationId) => {
                if (locationId) {
                    return { url: `/store-location-sub-public/${locationId}?domain=${location.hostname}&sort=subLocationIndex` };
                } else {
                    throw new Error("الرجاء إختيار منطقة");
                }
            },
        }),
    }),
});

export const { useGetAllLocationsQuery, useGetAllLocationStopDesksQuery, useGetAllLocationSubLocationsQuery } = locationsApiService;
