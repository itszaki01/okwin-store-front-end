/* eslint-disable react-hooks/exhaustive-deps */
import { Accordion, Center, Divider, Group, Loader, Stack, Text } from "@mantine/core";
import { useStoreSettingsSlice } from "../../../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import IconShoppingBag from "../../../../../components/ui/icons/IconShoppingBag";
import { useAddProductToCartFormContext } from "../../../../../screens/Product/ProductPage/ProductPage";
import { useEffect, useState } from "react";
import { useCalculateCartMutation } from "../../../../../redux/services/orderApiService/orderApiService";
import { useLocation, useParams } from "react-router-dom";
import { useOrderFormContext } from "../../../../../contexts/OrderFormContext";
import ErrorMessage from "../../../../../components/common/ErrorMessage/ErrorMessage";
import { ICalculateCartRES } from "../../../../../@types/Orders/CalculateOrderRES";
import { useDebouncedCallback } from "@mantine/hooks";

export default function ProductFormSummeryAccording() {
    const {
        _id: storeId,
        appearance: { themeColor },
        currency,
        shippingPrefix,
    } = useStoreSettingsSlice();
    const { productSlug } = useParams();
    const { pathname } = useLocation();
 

    // const [CalculateSingleCartProduct, { isLoading: isCalculatingSingleCartProduct }] = useCalculateSingleCartProductMutation();
    const [CalculateCart, { isLoading: isCalculatingCart }] = useCalculateCartMutation();

    const {
        form: { getValues: singleOrdredProduct, watch: watchSingleProduct },
    } = useAddProductToCartFormContext();

    const {
        form: { watch: watchForm, getValues: getValuesForm },
    } = useOrderFormContext();

    const [totals, setTotals] = useState<ICalculateCartRES["data"] | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    async function calculuateTotals() {
        try {
            const calcs = await CalculateCart({ orderDto: { ...getValuesForm(), orderedProducts: [singleOrdredProduct()] }, storeId }).unwrap();
            setTotals(calcs.data);

            setError(undefined);
        } catch (error) {
            const _error = error as Error & { data: { message: string } };
            setError(_error.data.message);
        }
    }

    //reset error every page change or product change
    useEffect(() => setError(undefined), [pathname, productSlug]);

    const calculateTotalsDebounce = useDebouncedCallback(() => {
        calculuateTotals();
    }, 300);

    useEffect(() => {
        calculateTotalsDebounce();
    }, [
        watchForm("locationId"),
        watchForm("stopDeskId"),
        watchForm("shippingType"),
        watchSingleProduct("colorsSelected"),
        watchSingleProduct("offerId"),
        watchSingleProduct("propertiesSelected"),
        watchSingleProduct("productId"),
        watchForm("coupon"),
    ]);

    return (
        <Accordion key={productSlug} radius={12}>
            <Accordion.Item value="test">
                <Accordion.Control onClick={calculuateTotals}>
                    <Group gap={5}>
                        <IconShoppingBag w={24} h={24} color={themeColor} />{" "}
                        <Text fw={700} fz={20} c={themeColor}>
                            ملخص الطلبية
                        </Text>
                    </Group>
                </Accordion.Control>
                {isCalculatingCart ? (
                    <Center>
                        <Loader color={themeColor} />
                    </Center>
                ) : (
                    <Accordion.Panel>
                        {error ? (
                            <ErrorMessage error={error} />
                        ) : (
                            <>
                                {totals && (
                                    <>
                                        <Stack>
                                            <Group justify="space-between">
                                                <Text fz={18} fw={700} c={themeColor}>
                                                    {" "}
                                                    {`ال${shippingPrefix}`}
                                                </Text>
                                                <Text fz={18} fw={600}>
                                                    {" "}
                                                    {totals.shippingPrice} {currency}
                                                </Text>
                                            </Group>
                                            <Divider w={"100%"} />

                                            <Group justify="space-between">
                                                <Text fz={18} fw={700} c={themeColor}>
                                                    {productSlug ? "تكلفة الطلبية" : "أسعار المنتجات"}
                                                </Text>
                                                <Text fz={18} fw={600}>
                                                    {" "}
                                                    {totals.totalCartProductsPrice} {currency}
                                                </Text>
                                            </Group>

                                            {totals.finaleDiscountPrice > 0 && (
                                                <>
                                                    <Divider w={"100%"} />
                                                    <Group justify="space-between">
                                                        <Text fz={18} fw={700} c={themeColor}>
                                                            قيمة التخفيض
                                                        </Text>
                                                        <Text fz={18} fw={600}>
                                                            {" "}
                                                            - {totals.finaleDiscountPrice} {currency}
                                                        </Text>
                                                    </Group>
                                                </>
                                            )}

                                            <Divider w={"100%"} />
                                            <Group justify="space-between">
                                                <Text fz={18} fw={700} c={themeColor}>
                                                    {" "}
                                                    المجموع
                                                </Text>
                                                <Text fz={18} fw={600}>
                                                    {" "}
                                                    {totals.totalCartPrice} {currency}
                                                </Text>
                                            </Group>
                                        </Stack>
                                    </>
                                )}
                            </>
                        )}
                    </Accordion.Panel>
                )}
            </Accordion.Item>
        </Accordion>
    );
}
