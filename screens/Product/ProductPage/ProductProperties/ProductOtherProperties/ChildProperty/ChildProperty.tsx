import { Stack, Radio, Group, Fieldset, BackgroundImage, Center, CheckIcon, Text, rgba, Box, Checkbox, ActionIcon } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { IProductRES } from "../../../../../../@types/Products/ProductRES";
import { useStoreSettingsSlice } from "../../../../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useAddProductToCartFormContext } from "../../../ProductPage";
import IconMinesCircle from "../../../../../../components/ui/icons/IconMinesCircle";
import IconPlusCircle from "../../../../../../components/ui/icons/IconPlusCircle";

type TChildProperty = NonNullable<IProductRES["otherProperties"]>[number]["properties"][number];
interface IProps {
    parentPropertyData: NonNullable<IProductRES["otherProperties"]>[number];
    idx1: number;
}
export default function ChildProperty({ parentPropertyData, idx1 }: IProps) {
    const {
        currency,
        appearance: { themeColor, themeButtonsColors, themeButtonsTextColor },
    } = useStoreSettingsSlice();

    const {
        form: { control, setValue, watch },
    } = useAddProductToCartFormContext();

    const [seletedChildProperty, setSeletedChildProperty] = useState<TChildProperty | undefined>();

    const { update } = useFieldArray({ control, name: "propertiesSelected" });

    const { fields: childProperyFields, replace: replaceChildProperty } = useFieldArray({
        control,
        name: `propertiesSelected.${idx1}.childPropertiesSelected`,
    });

    function handlePropertyClickChange(e: ChangeEvent<HTMLInputElement>, childProperty: TChildProperty) {
        if (e.target.checked) {
            setSeletedChildProperty(childProperty);
            if (childProperty.imageVar) {
                document.querySelector(`.thumbs #carousal-img-${childProperty.imageVar.replaceAll(" ", "-")}`)?.parentElement?.click();
            }
        } else {
            setSeletedChildProperty(undefined);
        }
    }

    function handlePropertyRadioChange(value: string) {
        update(idx1, {
            parentPropertyId: parentPropertyData._id,
            childPropertiesSelected: [
                {
                    childPropertyId: value,
                    childPropertyQtty: 0,
                    chidlProeprtyObj: parentPropertyData.properties.find((childProperty) => childProperty._id === value),
                },
            ],
        });
    }

    function handlePropertyCheckboxChange(values: string[]) {
        update(idx1, {
            parentPropertyId: parentPropertyData._id,
            childPropertiesSelected: values.map((value, idx) => ({
                childPropertyId: value,
                childPropertyQtty: watch(`propertiesSelected.${idx1}.childPropertiesSelected.${idx}.childPropertyQtty`) || 1,
                chidlProeprtyObj: parentPropertyData.properties.find((childProperty) => childProperty._id === value),
            })),
        });

        replaceChildProperty(
            values.map((value, idx) => ({
                childPropertyId: value,
                childPropertyQtty: watch(`propertiesSelected.${idx1}.childPropertiesSelected.${idx}.childPropertyQtty`) || 1,
                chidlProeprtyObj: parentPropertyData.properties.find((childProperty) => childProperty._id === value),
            }))
        );
    }

    function handlePropertyIncraseQtty(idx: number, chidlProeprtyObj: TChildProperty) {
        const watchQtty = watch(`propertiesSelected.${idx1}.childPropertiesSelected.${idx}.childPropertyQtty`) || 1;
        console.log(chidlProeprtyObj);
        setValue(
            `propertiesSelected.${idx1}.childPropertiesSelected.${idx}.childPropertyQtty`,
            chidlProeprtyObj.isLimitedQtty ? (watchQtty + 1 > (chidlProeprtyObj.remainingQtty || 0) ? watchQtty : watchQtty + 1) : watchQtty + 1
        );
    }

    return (
        <Stack>
            <Group>
                <Text c={"gray.7"} fz={18} fw={700}>
                    {parentPropertyData.title}:
                </Text>
                <Text fz={22} fw={700}>
                    {seletedChildProperty?.name}
                </Text>
                {seletedChildProperty?.allowCustomPrice && (
                    <Text c={themeColor} fz={22} fw={700}>
                        {`السعر:  ${seletedChildProperty?.customPrice} ${currency}`}
                    </Text>
                )}
            </Group>

            {parentPropertyData.multiSelect && (
                <>
                    <Checkbox.Group onChange={handlePropertyCheckboxChange}>
                        <Group wrap="wrap">
                            {parentPropertyData.properties.map((childProperty) => (
                                <Fieldset key={childProperty._id} pos={"relative"} radius={12} p={0}>
                                    {childProperty.hasIcon && childProperty.iconUrl ? (
                                        <>
                                            <Box
                                                w={"100%"}
                                                h={"100%"}
                                                style={{ borderRadius: 12 }}
                                                pos={"absolute"}
                                                bg={
                                                    watch(`propertiesSelected.${idx1}.childPropertiesSelected`)?.find(
                                                        (childPropertySelected) => childPropertySelected.childPropertyId === childProperty._id
                                                    )
                                                        ? rgba(themeColor, 0.08)
                                                        : "transparent"
                                                }
                                            ></Box>

                                            <BackgroundImage radius={12} w={50} h={50} src={childProperty.iconUrl}>
                                                <Center>
                                                    <Checkbox
                                                        value={childProperty._id}
                                                        bg={"transparent"}
                                                        size="xl"
                                                        onChange={(e) => handlePropertyClickChange(e, childProperty)}
                                                        icon={CheckIcon}
                                                        styles={{
                                                            input: { backgroundColor: "transparent", border: "none" },
                                                            icon: { color: themeColor, width: 25, height: 25 },
                                                        }}
                                                    />
                                                </Center>
                                            </BackgroundImage>
                                        </>
                                    ) : (
                                        <Checkbox.Card
                                            value={childProperty._id}
                                            bg={
                                                watch(`propertiesSelected.${idx1}.childPropertiesSelected`)?.find(
                                                    (selected) => selected.childPropertyId === childProperty._id
                                                )
                                                    ? themeButtonsColors
                                                    : "transparent"
                                            }
                                            style={{
                                                border: "none",
                                                borderRadius: 12,
                                                transition: "0.4s",
                                            }}
                                        >
                                            <Center miw={50} px={10} h={50}>
                                                <Text
                                                    c={
                                                        watch(`propertiesSelected.${idx1}.childPropertiesSelected`)?.find(
                                                            (selected) => selected.childPropertyId === childProperty._id
                                                        )
                                                            ? themeButtonsTextColor
                                                            : "black"
                                                    }
                                                    fw={600}
                                                    ta={"center"}
                                                >
                                                    {childProperty.name}
                                                </Text>
                                            </Center>
                                        </Checkbox.Card>
                                    )}
                                </Fieldset>
                            ))}
                        </Group>
                    </Checkbox.Group>

                    <Group wrap="wrap" gap={5} align="stretch">
                        {childProperyFields.map((field, idx) => {
                            const newField = field as typeof field & { chidlProeprtyObj: TChildProperty };
                            return (
                                <Fieldset
                                    pos={"relative"}
                                    ta={"center"}
                                    legend={
                                        newField.chidlProeprtyObj.allowCustomPrice ? (
                                            <Center w={"100%"}>
                                                <Text c={themeColor} fz={15} fw={700} top={-15} pos={"absolute"}>
                                                    {newField.chidlProeprtyObj.customPrice} {currency}
                                                </Text>
                                            </Center>
                                        ) : (
                                            ""
                                        )
                                    }
                                    fw={600}
                                    key={field.id}
                                    style={{ border: "none" }}
                                    p={5}
                                    bg={"#F6F7F9"}
                                >
                                    <Group gap={5}>
                                        {/* <Box style={{ borderRadius: 50 }} w={25} h={25} bg={newField.colorObj.hex}></Box> */}
                                        {newField.chidlProeprtyObj.hasIcon && newField.chidlProeprtyObj.iconUrl && (
                                            <BackgroundImage
                                                w={28}
                                                h={28}
                                                style={{ borderRadius: 50 }}
                                                src={newField.chidlProeprtyObj.iconUrl}
                                            ></BackgroundImage>
                                        )}
                                        <Text fw={600}>{newField.chidlProeprtyObj.name}</Text>
                                        <Group gap={5}>
                                            <ActionIcon
                                                onClick={() => {
                                                    setValue(
                                                        `propertiesSelected.${idx1}.childPropertiesSelected.${idx}.childPropertyQtty`,
                                                        watch(`propertiesSelected.${idx1}.childPropertiesSelected.${idx}.childPropertyQtty`) == 1
                                                            ? 1
                                                            : (watch(
                                                                  `propertiesSelected.${idx1}.childPropertiesSelected.${idx}.childPropertyQtty`
                                                              ) as number) - 1
                                                    );
                                                }}
                                                variant="transparent"
                                            >
                                                <IconMinesCircle />
                                            </ActionIcon>

                                            <Text fw={600}>
                                                {" "}
                                                {watch(`propertiesSelected.${idx1}.childPropertiesSelected.${idx}.childPropertyQtty`)}
                                            </Text>

                                            <ActionIcon
                                                onClick={() => handlePropertyIncraseQtty(idx, newField.chidlProeprtyObj)}
                                                variant="transparent"
                                            >
                                                <IconPlusCircle color={themeColor} />
                                            </ActionIcon>
                                        </Group>
                                    </Group>
                                </Fieldset>
                            );
                        })}
                    </Group>
                </>
            )}

            {!parentPropertyData.multiSelect && (
                <>
                    <Radio.Group onChange={handlePropertyRadioChange}>
                        <Group wrap="wrap">
                            {parentPropertyData.properties.map((childProperty) => (
                                <Fieldset key={childProperty._id} pos={"relative"} radius={12} p={0}>
                                    {childProperty.hasIcon && childProperty.iconUrl ? (
                                        <>
                                            <Box
                                                w={"100%"}
                                                h={"100%"}
                                                style={{ borderRadius: 12 }}
                                                pos={"absolute"}
                                                bg={
                                                    watch(`propertiesSelected.${idx1}.childPropertiesSelected`)?.find(
                                                        (selected) => selected.childPropertyId === childProperty._id
                                                    )
                                                        ? rgba(themeColor, 0.08)
                                                        : "transparent"
                                                }
                                            ></Box>
                                            <BackgroundImage radius={12} w={50} h={50} src={childProperty.iconUrl}>
                                                <Center>
                                                    <Radio
                                                        value={childProperty._id}
                                                        bg={"transparent"}
                                                        size="xl"
                                                        onChange={(e) => handlePropertyClickChange(e, childProperty)}
                                                        icon={CheckIcon}
                                                        styles={{
                                                            radio: { backgroundColor: "transparent", border: "none" },
                                                            icon: { color: themeColor, width: 25, height: 25 },
                                                        }}
                                                    />
                                                </Center>
                                            </BackgroundImage>
                                        </>
                                    ) : (
                                        <Radio.Card
                                            value={childProperty._id}
                                            bg={
                                                watch(`propertiesSelected.${idx1}.childPropertiesSelected`)?.find(
                                                    (selected) => selected.childPropertyId === childProperty._id
                                                )
                                                    ? themeButtonsColors
                                                    : "transparent"
                                            }
                                            style={{
                                                border: "none",
                                                borderRadius: 12,
                                                transition: "0.4s",
                                            }}
                                        >
                                            <Center miw={50} px={10} h={50}>
                                                <Text
                                                    c={
                                                        watch(`propertiesSelected.${idx1}.childPropertiesSelected`)?.find(
                                                            (selected) => selected.childPropertyId === childProperty._id
                                                        )
                                                            ? themeButtonsTextColor
                                                            : "black"
                                                    }
                                                    fw={600}
                                                    ta={"center"}
                                                >
                                                    {childProperty.name}
                                                </Text>
                                            </Center>
                                        </Radio.Card>
                                    )}
                                </Fieldset>
                            ))}
                        </Group>
                    </Radio.Group>
                </>
            )}
        </Stack>
    );
}
