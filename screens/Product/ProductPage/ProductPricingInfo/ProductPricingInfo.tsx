import { Group, Text } from "@mantine/core";
import ProductBadge from "../../../../components/common/ProductBadge/ProductBadge";
import { useProductDataContext } from "../../../../contexts/PorudctDataContext";
import { useStoreSettingsSlice } from "../../../../redux/features/storeSettingsSlice/storeSettingsSlice";

export default function ProductPricingInfo() {
    const {
        currency,
        appearance: { themeColor },
    } = useStoreSettingsSlice();
    const { productData } = useProductDataContext();

    return (
        <Group wrap="wrap">
            <Text c={themeColor} fz={32} fw={700}>
                {productData.price} {currency}
            </Text>
            {productData.oldPrice && (
                <>
                    <Text td={"line-through"} fz={25} c={"gray.8"}>
                        {productData.oldPrice} {currency}
                    </Text>
                </>
            )}
            <ProductBadge productData={productData} type="product-section" />
        </Group>
    );
}
