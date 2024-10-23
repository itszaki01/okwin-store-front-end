import { Flex, ScrollArea, Stack, Title } from "@mantine/core";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { useGetAllProductsOffersQuery } from "../../../redux/services/productsApiService/productsApiService";
import MyLoader from "../../../components/common/MyLoader/MyLoader";
import StoreOfferCard from "./StoreOfferCard/StoreOfferCard";

export default function StoreOffersSection() {
    const { isMobileScreen,isTablet } = useDevicesContext();
    const { data: productsOffersData, isLoading: isGettingsProductsOffers } = useGetAllProductsOffersQuery();
    if (!productsOffersData?.data || isGettingsProductsOffers) return <MyLoader />;
    if (productsOffersData.data.length === 0) return <></>;

    return (
        <Stack m={'auto'} maw={isTablet ? '98vw': 1100} mah={690} align="center">
            <Title>أفضل العروض</Title>
            <ScrollArea type='always' h={'100%'} w={"100%"} pb={10}>
                <Flex gap={10} direction={isMobileScreen ? "column" : "row"} justify="center">
                    {productsOffersData.data.map((product) => (
                        <StoreOfferCard key={product._id} product={product} />
                    ))}
                </Flex>
            </ScrollArea>
        </Stack>
    );
}
