import { useLocation, useParams } from "react-router-dom";
import { ICategoryRES } from "../../@types/Categories/CategoryRES";
import { useEffect, useState } from "react";
import { useGetCategoryBySlugMutation } from "../../redux/services/categoriesApiService/categoriesApiService";
import MyLoader from "../../components/common/MyLoader/MyLoader";
import { Fieldset, Image, Stack, Title } from "@mantine/core";
import { useGetAllRelatedProductsQuery } from "../../redux/services/productsApiService/productsApiService";
import { ISearchQuery } from "../../@types/common/SearchQuery";
import { useStoreSettingsSlice } from "../../redux/features/storeSettingsSlice/storeSettingsSlice";
import ProductsWrapper from "../../components/common/ProductsWrapper/ProductsWrapper";
import StoreCategoriesSection from "../Home/StoreCategoriesSection/StoreCategoriesSection";

export default function Category() {
    const { state: categoryCashedData } = useLocation() as { state: ICategoryRES | undefined };
    const { categorySlug } = useParams() as { categorySlug: string | undefined };
    const [categoryData, setCategoryData] = useState<ICategoryRES | undefined>(categoryCashedData);
    const [GetCategoryBySlug, { isLoading: isGettingCategory }] = useGetCategoryBySlugMutation();
    const {
        appearance: { itemsInPage },
    } = useStoreSettingsSlice();
    const [searchQuery, setSearchQuery] = useState<ISearchQuery>({ page: 1, limit: itemsInPage });
    const { data: productsData, isFetching: isGettingProductsData } = useGetAllRelatedProductsQuery({
        categoryId: categoryData?._id as string,
        searchQuery,
    });

    useEffect(() => {
        if (categoryCashedData) setCategoryData(categoryCashedData);
    }, [categoryCashedData]);

    useEffect(() => {
        (async () => {
            if (!categoryCashedData && categorySlug) {
                const category = await GetCategoryBySlug(categorySlug).unwrap();
                setCategoryData(category.data);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categorySlug, categoryCashedData]);

    return (
        <>
            {!categoryData || isGettingCategory ? (
                <MyLoader />
            ) : (
                <>
                    <Stack mt={20} maw={1000} m={"auto"} w={"100%"}>
                      
                        <Fieldset >
                            <Stack align="center">
                                <Image w={100} src={categoryData.iconUrl} />
                                <Title order={2} ta={"center"}>
                                    {categoryData.name}
                                </Title>
                            </Stack>
                        </Fieldset>

                        <ProductsWrapper setSearchQuery={setSearchQuery} productsData={productsData} isGettingsProducts={isGettingProductsData} />
                        <StoreCategoriesSection/>
                    </Stack>
                </>
            )}
        </>
    );
}
