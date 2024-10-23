import { Badge, Button, Center, CheckIcon, Fieldset, Group, Radio, rgba, Stack, Text, TextInput } from "@mantine/core";
import OrderForm from "../../../../components/common/OrderForm/OrderForm";
import { useAddProductToCartFormContext } from "../ProductPage";
import { useOrderFormContext } from "../../../../contexts/OrderFormContext";
import { useProductDataContext } from "../../../../contexts/PorudctDataContext";
import { useStoreSettingsSlice } from "../../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import IconGift from "../../../../components/ui/icons/IconGift";
import ErrorMessage from "../../../../components/common/ErrorMessage/ErrorMessage";
import ProductFormSummeryAccording from "./ProductFormSummeryAccording/ProductFormSummeryAccording";
import {  useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCalculateSingleCartProductMutation, useCreateUncompletedOrderMutation } from "../../../../redux/services/orderApiService/orderApiService";
import { useDidUpdate } from "@mantine/hooks";
import { IProductRES } from "../../../../@types/Products/ProductRES";
import IconCoupon from "../../../../components/ui/icons/IconCoupon";
import IconWhatsApp from "../../../../components/ui/icons/IconWhatsApp";

export default function ProductOrderFrom() {
    const { productData } = useProductDataContext();
    const {
        _id: storeId,
        appearance: { themeColor, themeButtonsTextColor, showOrderSummeryInProductPage, showCouponInput },
        storeExtensions,
    } = useStoreSettingsSlice();

    const [CalculateCart, { isLoading: isCalculatingCart2 }] = useCalculateSingleCartProductMutation();
    const [CreateUncompletedOrder] = useCreateUncompletedOrderMutation();

    const navigate = useNavigate();
    const {
        form: { setValue, watch, getValues },
    } = useAddProductToCartFormContext();

    const {
        isCreatingOrder,
        error,
        form: { watch: watchForm, setValue: setValueForm, handleSubmit, trigger, getValues: getValuesForm },
        extraValidator,
        ordredProductsFormFieldArray: { update, fields, append },
        set_error,
        onSubmit,
    } = useOrderFormContext();

    const isCartEmpty = useMemo(() => {
        if (watchForm("orderedProducts")?.length === 0) return true;
        else return false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchForm("orderedProducts")]);

    useDidUpdate(() => {
        (async () => {
            const isPhoneValid = await trigger("clientPhoneNumber");
            const phoneNumber = getValuesForm().clientPhoneNumber;
            if (isPhoneValid && phoneNumber) {
                CreateUncompletedOrder({
                    clientPhoneNumber: phoneNumber,
                    locationId: getValuesForm().locationId,
                    clientName: getValuesForm().clientName,
                    cartUID: getValuesForm().cartUID,
                    productId: productData._id,
                });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchForm("clientPhoneNumber")]);

    async function handleBtnClick() {
        if (!isCartEmpty) {
            scrollTo(0, 0);
            setValueForm("locationId", undefined);
            setValueForm("clientCity", undefined);
            return navigate("/checkout");
        }

        try {
            await extraValidator();
            if (error) set_error(undefined);
        } catch {
            return set_error("الرجاء التحقق من جميع المدخلات");
        }

        try {
            await CalculateCart({ orderedProducts: [{ ...getValues() }], storeId }).unwrap();
            if (error) set_error(undefined);
        } catch (error) {
            const _error = error as { data: { message: string } };
            return set_error(_error.data.message);
        }

        const findedIndex = fields.findIndex((ordredProduct) => ordredProduct.productId === productData._id);
        if (findedIndex === -1) {
            append(getValues());
        } else {
            update(findedIndex, getValues());
        }

        handleSubmit(onSubmit)();
    }

    useDidUpdate(() => {
        //find offer and make changes
        if (productData.offers && productData.offers.length > 0) {
            const selectedOffer = productData.offers.find((offer) => offer._id === watch("offerId")) as NonNullable<IProductRES["offers"]>[number];
            if (selectedOffer?.freeShipping) {
                setValueForm("shippingType", "مجاني");
            } else {
                setValueForm("shippingType", "للمنزل");
            }
        }
    }, [watch("offerId"), watchForm("locationId")]);


    return (
        <OrderForm>
            {productData.offers && productData.offers.length > 0 && (
                <Stack>
                    <Group gap={5}>
                        <IconGift w={28} h={28} color={themeColor} />{" "}
                        <Text fw={700} fz={20} c={themeColor}>
                            إختر العرض
                        </Text>
                    </Group>
                    <Radio.Group
                        // defaultValue={productData.offers.find((offer) => offer.bestOffer)?._id}
                        value={watch("offerId")}
                        onChange={(value) => setValue("offerId", value)}
                    >
                        <Stack>
                            {productData.offers.map((offer, idx) => (
                                <Fieldset
                                    legend={
                                        <Badge color={themeColor} c={themeButtonsTextColor} size="xl">
                                            {offer.bestOffer ? `أفضل عرض 🔥🔥` : `العرض رقم ${idx + 1} 🎁`}
                                        </Badge>
                                    }
                                    bg={rgba(themeColor, 0.08)}
                                    style={{ border: `2px solid ${themeColor}` }}
                                    key={offer._id}
                                >
                                    <Group>
                                        <Radio icon={CheckIcon} value={offer._id} color={themeColor} size="md" />{" "}
                                        <Text fw={600} fz={18}>
                                            {offer.offerName}
                                        </Text>
                                    </Group>
                                </Fieldset>
                            ))}
                        </Stack>
                    </Radio.Group>
                </Stack>
            )}

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
                            onChange={(e) => setValueForm("coupon", e.target.value.trim())}
                            value={watchForm("coupon")}
                            placeholder="أدخل رمز التخفيض"
                            size="lg"
                            radius={12}
                            w={"100%"}
                        />
                    </Group>
                </Stack>
            )}

            {showOrderSummeryInProductPage && <ProductFormSummeryAccording />}

            {error && <ErrorMessage error={error} />}

            <Button id="formButton" loading={isCreatingOrder || isCalculatingCart2} onClick={handleBtnClick} radius={"xl"} size="lg">
                {isCartEmpty ? "تأكيد وإرسال الطلب" : "إكمال عملية الشراء"}
            </Button>
            {storeExtensions?.allowWhatsAppBtn && (
                <Center>
                    <Button
                        rightSection={<IconWhatsApp />}
                        w={"fit-content"}
                        size="lg"
                        radius={"xl"}
                        color="green"
                        component={Link}
                        target="_blank"
                        to={`https://wa.me/${storeExtensions.whatsAppBtnProps?.phoneNumber}`}
                    >
                        {storeExtensions.whatsAppBtnProps?.buttonText ? storeExtensions.whatsAppBtnProps?.buttonText : "الطلب عبر واتساب"}
                    </Button>
                </Center>
            )}
        </OrderForm>
    );
}
