import { Avatar, Box, Group, Rating, Stack, Text, Title } from "@mantine/core";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { Carousel } from "@mantine/carousel";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { useMemo } from "react";

export default function StoreReviewsSection() {
    const {
        appearance: { storeReviews, themeColor },
    } = useStoreSettingsSlice();

    const { isSmallScreen } = useDevicesContext();

    const sizes = useMemo(
        () => ({
            carouselW: isSmallScreen ? "90vw" : 600,
        }),
        [isSmallScreen]
    );
    if (storeReviews.length === 0) return <></>;

    return (
        <Stack maw={sizes.carouselW} m={"auto"} mb={40}>
            <Title ta={"center"}>آراء عملائنا</Title>
            <Carousel ta={"center"} loop={true} withIndicators>
                {storeReviews.map((review, idx) => (
                    <Carousel.Slide key={idx}>
                        <Stack align="center">
                            <Box pos={"relative"}>
                                <Avatar w={60} h={60} src={review.raterImage} />
                                <Box bg={themeColor} right={3} top={2} w={60} h={60} pos={"absolute"} style={{ borderRadius: 50, zIndex: -1 }}></Box>
                            </Box>
                            <Group lh={2}>
                                <span style={{ color: themeColor, fontSize: 50, transform: "rotate:360deg" }}>;; </span>
                                <Text lh={1.5} fw={700} fz={21}>
                                    {review.reviewText}
                                </Text>
                                <span style={{ color: themeColor, fontSize: 50, transform: "rotate:360deg" }}> ;;</span>
                            </Group>
                            <Stack gap={5} align="center">
                                <Rating size={"md"} readOnly value={review.rating} />
                                <Text fw={700}>{review.raterName}</Text>
                            </Stack>
                        </Stack>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Stack>
    );
}
