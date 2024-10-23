import { Drawer, Stack, Title, Fieldset, Group, ActionIcon, Box, Divider, Button, Text, Image } from "@mantine/core";
import { ReactNode, createContext, useContext, useMemo } from "react";
import IconCartEmpty from "../components/ui/icons/IconCartEmpty";
import IconTrash from "../components/ui/icons/IconTrash";
import { useStoreSettingsSlice } from "../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useDevicesContext } from "./DevicesContext";
import { useOrderFormContext } from "./OrderFormContext";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
interface ICartDrawerContext {
    openCartDrawer: () => void;
    closeCartDrawer: () => void;
}

const CartDrawerContext = createContext<ICartDrawerContext>({} as ICartDrawerContext);

export default function CartDrawerContextProvider({ children }: { children: ReactNode }) {
    const {
        appearance: { themeColor },
        currency,
    } = useStoreSettingsSlice();

    const [opened, { open, close }] = useDisclosure();

    const { isXsMobile, isMobile } = useDevicesContext();

    const {
        form: { watch },
        ordredProductsFormFieldArray: { remove },
    } = useOrderFormContext();

    const isCartEmpty = useMemo(() => {
        if (watch("orderedProducts")?.length === 0) return true;
        else return false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch("orderedProducts")]);

    const sizes = useMemo(
        () => ({
            productNameTextMAW: isXsMobile ? 120 : isMobile ? 120 : 120,
        }),
        [isXsMobile, isMobile]
    );

    return (
        <CartDrawerContext.Provider value={{ closeCartDrawer: close, openCartDrawer: open }}>
            <Drawer
                title={
                    <Text fw={700} fz={18}>
                        منتجات السلة
                    </Text>
                }
                size={"sm"}
                position={"right"}
                opened={opened}
                onClose={close}
            >
                {!watch("orderedProducts") || isCartEmpty ? (
                    <Stack align="center">
                        <IconCartEmpty />
                        <Title ta="center" c={"#808080"}>
                            لايوجد منتجات في السلة
                        </Title>
                    </Stack>
                ) : (
                    <Stack>
                        {watch("orderedProducts")?.map(
                            ({ colorsSelected, productObj, propertiesSelected, totalCartProductsPrice, quentity }, idx) => (
                                <Fieldset key={productObj._id} p={5}>
                                    <Stack>
                                        <Group align="flex-start" justify="space-between">
                                            <Group align="flex-start">
                                                <Image radius={"md"} w={70} src={productObj.imageCover} />
                                                <Stack align="flex-start" justify="flex-start">
                                                    <Text c={"gray.6"}>{productObj.category?.name}</Text>
                                                    <Group gap={2}>
                                                        <Fieldset p={3}>
                                                            <Text>{quentity != 0 && `X${quentity}`}</Text>
                                                        </Fieldset>{" "}
                                                        <Text fw={600} w={sizes.productNameTextMAW} truncate>
                                                            {productObj.name}
                                                        </Text>
                                                    </Group>
                                                </Stack>
                                            </Group>
                                            <Stack>
                                                <Text style={{ textWrap: "nowrap" }} c={themeColor} fw={700} fz={18}>
                                                    {totalCartProductsPrice && totalCartProductsPrice} {currency}
                                                </Text>
                                                <ActionIcon onClick={() => remove(idx)} color="red" variant="light">
                                                    <IconTrash color="red" />
                                                </ActionIcon>
                                            </Stack>
                                        </Group>
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
                                                                <Image radius={"md"} w={20} src={childProperty.chidlProeprtyObj?.iconUrl} />
                                                            )}
                                                            <Text fz={14}>
                                                                {childProperty.chidlProeprtyObj?.name}
                                                                {childProperty.childPropertyQtty ? ` (${childProperty.childPropertyQtty})` : ""}
                                                            </Text>
                                                        </Group>
                                                    </Fieldset>
                                                ))
                                            )}
                                        </Group>
                                    </Stack>
                                </Fieldset>
                            )
                        )}
                        <Divider w={"100%"} />
                        <Group justify="space-between">
                            <Text fw={700} fz={18}>
                                المجموع
                            </Text>
                            <Text fw={700} c={themeColor} fz={18}>
                                {watch("orderedProducts")?.reduce((acc, { totalCartProductsPrice }) => (totalCartProductsPrice as number) + acc, 0)}{" "}
                                {currency}
                            </Text>
                        </Group>
                        <Button
                            component={Link}
                            to={"/checkout"}
                            onClick={() => {
                                close();
                                scrollTo(0, 0);
                            }}
                            radius={"xl"}
                            size="md"
                        >
                            إتمام عملية الشراء
                        </Button>
                    </Stack>
                )}
            </Drawer>

            {children}
        </CartDrawerContext.Provider>
    );
}

export const useCartDrawerContext = () => useContext(CartDrawerContext);
