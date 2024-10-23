import { useMemo } from "react";
import { ICategoryRES } from "../../../@types/Categories/CategoryRES";
import { Fieldset, Image, rgba, Stack, Text } from "@mantine/core";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { useHover } from "@mantine/hooks";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { Link } from "react-router-dom";

interface IProps {
    categoryData: ICategoryRES;
}
export default function CategoryCard({ categoryData }: IProps) {
    const { isSmallScreen } = useDevicesContext();
    const {
        appearance: { themeColor },
    } = useStoreSettingsSlice();
    const { ref, hovered } = useHover<HTMLFieldSetElement>();

    const sizes = useMemo(() => {
        return {
            categoryCardWidth: isSmallScreen ? 100 : 125,
        };
    }, [isSmallScreen]);

    return (
        <Fieldset
            ref={ref}
            bg={hovered ? rgba(themeColor, 0.1) : ""}
            style={{ borderColor: hovered ? rgba(themeColor, 0.5) : "", cursor: "pointer" }}
            p={0}
            onClick={() => scrollTo(0, 0)}
            ta={"center"}
            w={sizes.categoryCardWidth}
            radius={"md"}
        >
            <Link to={`/category/${categoryData.slug}`} state={categoryData} style={{ textDecoration: "none" }}>
                <Stack h={'100%'}  px={2} py={7} align="center" justify="center">
                    <Image loading='lazy' radius={"sm"} src={categoryData.iconUrl} w={45} h={45} />
                    <Text c={"black"} fz={18} fw={700}>
                        {categoryData.name}
                    </Text>
                </Stack>
            </Link>
        </Fieldset>
    );
}
