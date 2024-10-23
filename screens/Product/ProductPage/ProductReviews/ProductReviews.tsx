import { useProductDataContext } from "../../../../contexts/PorudctDataContext";
import { Divider, SimpleGrid, Stack, Title } from "@mantine/core";
import { useStoreSettingsSlice } from "../../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import ProductReviewCard from "./ProductReviewCard/ProductReviewCard";

export default function ProductReviews() {
    const { productData } = useProductDataContext();
    const {
        appearance: { themeColor },
    } = useStoreSettingsSlice();
    return (
        <>
            <Divider w={"100%"} />
            <Stack>
                <Title c={themeColor} order={2}>
                    مراجعات الزبائن
                </Title>
                <SimpleGrid cols={2} mb={10}>
                    <Stack>
                        {productData.reviews?.map((review, index) => index % 2 === 0 && <ProductReviewCard key={index} reviewData={review} />)}
                    </Stack>
                    <Stack>
                        {productData.reviews?.map((review, index) => index % 2 !== 0 && <ProductReviewCard key={index} reviewData={review} />)}
                    </Stack>
                </SimpleGrid>
            </Stack>
        </>
    );
}
