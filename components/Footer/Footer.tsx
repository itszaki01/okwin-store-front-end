import { Box, Center, Divider, Flex, Stack, Text, Title } from "@mantine/core";
import Logo from "../common/Logo/Logo";
import { useStoreSettingsSlice } from "../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useGetAllStorePagesQuery } from "../../redux/services/storePagesApiService/storePagesApiService";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDevicesContext } from "../../contexts/DevicesContext";
import { uuidv4 } from "../../utils/uuidv4";
import { useCompanyDataSlice } from "../../redux/features/companyDataSlice/companyDataSlice";

export default function Footer() {
    const { isSmallScreen } = useDevicesContext();

    const {
        storeSubcreption,
        appearance: { footerHtml, themeFooterBg, themeFooterTextColor, storeRights },
    } = useStoreSettingsSlice();

    const {companyDomain,companyName} = useCompanyDataSlice()

    const { data: storePagesData } = useGetAllStorePagesQuery();

    const storePages = useMemo(() => {
        if (!storePagesData?.data) return [];
        // const pagesSections = [...new Set(storePagesData.data.map((page) => page.section))];
        // const pagesFinalData = pagesSections.map((pageSection) => {
        //     return {
        //         sectionName: pageSection,
        //         pages: storePagesData.data.filter((pageData) => pageData.section === pageSection),
        //     };
        // });

        return [];
    }, [storePagesData?.data]);

    return (
        <Stack>
            <Divider w="100%" />
            <Center>
                <Logo />
            </Center>
            <Box bg={themeFooterBg} c={themeFooterTextColor}>
                <Stack m={"auto"} p={20} w={"100%"} maw={1000} bg={themeFooterBg}>
                    <Flex gap={30} direction={isSmallScreen ? "column" : "row"} justify={"flex-start"}>
                        <Stack maw={400}>
                            <Box dangerouslySetInnerHTML={{ __html: footerHtml }}></Box>
                        </Stack>
                   
                    </Flex>
                    <Divider />
                    <Flex
                        gap={10}
                        direction={isSmallScreen ? "column" : "row"}
                        justify={storeSubcreption === "free" ? "space-between" : "flex-end"}
                        align={isSmallScreen ? "flex-start" : "flex-end"}
                    >
                        {storeSubcreption === "free" ? (
                            <>
                                <Text style={{ order: isSmallScreen ? 2 : 1 }}>Made By {companyName}</Text>{" "}
                                <Text style={{ order: isSmallScreen ? 1 : 1, alignSelf: "flex-end" }}>
                                    {" "}
                                    جميع الحقوق محفوظة ل{" "}
                                    <Text c={"blue"} component={Link} to={`https://${companyDomain}`} target="_blank">
                                       {companyDomain}
                                    </Text>
                                </Text>
                            </>
                        ) : (
                            <>
                                <Box style={{ alignSelf: "flex-start" }} dangerouslySetInnerHTML={{ __html: storeRights }}></Box>
                            </>
                        )}
                    </Flex>
                </Stack>
            </Box>
        </Stack>
    );
}
