import { ActionIcon, Blockquote, Box, Button, Divider, Fieldset, Group, Image, rgba, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { useStoreSettingsSlice } from "../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useOrderFormContext } from "../../contexts/OrderFormContext";
import { useDevicesContext } from "../../contexts/DevicesContext";
import { Fragment, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import CheckoutSummery from "./CheckoutSummery/CheckoutSummery";
import OrderForm from "../../components/common/OrderForm/OrderForm";
import IconTrash from "../../components/ui/icons/IconTrash";
import ProductsSection from "../Home/ProductsSection/ProductsSection";
import ErrorMessage from "../../components/common/ErrorMessage/ErrorMessage";
import TagManager from "react-gtm-module";
import IconCoupon from "../../components/ui/icons/IconCoupon";

export default function Checkout() {
    const {
        appearance: { themeColor,showCouponInput },
        currency,
    } = useStoreSettingsSlice();

    const { isXsMobile, isMobile, isSmallScreen } = useDevicesContext();
    const {
        form: { watch, handleSubmit, getValues,setValue },
        ordredProductsFormFieldArray: { remove },
        extraValidator,
        onSubmit,
        set_error,
        error,
        isCreatingOrder,
    } = useOrderFormContext();

    const sizes = useMemo(
        () => ({
            productNameTextMAW: isXsMobile ? 120 : isMobile ? 190 : 180,
        }),
        [isXsMobile, isMobile]
    );

    function handleSubmitBtnClick() {
        try {
            extraValidator();
            if (error) set_error(undefined);
        } catch {
            return set_error("الرجاء التحقق من جميع المدخلات");
        }

        handleSubmit(onSubmit)();
    }

    useEffect(() => {
        //Send CheckOut Event GTM
        TagManager.dataLayer({ dataLayer: { event: "OkwinInitiateCheckout", ...getValues() } });

        //FB-FIXEL EVENT Initate CHECKOUT
        //@ts-expect-error fb-pixel
        window.fbq("track", "InitiateCheckout", {
            content_ids: getValues().orderedProducts.map((ordredProduct) => ordredProduct.productId),
            eventref: "fb_oea", // or set to empty string,
            num_items: getValues().orderedProducts.length,
        });

        //TIKTOK-FIXEL EVENT Initate CHECKOUT
        //@ts-expect-error fb-pixel
        window.ttq.track("InitiateCheckout", {
            content_ids: getValues().orderedProducts.map((ordredProduct) => ordredProduct.productId),
            num_items: getValues().orderedProducts.length,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Stack>
            <Box bg={rgba(themeColor, 0.1)}>
                <Blockquote bg={"transparent"} maw={1000} m={"auto"} py={15} ta={"center"} color={themeColor} style={{ borderRight: "none" }}>
                    <Title lh={2} c={themeColor}>
                        عربة التسوق
                    </Title>
                    <Title fz={14} fw={600}>
                        عربة التسوق / الرئيسية
                    </Title>
                </Blockquote>
            </Box>
            <Stack m={"auto"} maw={1000}>
                {!watch("orderedProducts") || watch("orderedProducts")?.length === 0 ? (
                    <Navigate to={"/"} />
                ) : (
                    <>
                        <SimpleGrid w={"100%"} cols={isSmallScreen ? 1 : 2} style={{ alignItems: "flex-start" }}>
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
                                    {watch("orderedProducts").map(
                                        ({ productObj, propertiesSelected, colorsSelected, totalCartProductsPrice, quentity }, idx) => (
                                            <Fragment key={productObj._id}>
                                                <Stack>
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

                                                        <Stack>
                                                            <Text c={themeColor} fw={700} fz={18}>
                                                                {totalCartProductsPrice as number}
                                                                {currency}
                                                            </Text>
                                                            <ActionIcon variant="light" onClick={() => remove(idx)} color="red">
                                                                <IconTrash color="red" />
                                                            </ActionIcon>
                                                        </Stack>
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
                                                                    {childProperty.chidlProeprtyObj?.hasIcon &&
                                                                        childProperty.chidlProeprtyObj.iconUrl && (
                                                                            <Image
                                                                                radius={"md"}
                                                                                w={30}
                                                                                src={childProperty.chidlProeprtyObj?.iconUrl}
                                                                            />
                                                                        )}
                                                                    <Text>
                                                                        {childProperty.chidlProeprtyObj?.name}
                                                                        {childProperty.childPropertyQtty
                                                                            ? ` (${childProperty.childPropertyQtty})`
                                                                            : ""}
                                                                    </Text>
                                                                </Group>
                                                            </Fieldset>
                                                        ))
                                                    )}
                                                </Group>
                                            </Fragment>
                                        )
                                    )}
                                    <Divider w={"100%"} />
                                    <Group justify="space-between">
                                        <Text fw={700} fz={18}>
                                            مجموع السلة
                                        </Text>
                                        <Text fw={700} c={themeColor} fz={18}>
                                            {watch("orderedProducts")?.reduce(
                                                (acc, { totalCartProductsPrice }) => (totalCartProductsPrice as number) + acc,
                                                0
                                            )}{" "}
                                            {currency}
                                        </Text>
                                    </Group>
                                </Stack>
                            </Fieldset>

                            <Stack>
                                <OrderForm>
                                    {showCouponInput && (
                                        <Stack>
                                            <Group gap={5}>
                                                <IconCoupon w={24} h={24} color={themeColor} />{" "}
                                                <Text fw={700} fz={20} c={themeColor}>
                                                    هل تملك رمز تخفيض؟
                                                </Text>
                                            </Group>
                                            <Group>
                                                <TextInput
                                                    onChange={(e) => setValue("coupon", e.target.value.trim())}
                                                    value={watch("coupon")}
                                                    placeholder="أدخل رمز التخفيض"
                                                    size="lg"
                                                    radius={12}
                                                    w={"100%"}
                                                />
                                            </Group>
                                        </Stack>
                                    )}

                                    <CheckoutSummery />
                                    {error && <ErrorMessage error={error} />}
                                    <Button loading={isCreatingOrder} onClick={handleSubmitBtnClick} size="lg" radius={"xl"}>
                                        تأكيد وإرسال الطلب
                                    </Button>
                                </OrderForm>
                            </Stack>
                        </SimpleGrid>
                        <Divider
                            label={
                                <Fieldset radius={12}>
                                    <Title c={themeColor}>تسوق أكثر</Title>
                                </Fieldset>
                            }
                            w={"100%"}
                        />
                        <ProductsSection />
                    </>
                )}
            </Stack>
        </Stack>
    );
}
