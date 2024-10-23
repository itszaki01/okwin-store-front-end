import { Carousel } from "react-responsive-carousel";
import { Box } from "@mantine/core";
import { useMemo } from "react";
import { useDevicesContext } from "../../../../contexts/DevicesContext";
import { useProductDataContext } from "../../../../contexts/PorudctDataContext";
import { useStoreSettingsSlice } from "../../../../redux/features/storeSettingsSlice/storeSettingsSlice";

export default function ProductCarousel() {
    const { isXsMobile, isMobile, isTablet } = useDevicesContext();
    const {
        appearance: { infinitProductCarouselLoop },
    } = useStoreSettingsSlice();
    const { productData } = useProductDataContext();

    const sizes = useMemo(() => {
        return {
            carouselWidth: isXsMobile ? "80vw" : isMobile ? "86vw" : isTablet ? "85vw" : 500,
            thumbWidth: isXsMobile ? 80 : isMobile ? 80 : isTablet ? 90 : 95,
        };
    }, [isXsMobile, isMobile, isTablet]);

    return (
        <Box dir="ltr" w={sizes.carouselWidth} style={{ overflow: "hidden" }}>
            <Carousel
                width={sizes.carouselWidth}
                emulateTouch
                swipeScrollTolerance={30}
                thumbWidth={sizes.thumbWidth}
                preventMovementUntilSwipeScrollTolerance
                showArrows={false}
                showStatus={false}
                autoPlay={infinitProductCarouselLoop}
                infiniteLoop
                interval={3000}
                axis="horizontal"
            >
                {productData.images.map((image, idx) => (
                    <div key={idx}>
                        <img id={`carousal-img-${image.imageVar?.replaceAll(" ", "-")}`} src={image.imageUrl} loading="lazy" alt="" />
                    </div>
                ))}
            </Carousel>
        </Box>
    );
}
