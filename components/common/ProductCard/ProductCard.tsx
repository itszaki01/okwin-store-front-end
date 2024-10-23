import { Box, Button, Card, Group, Image, Stack, Text } from "@mantine/core";
import { IProductRES } from "../../../@types/Products/ProductRES";
import StartImg from "../../../assets/star.svg";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import ProductBadge from "../ProductBadge/ProductBadge";
import { useProductDataContext } from "../../../contexts/PorudctDataContext";
import { useOrderFormContext } from "../../../contexts/OrderFormContext";

interface IProps {
    productData: IProductRES;
}
export default function ProductCard({ productData }: IProps) {
    const { isXsMobile, isMobile, isTablet } = useDevicesContext();
    const { setProductData } = useProductDataContext();
    const { set_error } = useOrderFormContext();

    const {
        currency,
        appearance: { themeColor },
    } = useStoreSettingsSlice();

    const sizes = useMemo(() => {
        return {
            cardWidth: isXsMobile ? 165 : isMobile ? 190 : 230,
            starWidth: isXsMobile ? 25 : 30,
            priceFontSize: isXsMobile ? 18 : isMobile ? 20 : 22,
            oldPriceFontSize: isXsMobile ? 14 : isMobile ? 16 : 18,
            productNameFz: isXsMobile ? 14 : isMobile ? 16 : 18,
            titleMaxLength: isXsMobile ? 30 : isMobile ? 30 : isTablet ? 35 : 41,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isXsMobile, isMobile, isTablet]);

    function handleCardBtnClick() {
        {
            scrollTo(0, 0);
            setProductData(productData);
            set_error(undefined);
            const resetScroll: HTMLButtonElement | null = document.querySelector('[aria-label="slide item 1"]');
            if (resetScroll != null) {
                resetScroll.click();
            }
        }
    }

    return (
        <Card p={0} shadow="md" style={{ borderRadius: 8, border: "1px solid #D1D5DB", alignItems: "stretch" }}>
            <Stack h={"100%"} justify="space-between" gap={5} w={sizes.cardWidth}>
                <Stack>
                    <Stack pos={"relative"} h={180}>
                        <Link to={`/p/${productData.slug}`} state={productData} onClick={handleCardBtnClick}>
                            <Image  loading='lazy' style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} src={productData.imageCover} />
                        </Link>
                        <Group pos={"absolute"} bottom={-10} gap={5}>
                            {Array.from({ length: productData.rating || 0 }, (_, idx) => (
                                <Image  loading='lazy' key={idx} w={sizes.starWidth} src={StartImg} />
                            ))}
                        </Group>
                        <Box pos={"absolute"} top={5} right={5}>
                            <ProductBadge productData={productData} type="card" />
                        </Box>
                    </Stack>
                    <Stack bg={"white"} style={{ zIndex: 5 }} p={5} px={10} gap={5}>
                        <Group gap={5}>
                            {" "}
                            <Text style={{ textWrap: "nowrap" }} fw={700} c={themeColor} fz={sizes.priceFontSize}>
                                {productData.price} {currency}
                            </Text>
                            {productData.oldPrice && (
                                <Text c={"#78808d"} fz={sizes.oldPriceFontSize} fw={700} style={{ textWrap: "nowrap" }} td={"line-through"}>
                                    {productData.oldPrice} {currency}
                                </Text>
                            )}
                        </Group>
                        <Text fz={sizes.productNameFz} fw={700}>
                            {productData.name.length > sizes.titleMaxLength
                                ? `${productData.name.slice(0, sizes.titleMaxLength)} ...`
                                : productData.name}
                        </Text>
                    </Stack>
                </Stack>
                <Stack p={10} align="center">
                    <Button component={Link} to={`/p/${productData.slug}`} state={productData} onClick={handleCardBtnClick} fullWidth radius={"md"}>
                        تسوق الآن
                    </Button>
                </Stack>
            </Stack>
        </Card>
    );
}
