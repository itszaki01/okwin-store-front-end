import { Card, rgba, Grid, Stack, Title, Button, Image, Text, Badge } from "@mantine/core";
import { useMemo } from "react";
import { IProductRES } from "../../../../@types/Products/ProductRES";
import { Link } from "react-router-dom";
import { useProductDataContext } from "../../../../contexts/PorudctDataContext";
import { useDevicesContext } from "../../../../contexts/DevicesContext";

interface IProps {
    product: IProductRES;
}
export default function StoreOfferCard({ product }: IProps) {
    const bestOffer = useMemo(
        () => product.offers?.find((offer) => offer.bestOffer),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    ) as NonNullable<IProductRES["offers"]>[number];

    const { setProductData } = useProductDataContext();

    const discountPercentage = ((product.price - bestOffer?.offerProductPrice) / product.price) * 100;
    const productTitle = `${product.name.slice(0, 30)}${product.name.length > 30 ? "..." : ""}`;
    const {isXsMobile} = useDevicesContext()

    return (
        <Card ta={"center"} p={0} pos={"relative"} w={isXsMobile ? 330 :360} h={200} bg={rgba(bestOffer?.customColor || '#fff', 0.1)} radius={"lg"}>
            <Grid columns={12} style={{ zIndex: 1 }}>
                <Grid.Col span={4}>
                    <Image  loading='lazy' w={200} src={bestOffer.allowCustomImg ? bestOffer.customImgLink : product.imageCover} />
                </Grid.Col>
                <Grid.Col span={8}>
                    {" "}
                    <Stack gap={8} h={"100%"} justify="center" align="center">
                        <Title style={{ textShadow: `1px 2px white` }} fw={900} order={3}>
                            {productTitle}
                        </Title>
                        <Text fz={17} fw={600}>
                            <Badge size="lg" color={bestOffer.customColor}>
                                -%{discountPercentage.toFixed(0)}
                            </Badge>{" "}
                            {bestOffer?.offerName}
                        </Text>
                        <Button
                            autoContrast
                            component={Link}
                            onClick={() => {
                                scrollTo(0, 0);
                                setProductData(product);
                            }}
                            c={"auto"}
                            state={product}
                            to={`/p/${product.slug}`}
                            color={bestOffer.customColor}
                            radius={"md"}
                            w={"50%"}
                        >
                            تسوق الآن
                        </Button>
                    </Stack>
                </Grid.Col>
            </Grid>
            <Card
                right={-200}
                top={-80}
                pos={"absolute"}
                h={360}
                w={360}
                bg={rgba(bestOffer?.customColor || '', 0.3)}
                style={{ borderRadius: 500 }}
            ></Card>
        </Card>
    );
}
