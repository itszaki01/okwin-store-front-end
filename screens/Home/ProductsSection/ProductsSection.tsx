import { useGetAllProductsQuery } from "../../../redux/services/productsApiService/productsApiService";
import ProductsWrapper from "../../../components/common/ProductsWrapper/ProductsWrapper";
import { useState } from "react";
import { ISearchQuery } from "../../../@types/common/SearchQuery";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { Stack, Title } from "@mantine/core";

export default function ProductsSection() {
    const {
        appearance: { itemsInPage },
    } = useStoreSettingsSlice();
    const [searchQuery, setSearchQuery] = useState<ISearchQuery>({ page: 1, limit: itemsInPage });
    const { data: productsData, isFetching: isGettingProductsData } = useGetAllProductsQuery(searchQuery);
    return (
        <Stack align="center">
            {productsData?.data && productsData.data.length > 0 && <Title>منتجات متجرنا</Title>}
            <ProductsWrapper productsData={productsData} isGettingsProducts={isGettingProductsData} setSearchQuery={setSearchQuery} />
        </Stack>
    );
}
