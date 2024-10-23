/* eslint-disable react-hooks/exhaustive-deps */
import { Accordion, Group, Center, Loader, Stack, Divider, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ICalculateCartRES } from "../../../@types/Orders/CalculateOrderRES";
import ErrorMessage from "../../../components/common/ErrorMessage/ErrorMessage";
import IconShoppingBag from "../../../components/ui/icons/IconShoppingBag";
import { useOrderFormContext } from "../../../contexts/OrderFormContext";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useCalculateCartMutation } from "../../../redux/services/orderApiService/orderApiService";
import { useDebouncedCallback } from "@mantine/hooks";

export default function CheckoutSummery() {
    const {
        _id: storeId,
        appearance: { themeColor },
        currency,
        shippingPrefix,
    } = useStoreSettingsSlice();
    const { productSlug } = useParams();

    // const [CalculateSingleCartProduct, { isLoading: isCalculatingSingleCartProduct }] = useCalculateSingleCartProductMutation();
    const [CalculateCart, { isLoading: isCalculatingCart }] = useCalculateCartMutation();

    const {
        form: { watch: watchForm, getValues: getValuesForm },
    } = useOrderFormContext();

    const [totals, setTotals] = useState<ICalculateCartRES["data"] | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    async function calculuateTotals() {
        try {
            const calcs = await CalculateCart({ orderDto: getValuesForm(), storeId }).unwrap();
            setTotals(calcs.data);
            setError(undefined);
        } catch (error) {
            const _error = error as Error & { data: { message: string } };
            setError(_error.data.message);
        }
    }

    const calculuateTotalsDebounce = useDebouncedCallback(() => {
        calculuateTotals();
    }, 300);
    
    useEffect(() => {
        calculuateTotalsDebounce();
    }, [watchForm("locationId"), watchForm("stopDeskId"), watchForm("shippingType"), watchForm("orderedProducts"), watchForm("coupon")]);

    return (
        <Accordion defaultValue={"test"} key={productSlug} radius={12}>
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
