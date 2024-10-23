import { Box, Fieldset, Group, Image, Loader, Stack, Text, TextInput } from "@mantine/core";
import IconSearch from "../../ui/icons/IconSearch";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useState } from "react";
import { useClickOutside, useDebouncedCallback } from "@mantine/hooks";
import { useGetAllProductsQuery } from "../../../redux/services/productsApiService/productsApiService";
import { ISearchQuery } from "../../../@types/common/SearchQuery";
import { Link } from "react-router-dom";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { useMenuDrawerContext } from "../../../contexts/MenuDrawerContext";

export default function NavSearchInput() {
    const {
        appearance: { themeNavBarTextColor,themeColor},
    } = useStoreSettingsSlice();
    const { isSmallScreen } = useDevicesContext();
    const { closeMenuDrawer } = useMenuDrawerContext();

    const [showScrollArea, setShowScrollArea] = useState(false);
    const ref = useClickOutside(() => setShowScrollArea(false));
    const [searchKeyword, setSearchKeyword] = useState("");

    const [searchQuery, setSearchQuery] = useState<ISearchQuery>({
        page: 1,
        limit: 20,
        keyword: "",
        searchKey: "name",
        searchMethod: "Custom",
    });
    const { data: productsData, isFetching: isGettingProductsData } = useGetAllProductsQuery(searchQuery);

    const handleSearch = useDebouncedCallback((serachKeywordDebounce: string) => {
        setSearchQuery({ ...searchQuery, keyword: serachKeywordDebounce });
    }, 600);

    return (
        <>
            <Box w={isSmallScreen ? "100%" : 200} style={{ zIndex: 10 }} pos={"relative"}>
                <TextInput
                    color={themeNavBarTextColor}
                    placeholder="إبحث عن منتج"
                    radius={"xl"}
                    size={isSmallScreen ? "lg" : "sm"}
                    onFocus={() => setShowScrollArea(true)}
                    value={searchKeyword}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                        setSearchKeyword(e.target.value);
                    }}
                    leftSection={<IconSearch color={themeNavBarTextColor} />}
                    rightSection={
                        isGettingProductsData && (
                            <>
                                <Loader color={themeColor} size={20} />
                            </>
                        )
                    }
                />
                <Fieldset
                    style={{ display: showScrollArea ? "block" : "none", overflow: "auto" }}
                    bg={"white"}
                    m={"auto"}
                    ref={ref}
                    w={isSmallScreen ? "100%" : 300}
                    p={10}
                    pos={"absolute"}
                    mah={300}
                >
                    <Stack>
                        {!productsData?.data || isGettingProductsData ? (
                            <></>
                        ) : (
                            productsData.data.map((productData) => (
                                <Link
                                    style={{ textDecoration: "none" }}
                                    onClick={() => {
                                        setShowScrollArea(false);
                                        closeMenuDrawer();
                                        scrollTo(0,0)
                                    }}
                                    key={productData._id}
                                    state={productData}
                                    to={`/p/${productData.slug}`}
                                >
                                    <Fieldset w={"100%"} style={{ textOverflow: "ellipsis" }} p={5}>
                                        <Group>
                                            <Image radius={"md"} src={productData.imageCover} w={50} />
                                            <Stack gap={5} maw={"50%"}>
                                                <Text c={"gray.6"}>{productData.category?.name}</Text>
                                                <Text c={"black"} truncate>
                                                    {productData.name}
                                                </Text>
                                            </Stack>
                                        </Group>
                                    </Fieldset>
                                </Link>
                            ))
                        )}
                    </Stack>
                </Fieldset>
            </Box>
        </>
    );
}
