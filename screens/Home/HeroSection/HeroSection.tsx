import { Carousel } from "@mantine/carousel";
import { Image, Stack } from "@mantine/core";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { Link } from "react-router-dom";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { useEffect, useMemo } from "react";

export default function HeroSection() {
    const { isSmallScreen } = useDevicesContext();
    const { desktopBanners, mobileBanners,appearance:{infinitBannersCarouselLoop} } = useStoreSettingsSlice();

    const banners = useMemo(() => {
        return !isSmallScreen ? desktopBanners : mobileBanners;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSmallScreen]);

    useEffect(()=>{
        if(infinitBannersCarouselLoop && banners && banners.length > 1){
            const carouselControler = document.querySelectorAll(`.hero-section .mantine-Carousel-control`)[1]
            setInterval(() => {
                if(carouselControler && infinitBannersCarouselLoop){
                    //@ts-expect-error its exist
                    carouselControler.click()
                }
            }, 5000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if (banners?.length === 0) return <></>;

    return (
        <Stack className="hero-section">
            <Carousel loop={true} withIndicators height={400}>
                {banners?.map((banner) => (
                    <Carousel.Slide key={banner._id}>
                        <Link
                            style={{ cursor: banner.targetLink ? "pointer" : "default" }}
                            to={banner.targetLink || ""}
                            target={banner.openLinkInNewtab ? "_blank" : ""}
                        >
                            <Image alt="" loading='lazy' src={banner.imageUrl} />
                        </Link>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Stack>
    );
}
