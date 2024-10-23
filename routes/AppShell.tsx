import { Divider, Stack } from "@mantine/core";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import CustomJSRunner from "./CustomJSRunner";
import { Outlet, useLocation } from "react-router-dom";
import { useStoreSettingsSlice } from "../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useDocumentTitle } from "@mantine/hooks";
import Footer from "../components/Footer/Footer";
import { useEffect } from "react";
import { useSendStorePageViewMutation } from "../redux/services/storeSettingsApiService/storeSettingsApiService";
import OrderFormContextProvider from "../contexts/OrderFormContext";
import ProductDataContextProvider from "../contexts/PorudctDataContext";
import CartDrawerContextProvider from "../contexts/CartDrawerContext";
import MenuDrawerContextProvider from "../contexts/MenuDrawerContext";
import TagManager from "react-gtm-module";
import ReactGA from "react-ga4";

export default function AppShell() {
    const {
        appearance: { storeTitle, themeColor },
        storeExtensions,
        storeApps: {
            allowFacebookPixel,
            allowGoogleAnalytics,
            allowGoogleTagManager,
            allowTiktokPixel,
            facebookPixelIds,
            googleAnalyticsIds,
            googleTagManagerIds,
            tikTokPixelIds,
        },
    } = useStoreSettingsSlice();

    const { pathname } = useLocation();
    const [SendStorePageView] = useSendStorePageViewMutation();

    useDocumentTitle(storeTitle);
    document.documentElement.style.setProperty("--main-theme-color", themeColor);

    //Extension of disable RightClick
    useEffect(() => {
        if (storeExtensions?.disableRightClick) {
            document.body.oncontextmenu = () => false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        SendStorePageView(document.referrer.match(/https?:\/\/(?:[a-zA-Z0-9-]+\.)*([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/)?.[1] || "direct");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //init pixels fb
        if (allowFacebookPixel && facebookPixelIds && facebookPixelIds.length > 0) {
            facebookPixelIds.forEach(({ pixelId }) => {
                //@ts-expect-error null
                window.fbq("init", pixelId);
                if (!pathname.includes("/p/")) {
                    //@ts-expect-error null
                    window.fbq("track", "PageView");
                }
            });
        }

        //init pixels TIKTOK
        if (allowTiktokPixel && tikTokPixelIds && tikTokPixelIds.length > 0) {
            tikTokPixelIds.forEach(({ pixelId }) => {
                //@ts-expect-error null
                window.ttq.load(pixelId);
            });
        }
        //@ts-expect-error null
        window.ttq.track("ViewContent");

        //init GTM TAGS
        if (allowGoogleTagManager && googleTagManagerIds && googleTagManagerIds.length > 0) {
            googleTagManagerIds.forEach(({ tagId }) => {
                const tagManagerArgs = {
                    gtmId: tagId,
                };
                TagManager.initialize(tagManagerArgs);
            });
        }
        //Send StorePageView GTM
        TagManager.dataLayer({ dataLayer: { event: "OkwinStorePageView" } });

        //init Google Analytics
        if (allowGoogleAnalytics && googleAnalyticsIds && googleAnalyticsIds.length > 0) {
            ReactGA.initialize(googleAnalyticsIds.map(({ tagId }) => ({ trackingId: tagId })));
            ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: document.title });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <OrderFormContextProvider>
                <ProductDataContextProvider>
                    <CartDrawerContextProvider>
                        <MenuDrawerContextProvider>
                            <Header />
                            <Stack style={{ zIndex: 10 }} pos={"sticky"} top={0} gap={0}>
                                <NavBar />
                                <Divider w={"100%"} />
                            </Stack>
                            <Stack>
                                <Outlet />
                                <Footer />
                            </Stack>
                        </MenuDrawerContextProvider>
                    </CartDrawerContextProvider>
                </ProductDataContextProvider>
            </OrderFormContextProvider>
            <CustomJSRunner />
        </>
    );
}
