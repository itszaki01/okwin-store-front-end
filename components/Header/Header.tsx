import { Box, Center } from "@mantine/core";
import { useStoreSettingsSlice } from "../../redux/features/storeSettingsSlice/storeSettingsSlice";

export default function Header() {
    const {
        appearance: { headerHtml, themeHeaderBgColor, themeHeaderTextColor },
    } = useStoreSettingsSlice();
    return (
        <Center c={themeHeaderTextColor} py={0} h={"auto"} bg={themeHeaderBgColor}>
            <Box m={"auto"} maw={1000} py={0} w={"100%"} dangerouslySetInnerHTML={{ __html: headerHtml }}></Box>
        </Center>
    );
}
