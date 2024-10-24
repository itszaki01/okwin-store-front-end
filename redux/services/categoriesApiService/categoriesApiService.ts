
import { ICateogriesRES } from "../../../@types/Categories/CategoriesRES";
import { IOneCategoryRES } from "../../../@types/Categories/OneCategoryRES";
import { apiService } from "../apiService/emptyApiSplit";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Orders", "OrdersStatus"],
});
export const categoriesApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query<ICateogriesRES, void>({
            query: () => ({ url: `/store-category-public?sort=categoryIdx?domain=${location.hostname}` }),
        }),
        getCategoryBySlug: builder.mutation<IOneCategoryRES, string>({
            query: (categorySlug) => ({ url: `/store-category-public/${categorySlug}?domain=${location.hostname}` }),
        }),
    }),
});

export const { useGetAllCategoriesQuery,useGetCategoryBySlugMutation } = categoriesApiService;
