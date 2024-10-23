import { Stack } from "@mantine/core";
import HeroSection from "./HeroSection/HeroSection";
import StoreFeaturesSection from "./StoreFeaturesSection/StoreFeaturesSection";
import StoreOffersSection from "./StoreOffersSection/StoreOffersSection";
import StoreCategoriesSection from "./StoreCategoriesSection/StoreCategoriesSection";
import ProductsSection from "./ProductsSection/ProductsSection";
import StoreReviewsSection from "./StoreReviewsSection/StoreReviewsSection";

export default function HomePage() {
    return (
        <Stack gap={50} >
            <HeroSection />
            <StoreFeaturesSection />
            <StoreOffersSection />
            <StoreCategoriesSection />
            <ProductsSection />
            <StoreReviewsSection/>
        </Stack>
    );
}
