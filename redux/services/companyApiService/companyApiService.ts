import { ICompanyRES } from "../../../@types/Company/CompanyRES";
import { apiService } from "../apiService/emptyApiSplit";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: [],
});
export const companyApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        getCompanyData: builder.query<ICompanyRES, void>({
            query: () => ({ url: `/company-public` }),
        }),
    }),
});

export const { useGetCompanyDataQuery } = companyApiService;
