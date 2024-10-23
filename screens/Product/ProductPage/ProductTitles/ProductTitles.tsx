import { useProductDataContext } from "../../../../contexts/PorudctDataContext";
import { Title, Group, Text, Stack } from "@mantine/core";
import IconStar from "../../../../components/ui/icons/IconStar";

export default function ProductTitles() {
    const { productData } = useProductDataContext();
    return (
        <Stack>
            <Title order={2}>{productData.name}</Title>
            {productData.description && (
                <Text fw={600} fz={18} c={"gray.7"}>
                    {productData.description}
                </Text>
            )}
            {productData?.rating != 0 && (
                    <Group gap={5}>
                        {Array.from({ length: productData.rating || 0 }, (_, idx) => (
                            <IconStar key={idx} />
                        ))}
                        <Text fz={18}>(5/{productData.rating})</Text>
                    </Group>
            )}
        </Stack>
    );
}
