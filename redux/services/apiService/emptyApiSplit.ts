import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "https://api.dns-safir.click/v1";

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("X-AFFLITA-JWT");
        if (token) {
            headers.set("X-AFFLITA-JWT", token);
        }
        return headers;
    },
});

export const apiService = createApi({
    reducerPath: "api",
    baseQuery,
    endpoints: () => ({}),
});
