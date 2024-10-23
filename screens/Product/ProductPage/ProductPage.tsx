import { Stack, Box, Grid, Group, Button, ActionIcon, Text, Divider } from "@mantine/core";
import { createContext, useContext, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { IAddProuctToCartDto } from "../../../@types/Orders/AddProductToCartDto";
import { IProductRES } from "../../../@types/Products/ProductRES";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { useProductDataContext } from "../../../contexts/PorudctDataContext";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import ProductCarousel from "./ProductCarousel/ProductCarousel";
import ProductPricingInfo from "./ProductPricingInfo/ProductPricingInfo";
import ProductProperties from "./ProductProperties/ProductProperties";
import ProductTitles from "./ProductTitles/ProductTitles";
import { useSendProductPageViewMutation } from "../../../redux/services/productsApiService/productsApiService";
import IconCart from "../../../components/ui/icons/IconCart";
import IconPlusCircle from "../../../components/ui/icons/IconPlusCircle";
import IconMinesCircle from "../../../components/ui/icons/IconMinesCircle";
import ProductOrderFrom from "./ProductOrderFrom/ProductOrderFrom";
import { useCalculateSingleCartProductMutation } from "../../../redux/services/orderApiService/orderApiService";
import ProductReviews from "./ProductReviews/ProductReviews";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import StoreOffersSection from "../../Home/StoreOffersSection/StoreOffersSection";
import StoreReviewsSection from "../../Home/StoreReviewsSection/StoreReviewsSection";
import ErrorMessage from "../../../components/common/ErrorMessage/ErrorMessage";
import { useOrderFormContext } from "../../../contexts/OrderFormContext";
import { useCartDrawerContext } from "../../../contexts/CartDrawerContext";
import StorePolicySection from "../../../components/common/StorePolicySection/StorePolicySection";
import { useDocumentTitle } from "@mantine/hooks";
import TagManager from "react-gtm-module";
import StickyFooterBtn from "../../../components/StickyFooterBtn/StickyFooterBtn";
import ClickToCallBtn from "../../../components/common/ClickToCallBtn/ClickToCallBtn";

interface IAddProductToFormContext {
    form: UseFormReturn<IAddProuctToCartDto & { productObj: IProductRES }, unknown, undefined>;
}
const AddProductToFormContext = createContext<IAddProductToFormContext>({} as IAddProductToFormContext);

export default function ProductPage() {
    const { productData } = useProductDataContext();
    const [SendPageView] = useSendProductPageViewMutation();
    const [calculateSingleProduct, { isLoading: isCalculatingCart }] = useCalculateSingleCartProductMutation();
    const [error, set_error] = useState<string | undefined>(undefined);

    //change document title
    useDocumentTitle(productData.name);

    const {
        _id: storeId,
        appearance: { themeColor, themeButtonsTextColor, allowShoppingCart, allowOffersAddToCart, showSuggestedProducts },
        storeExtensions,
        currencyCode,
    } = useStoreSettingsSlice();

    const { isSmallScreen, isDesktop, isXsMobile } = useDevicesContext();

    const form = useForm<IAddProuctToCartDto>();
    const { getValues, setValue, watch, reset } = form;

    const {
        form: { getValues: getValueForm, setValue: setValueForm },
        ordredProductsFormFieldArray: { append: appendProdouctToCart, update: updateProductInCart },
    } = useOrderFormContext();

    const { openCartDrawer } = useCartDrawerContext();

    //Set Defual Values
    useEffect(() => {
        reset({
            productId: productData._id,
            productObj: productData,
            offerId:productData.offers?.find((offer) => offer.bestOffer)?._id || '',
            quentity: productData.hasMultiSelect || productData.hasOffers ? 0 : 1,
            propertiesSelected: productData.otherProperties?.map((parentProperty) => ({
                parentPropertyId: parentProperty._id,
                childPropertiesSelected: [],
            })),
        });
        set_error(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productData]);

    useEffect(() => {
        setValueForm(
            "shippingType",
            getValueForm().orderedProducts.length > 0 ? getValueForm().shippingType : productData.freeShipping ? "مجاني" : getValueForm().shippingType
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValueForm().locationId, productData]);

    async function onAddToCartClick() {
        try {
            const calcs = await calculateSingleProduct({ orderedProducts: [getValues()], storeId }).unwrap();
            //check if product is already exist in the cart exist just update it else append the product
            const cartProductIndex = getValueForm().orderedProducts.findIndex((ordredProduct) => ordredProduct.productId === getValues().productId);

            if (cartProductIndex === -1) {
                appendProdouctToCart({ ...getValues(), totalCartProductsPrice: calcs.data.totalCartProductsPrice });

                //Send AddToCart Event GTM
                TagManager.dataLayer({ dataLayer: { event: "OkwinAddToCart", ...getValueForm() } });

                //FB-PIXEL ADDTOCART EVENT
                //@ts-expect-error fb-pixel
                window.fbq("track", "AddToCart", {
                    value: calcs.data.totalCartProductsPrice,
                    currency: currencyCode,
                    content_ids: getValueForm().orderedProducts.map((ordredProduct) => ordredProduct.productId),
                });

                //TIKTOK-PIXEL ADDTOCART EVENT
                //@ts-expect-error tiktok-pixel
                window.ttq.track("AddToCart", {
                    value: calcs.data.totalCartProductsPrice,
                    currency: currencyCode,
                    content_type: "product_group",
                    contents: getValueForm().orderedProducts.map((ordredProduct) => ({
                        content_id: ordredProduct.productId,
                        content_name: ordredProduct.productObj.name,
                        quantity: ordredProduct.quentity || 1,
                        price: calcs.data.totalCartProductsPrice,
                    })),
                });
            } else {
                updateProductInCart(cartProductIndex, { ...getValues(), totalCartProductsPrice: calcs.data.totalCartProductsPrice });
            }

            set_error(undefined);
            openCartDrawer();
        } catch (error) {
            const _error = error as Error & { data: { message: string } };
            set_error(_error.data.message);
        }
    }

    useEffect(() => {
        //Send product page view
        SendPageView(productData._id);

        //Send StoreProductPageView GTM
        TagManager.dataLayer({ dataLayer: { event: "OkwinProductPageView", ...productData } });

        //Facebook Product page view event
        //@ts-expect-error fb-pixel
        window.fbq("track", "ViewContent", {
            content_name: productData.name,
            content_category: productData.category?.name || "no-categoryname",
            content_ids: [productData._id],
            content_type: "product",
            value: productData.price,
            currency: currencyCode,
        });

        //TikTok Product ViewContent Event
        //@ts-expect-error null
        window.ttq.track("ViewContent", {
            content_type: "product",
            description: productData.description,
            content_id: productData._id,
            currency: currencyCode,
            value: productData.price,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productData._id]);

    const AddToCartButton = () => (
        <>
            <Group justify="center">
                {!productData.hasMultiSelect && !productData.hasOffers && (
                    <Group bg={"#F6F7F9"} gap={isXsMobile ? 5 : 10} p={10}>
                        <ActionIcon
                            w={25}
                            h={25}
                            onClick={() => setValue(`quentity`, watch(`quentity`) == 1 ? 1 : (watch(`quentity`) as number) - 1)}
                            variant="transparent"
                        >
                            <IconMinesCircle w={25} h={25} />
                        </ActionIcon>

                        <Text fz={18} fw={600}>
                            {" "}
                            {watch(`quentity`)}
                        </Text>

                        <ActionIcon
                            onClick={() =>
                                setValue(
                                    `quentity`,
                                    productData.isLimitedQtty
                                        ? watch("quentity") + 1 > (productData.remainingQtty || 1)
                                            ? watch("quentity")
                                            : watch("quentity") + 1
                                        : watch("quentity") + 1
                                )
                            }
                            variant="transparent"
                        >
                            <IconPlusCircle w={25} h={25} color={themeColor} />
                        </ActionIcon>
                    </Group>
                )}

                <Button
                    onClick={onAddToCartClick}
                    w={"70%"}
                    size={isXsMobile ? "md" : "lg"}
                    loading={isCalculatingCart}
                    radius={"xl"}
                    leftSection={<IconCart w={28} h={28} color={themeButtonsTextColor} />}
                >
                    إضافة إلى السلة
                </Button>
            </Group>
            {error && <ErrorMessage error={error} />}
        </>
    );

    return (
        <AddProductToFormContext.Provider value={{ form }}>
            <Grid
                onLoad={() => window.history.replaceState({}, "")}
                className="product-page-grid"
                m={"auto"}
                mt={isSmallScreen ? 0 : 30}
                maw={isDesktop && productData.landingPage ? 600 : 1000}
                columns={isSmallScreen || productData.landingPage ? 1 : 12}
            >
                {!productData.landingPage && (
                    <Grid.Col span={isSmallScreen ? 1 : 5}>
                        {!isSmallScreen && (
                            <Stack pos={"sticky"} top={90} align={"flex-end"}>
                                <ProductCarousel />
                            </Stack>
                        )}
                    </Grid.Col>
                )}
                <Grid.Col span={isSmallScreen || productData.landingPage ? 1 : 7} p={isSmallScreen ? 20 : 5}>
                    <Stack>
                        {productData.landingPage ? (
                            <>
                                <div>
                                    <Box
                                        className="product-description"
                                        style={{ borderRadius: 12 }}
                                        dangerouslySetInnerHTML={{ __html: productData.productDesc || ("" as string) }}
                                    ></Box>
                                </div>

                                <ProductProperties />
                                {allowShoppingCart && !productData.disableAddToShoppingCart && (
                                    <>{productData.hasOffers ? allowOffersAddToCart ? <AddToCartButton /> : <></> : <AddToCartButton />}</>
                                )}
                                <ProductOrderFrom />
                            </>
                        ) : isSmallScreen && !productData.landingPage ? (
                            <>
                                <ProductTitles />
                                <ProductPricingInfo />
                                <Stack align={"center"}>
                                    <ProductCarousel />
                                </Stack>
                                <ProductProperties />
                                {allowShoppingCart && !productData.disableAddToShoppingCart && (
                                    <>{productData.hasOffers ? allowOffersAddToCart ? <AddToCartButton /> : <></> : <AddToCartButton />}</>
                                )}
                                <ProductOrderFrom />
                                <Box
                                    className="product-description"
                                    p={10}
                                    style={{ borderRadius: 12 }}
                                    dangerouslySetInnerHTML={{ __html: productData.productDesc || ("" as string) }}
                                ></Box>
                            </>
                        ) : (
                            <>
                                <ProductTitles />
                                <ProductPricingInfo />
                                <ProductProperties />
                                {allowShoppingCart && !productData.disableAddToShoppingCart && (
                                    <>{productData.hasOffers ? allowOffersAddToCart ? <AddToCartButton /> : <></> : <AddToCartButton />}</>
                                )}
                                <ProductOrderFrom />
                                <Box
                                    className="product-description"
                                    p={10}
                                    style={{ borderRadius: 12 }}
                                    dangerouslySetInnerHTML={{ __html: productData.productDesc || ("" as string) }}
                                ></Box>
                            </>
                        )}
                        {productData.hasReviews && <ProductReviews />}
                        <Divider w={"100%"} />
                        <StorePolicySection />
                    </Stack>
                </Grid.Col>
            </Grid>
            {showSuggestedProducts && !productData.disableSuggestedProducts && (
                <>
                    <RelatedProducts />
                    <StoreOffersSection />
                    <StoreReviewsSection />
                </>
            )}

            {storeExtensions?.allowStickyFooterBtn && <StickyFooterBtn />}
            {storeExtensions?.allowClickToCallBtn && <ClickToCallBtn/>}
        </AddProductToFormContext.Provider>
    );
}

export const useAddProductToCartFormContext = () => useContext(AddProductToFormContext);
