import { Badge, MantineSize } from "@mantine/core";
import  { useMemo } from "react";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { IProductRES } from "../../../@types/Products/ProductRES";
import { useDevicesContext } from "../../../contexts/DevicesContext";

interface IProps {
    productData: IProductRES;
    type:'card' | 'product-section'
}
export default function ProductBadge({ productData,type }: IProps) {
    const {  isXsMobile, isTablet } = useDevicesContext();
    const {
        appearance: { themeButtonsTextColor, themeColor },
        shippingPrefix,
    } = useStoreSettingsSlice();
    const discountPrenetage = productData.oldPrice ? ((productData.oldPrice - productData.price) / productData.oldPrice) * 100 : 0;

    const sizes = useMemo(() => {
        return {
            badgeSizeCard: isXsMobile ? "md" : isTablet ? "lg" : ("lg" as MantineSize),
            badgeSizeProductSection: isXsMobile ? "lg" : isTablet ? "lg" : 'xl'
        };
    }, [isXsMobile,isTablet]);

    return (
        <>
            {/* BADGE */}
            {productData.hasOffers ? (
                <Badge c={themeButtonsTextColor} color={themeColor} rightSection={"🎁"}  size={type === 'card' ? sizes.badgeSizeCard : sizes.badgeSizeProductSection }>
                    عرض خاص
                </Badge>
            ) : productData.freeShipping ? (
                <Badge color={"green"}  size={type === 'card' ? sizes.badgeSizeCard : sizes.badgeSizeProductSection }>
                    {`${shippingPrefix} مجاني`}
                </Badge>
            ) : Number(discountPrenetage.toFixed(0)) === 0 ? (
                <></>
            ) : (
                <Badge c={themeButtonsTextColor} color={themeColor}  size={type === 'card' ? sizes.badgeSizeCard : sizes.badgeSizeProductSection }>
                    {`تخفيض ${discountPrenetage.toFixed(0)}%-`}
                </Badge>
            )}
        </>
    );
}
