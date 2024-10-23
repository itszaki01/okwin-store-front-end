import { Box, Center, Divider, Fieldset, Group, Image, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { useStoreSettingsSlice } from "../../redux/features/storeSettingsSlice/storeSettingsSlice";
import StoreFeaturesSection from "../Home/StoreFeaturesSection/StoreFeaturesSection";
import StoreOffersSection from "../Home/StoreOffersSection/StoreOffersSection";
import ProductsSection from "../Home/ProductsSection/ProductsSection";
import StoreReviewsSection from "../Home/StoreReviewsSection/StoreReviewsSection";
import { Navigate } from "react-router-dom";
import { Fragment, useEffect, useMemo } from "react";
import { useDevicesContext } from "../../contexts/DevicesContext";
import { useCheckOutDetialsSlice } from "../../redux/features/checkoutDetialsSlice/checkoutDetialsSlice";
import { useOrderFormContext } from "../../contexts/OrderFormContext";
import { uuidv4 } from "../../utils/uuidv4";
import TagManager from "react-gtm-module";

export default function Thankyou() {
    const {
        appearance: { themeColor, thankYouPageBody, allowThankYouPageSuggestedProducts, customThankYouPageJS },
        stopDeskPrefix,
        shippingPrefix,
        currency,
    } = useStoreSettingsSlice();

    const { isSmallScreen, isMobile, isXsMobile } = useDevicesContext();

    const { cartOrderDto, data: checkoutOrderRES } = useCheckOutDetialsSlice();

    const {
        form: { reset },
    } = useOrderFormContext();


    //Events Effect
    useEffect(()=>{
          //Send ThankyouPageview Event GTM
          TagManager.dataLayer({ dataLayer: { event: "OkwinThankyouPageView"} });

    },[])

    useEffect(() => {
        reset({ cartUID: uuidv4(), orderedProducts: [] });
        eval(customThankYouPageJS);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sizes = useMemo(
        () => ({
            productNameTextMAW: isXsMobile ? 120 : isMobile ? 150 : 300,
        }),
        [isXsMobile, isMobile]
    );
    return (
        <>
            {!checkoutOrderRES ? (
                <Navigate to={"/"} />
            ) : (
                <Stack gap={50} m={"auto"} maw={1000}>
                    <Box
                        w={isSmallScreen ? "100vw" : "100%"}
                        className="product-description"
                        dangerouslySetInnerHTML={{ __html: thankYouPageBody }}
                    ></Box>

                    <Stack>
                        <ScrollArea type="always" scrollbars="x" bg={"#F6F7F9"} w={isSmallScreen ? "97vw" : "100%"} p={15}>
                            <Group justify="center">
                                <Stack align="center" gap={5}>
                                    <Text style={{ textWrap: "nowrap" }} fw={700} c={"gray.7"}>
                                        رقم الطلب
                                    </Text>
                                    <Text style={{ textWrap: "nowrap" }} fw={600} fz={16}>
                                        #{checkoutOrderRES.orderNumber}
                                    </Text>
                                </Stack>
                                <Divider h={50} color="gray" orientation="vertical" />
                                <Stack align="center" gap={5}>
                                    <Text style={{ textWrap: "nowrap" }} fw={700} c={"gray.7"}>
                                        نوع الشحن
                                    </Text>
                                    <Text style={{ textWrap: "nowrap" }} fw={600} fz={16}>
                                        {checkoutOrderRES.shippingType === "لنقطة الإستلام" ? stopDeskPrefix : checkoutOrderRES.shippingType}
                                    </Text>
                                </Stack>
                                <Divider h={50} color="gray" orientation="vertical" />
                                {cartOrderDto.shippingDetails.map((field, idx) => (
                                    <Fragment key={field.fieldId}>
                                        <Stack align="center" gap={10}>
                                            <Text style={{ textWrap: "nowrap" }} fw={700} c={"gray.7"}>
                                                {field.fieldName}
                                            </Text>
                                            <Text style={{ textWrap: "nowrap" }} fw={600} fz={16}>
                                                {(() => {
                                                    switch (field.fieldType) {
                                                        case "client-name": {
                                                            return `${checkoutOrderRES.clientName}`;
                                                        }
                                                        case "phone-number": {
                                                            return `${checkoutOrderRES.clientPhoneNumber}`;
                                                        }
                                                        case "locations": {
                                                            return `${checkoutOrderRES.locationId?.locationName || "لم يتم الإختيار"}`;
                                                        }
                                                        case "subLocations": {
                                                            return `${checkoutOrderRES.clientCity || "لم يتم الإختيار"}`;
                                                        }
                                                        default: {
                                                            return field.fieldValue;
                                                        }
                                                    }
                                                })()}
                                            </Text>
                                        </Stack>
                                        {idx != cartOrderDto.shippingDetails.length - 1 && <Divider h={50} color="gray" orientation="vertical" />}
                                    </Fragment>
                                ))}
                            </Group>
                        </ScrollArea>
                        <Fieldset mx={5} radius={12} bg={"#F6F7F9"}>
                            <Stack>
                                <Title ta={"right"} order={3} c={themeColor}>
                                    المنتجات المطلوبة
                                </Title>
                                <Divider w={"100%"} />
                                <Group justify="space-between">
                                    <Text fw={700}>المنتج</Text>
                                    <Text fw={700}>سعر المنتج</Text>
                                </Group>
                                {cartOrderDto.orderedProducts.map(({ productObj, propertiesSelected, colorsSelected,quentity }) => (
                                    <Fragment key={productObj._id}>
                                        <Stack >
                                            <Divider w={"100%"} />
                                            <Group justify="space-between">
                                                <Group align="flex-start">
                                                    <Image src={productObj.imageCover} radius={"md"} w={70} />
                                                    <Stack justify="space-between" gap={0} h={"100%"}>
                                                        <Text c={"gray.6"} fw={600} fz={16}>
                                                            {productObj.category?.name}
                                                        </Text>
                                                        <Group gap={5}>
                                                            {quentity && (
                                                                <Fieldset w={"fit-content"} p={3}>
                                                                    <Text fw={700} fz={13}>
                                                                        {`X${quentity}`}
                                                                    </Text>
                                                                </Fieldset>
                                                            )}
                                                            <Text fw={700} fz={18} maw={sizes.productNameTextMAW} truncate>
                                                                {productObj.name}
                                                            </Text>
                                                        </Group>
                                                    </Stack>
                                                </Group>

                                                <Text c={themeColor} fw={700} fz={18}>
                                                    {
                                                        checkoutOrderRES.orderedProducts[
                                                            checkoutOrderRES.orderedProducts.findIndex(
                                                                (ordredProducRES) => ordredProducRES.productId._id === productObj._id
                                                            )
                                                        ].totalProductPrice
                                                    }{" "}
                                                    {currency}
                                                </Text>
                                            </Group>
                                        </Stack>

                                        <Group wrap="wrap" gap={5}>
                                            {colorsSelected?.map((colorSelected) => (
                                                <Fieldset key={colorSelected.colorId} p={3}>
                                                    <Group gap={5}>
                                                        <Box
                                                            bg={colorSelected.colorObj?.hex}
                                                            style={{ border: "1px solid gray", borderRadius: 50 }}
                                                            w={20}
                                                            h={20}
                                                        ></Box>
                                                        <Text>
                                                            {colorSelected.colorObj?.name}{" "}
                                                            {colorSelected.colorQtty ? `(${colorSelected.colorQtty})` : ""}{" "}
                                                        </Text>
                                                    </Group>
                                                </Fieldset>
                                            ))}

                                            {propertiesSelected?.map((propertySelected) =>
                                                propertySelected.childPropertiesSelected.map((childProperty) => (
                                                    <Fieldset key={childProperty.childPropertyId} px={10} py={3}>
                                                        <Group gap={5}>
                                                            {childProperty.chidlProeprtyObj?.hasIcon && childProperty.chidlProeprtyObj.iconUrl && (
                                                                <Image radius={"md"} w={30} src={childProperty.chidlProeprtyObj?.iconUrl} />
                                                            )}
                                                            <Text>
                                                                {childProperty.chidlProeprtyObj?.name}
                                                                {childProperty.childPropertyQtty ? ` (${childProperty.childPropertyQtty})` : ""}
                                                            </Text>
                                                        </Group>
                                                    </Fieldset>
                                                ))
                                            )}
                                        </Group>
                                    </Fragment>
                                ))}
                                <Divider w={"100%"} />
                                <Group justify="space-between">
                                    <Text fw={700}>إجمالي سعر المنتجات</Text>
                                    <Text fw={700}>
                                        {checkoutOrderRES.totalProductsPrice} {currency}
                                    </Text>
                                </Group>
                                <Group justify="space-between">
                                    <Text fw={700}>سعر ال{shippingPrefix}</Text>
                                    <Text fw={700}>
                                        {checkoutOrderRES.shippingPrice} {currency}
                                    </Text>
                                </Group>
                                <Divider w={"100%"} />
                                <Group justify="space-between">
                                    <Text fw={700}>المجموع</Text>
                                    <Text c={themeColor} fw={700}>
                                        {checkoutOrderRES.totalCartPrice} {currency}
                                    </Text>
                                </Group>
                            </Stack>
                        </Fieldset>
                    </Stack>
                    <StoreFeaturesSection />
                    {allowThankYouPageSuggestedProducts && (
                        <>
                            <Center>
                                <StoreOffersSection />
                            </Center>
                            <ProductsSection />
                            <StoreReviewsSection />
                        </>
                    )}
                </Stack>
            )}
        </>
    );
}
