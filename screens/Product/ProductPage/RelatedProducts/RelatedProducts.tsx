import { useState } from "react";
import ProductsWrapper from "../../../../components/common/ProductsWrapper/ProductsWrapper";
import { ISearchQuery } from "../../../../@types/common/SearchQuery";
import { useStoreSettingsSlice } from "../../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { Divider, Fieldset, Stack, Title } from "@mantine/core";
import { useGetAllRelatedProductsQuery } from "../../../../redux/services/productsApiService/productsApiService";
import { useProductDataContext } from "../../../../contexts/PorudctDataContext";

export default function RelatedProducts() {
    const {
        appearance: { itemsInPage, themeColor },
    } = useStoreSettingsSlice();
    const { productData } = useProductDataContext();

    const [searchQuery, setSearchQuery] = useState<ISearchQuery>({ page: 1, limit: itemsInPage });
    const {
        data: productsData,
        isFetching: isGettingProductsData,
        isError,
    } = useGetAllRelatedProductsQuery({
        searchQuery,
        categoryId: productData.category?._id,
    });
    if (productsData?.data.length === 0) return <></>;

    return (
        <Stack>
            {!isError && (
                <Divider
                    label={
                        <Fieldset radius={12}>
                            <Title c={themeColor}>منتجات مشابهة</Title>
                        </Fieldset>
                    }
                    w={"100%"}
                />
            )}
            <ProductsWrapper productsData={productsData} isGettingsProducts={isGettingProductsData} setSearchQuery={setSearchQuery} />
        </Stack>
    );
}
