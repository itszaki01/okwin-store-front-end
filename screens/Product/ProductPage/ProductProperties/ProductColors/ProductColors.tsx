import { ChangeEvent, useState } from "react";
import { ActionIcon, Box, Center, Checkbox, CheckIcon, Fieldset, Group, Radio, Stack, Text } from "@mantine/core";
import { useFieldArray } from "react-hook-form";
import { IProductRES } from "../../../../../@types/Products/ProductRES";
import IconMinesCircle from "../../../../../components/ui/icons/IconMinesCircle";
import IconPlusCircle from "../../../../../components/ui/icons/IconPlusCircle";
import { useProductDataContext } from "../../../../../contexts/PorudctDataContext";
import { useStoreSettingsSlice } from "../../../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useAddProductToCartFormContext } from "../../ProductPage";

type TColor = NonNullable<IProductRES["colors"]>["list"][number];
export default function ProductColors() {
    const {
        form: { control, watch, setValue },
    } = useAddProductToCartFormContext();

    const { fields, replace } = useFieldArray({ control, name: "colorsSelected" });

    const { productData } = useProductDataContext();
    const {
        currency,
        appearance: { themeColor },
    } = useStoreSettingsSlice();

    const [selectedColor, setSelectedColor] = useState<TColor | undefined>(undefined);

    function handleColorClick(e: ChangeEvent<HTMLInputElement>, color: TColor) {
        if (e.target.checked) {
            setSelectedColor(color);
            if (color.imageVar) {
                document.querySelector(`.thumbs #carousal-img-${color.imageVar.replaceAll(" ", "-")}`)?.parentElement?.click();
            }
        } else {
            setSelectedColor(undefined);
        }
    }

    function handleColorRadioChange(value: string) {
        replace({ colorId: value, colorQtty: 0, colorObj: productData.colors?.list.find((color) => color._id === value) });
    }

    function handleCheckboxChange(values: string[]) {
        replace(
            values.map((value, idx) => ({
                colorId: value,
                colorQtty: watch(`colorsSelected.${idx}.colorQtty`) || 1,
                colorObj: productData.colors?.list.find((color) => color._id === value),
            }))
        );
    }

    function handleIncraseColorQtty(idx: number, colorObj: TColor) {
        const watchQtty = watch(`colorsSelected.${idx}.colorQtty`) || 1;
        setValue(
            `colorsSelected.${idx}.colorQtty`,
            colorObj.isLimitedQtty ? (watchQtty + 1 > (colorObj.remainingQtty || 0) ? watchQtty : watchQtty + 1) : watchQtty + 1
        );
    }

    if (!productData.colors?.list.length) return <></>;

    return (
        <Stack>
            <Group>
                <Text c={"gray.7"} fz={18} fw={700}>
                    إختر اللون:
                </Text>
                <Text fz={22} fw={700}>
                    {selectedColor?.name}
                </Text>
                {selectedColor?.allowCustomPrice && (
                    <Text c={themeColor} fz={22} fw={700}>
                        {`السعر:  ${selectedColor?.customPrice} ${currency}`}
                    </Text>
                )}
            </Group>

            {!productData.colors?.multiSelect && (
                <Radio.Group onChange={handleColorRadioChange}>
                    <Group>
                        {productData.colors?.list.map((color) => (
                            <Radio
                                key={color._id}
                                size="xl"
                                w={28}
                                style={{ borderRadius: 50 }}
                                value={color._id}
                                icon={CheckIcon}
                                onChange={(e) => handleColorClick(e, color)}
                                styles={{
                                    radio: { background: color.hex, border: "1px solid gray" },
                                }}
                            />
                        ))}
                    </Group>
                </Radio.Group>
            )}

            {productData.colors?.multiSelect && (
                <Stack gap={20}>
                    <Checkbox.Group onChange={handleCheckboxChange}>
                        <Group>
                            {productData.colors?.list.map((color) => (
                                <Checkbox
                                    size="xl"
                                    w={28}
                                    radius={"xl"}
                                    key={color._id}
                                    style={{ borderRadius: 50 }}
                                    value={color._id}
                                    icon={CheckIcon}
                                    onChange={(e) => handleColorClick(e, color)}
                                    styles={{
                                        input: { background: color.hex, border: "1px solid gray" },
                                    }}
                                />
                            ))}
                        </Group>
                    </Checkbox.Group>

                    <Group wrap="wrap" gap={5} align="stretch">
                        {fields.map((field, idx) => {
                            const newField = field as typeof field & { colorObj: TColor };
                            return (
                                <Fieldset
                                    pos={"relative"}
                                    ta={"center"}
                                    legend={
                                        newField.colorObj.allowCustomPrice ? (
                                            <Center w={"100%"}>
                                                <Text c={themeColor} fz={15} fw={700} top={-15} pos={"absolute"}>
                                                    {newField.colorObj.customPrice} {currency}
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
                                        <Box style={{ borderRadius: 50, border: "1px solid gray" }} w={25} h={25} bg={newField.colorObj.hex}></Box>
                                        <Text fw={600}>{newField.colorObj.name}</Text>
                                        <Group gap={5}>
                                            <ActionIcon
                                                onClick={() =>
                                                    setValue(
                                                        `colorsSelected.${idx}.colorQtty`,
                                                        watch(`colorsSelected.${idx}.colorQtty`) == 1
                                                            ? 1
                                                            : (watch(`colorsSelected.${idx}.colorQtty`) as number) - 1
                                                    )
                                                }
                                                variant="transparent"
                                            >
                                                <IconMinesCircle />
                                            </ActionIcon>

                                            <Text fw={600}> {watch(`colorsSelected.${idx}.colorQtty`)}</Text>

                                            <ActionIcon onClick={() => handleIncraseColorQtty(idx, newField.colorObj)} variant="transparent">
                                                <IconPlusCircle color={themeColor} />
                                            </ActionIcon>
                                        </Group>
                                    </Group>
                                </Fieldset>
                            );
                        })}
                    </Group>
                </Stack>
            )}
        </Stack>
    );
}
