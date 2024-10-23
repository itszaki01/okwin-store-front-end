import { IProductsRES } from "../../../@types/Products/ProductsRES";
import { Stack, SimpleGrid, Skeleton, Pagination } from "@mantine/core";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import ProductCard from "../ProductCard/ProductCard";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { ISearchQuery } from "../../../@types/common/SearchQuery";

interface IProps {
    productsData?: IProductsRES;
    isGettingsProducts: boolean;
    setSearchQuery: React.Dispatch<React.SetStateAction<ISearchQuery>>;
}
export default function ProductsWrapper({ productsData, isGettingsProducts, setSearchQuery }: IProps) {
    const { isSmallScreen, isXsMobile, isMobile } = useDevicesContext();
    const {
        appearance: { themeButtonsColors, themeButtonsTextColor, itemsInPage },
    } = useStoreSettingsSlice();

    return (
        <Stack maw={1000} m={"auto"} align="center">
            <SimpleGrid cols={isSmallScreen ? 2 : 4}>
                {isGettingsProducts
                    ? Array.from({ length: itemsInPage }, (_, idx) => <Skeleton key={idx} w={isXsMobile ? 165 : isMobile ? 190 : 220} h={320} />)
                    : productsData?.data && productsData.data.map((product) => <ProductCard key={product._id} productData={product} />)}
            </SimpleGrid>
            <Pagination
                radius={"md"}
                color={themeButtonsColors}
                onChange={(value) => setSearchQuery({ page: value, limit: itemsInPage })}
                c={themeButtonsTextColor}
                total={productsData?.totalPages || 0}
                value={productsData?.currentPage}
            />
        </Stack>
    );
}
