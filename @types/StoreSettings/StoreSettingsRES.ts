export interface IStorSettingsRES {
    mobileBanners?: {
        imageUrl: string;
        targetLink?: string;
        openLinkInNewtab?: boolean;
        _id: string;
    }[];

    desktopBanners?: {
        imageUrl: string;
        targetLink?: string;
        openLinkInNewtab?: boolean;
        _id: string;
    }[];

    id: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
    mainStore: IStorSettingsRES | string;
    _id: string;
    isActive: boolean;
    currency: string;
    allowLocations: boolean;
    inputsPerRowDesktop: number;
    inputsPerRowMobile: number;
    shippingPrefix: string;
    stopDeskPrefix: string;
    currencyCode: string;
    countryPhoneCode: string;
    country: string;
    storeSubcreption: "free" | "starter" | "solopreneur" | "business" | "enterprise" | "custom";
    syncorniseLocationSettings?: boolean;
    isSubStore:boolean
    orderFormInputs: {
        inputLabel: string;
        inputPlacebolder: string;
        showInput: boolean;
        inputDataArry: string[];
        searchable: boolean;
        inputDefualtValue: string;
        allowLefSectoinIcon: boolean;
        allowRightSectionIcon: boolean;
        leftSectionIconUrl: string;
        rightSectionIconUrl: string;
        inputValidation: {
            required: boolean;
            allowMaxLength: boolean;
            maxLength: number;
            allowMinLength: boolean;
            minLength: number;
            withAsterisk: boolean;
            _id: string;
        };
        inputType:
            | "text"
            | "textarea"
            | "number-input"
            | "hidden"
            | "select"
            | "phone-number"
            | "locations"
            | "subLocations"
            | "client-name"
            | "second-phone-number"
            | "client-full-address";

        _id: string;
    }[];

    appearance: {
        favicon: string;
        allowOffersAddToCart: boolean;
        infinitProductCarouselLoop: boolean;
        infinitBannersCarouselLoop: boolean;
        customJS: string;
        customCSS: string;
        customThankYouPageJS: string;
        itemsInPage: number;
        showSuggestedProducts: boolean;
        showOrderSummeryInProductPage: boolean;
        showCouponInput: boolean;
        thankYouPageBody: string;
        policyText: string;
        allowWhatsapp: boolean;
        whatsappNumber: string;
        allowInstagram: boolean;
        instagramLink: string;
        allowFacebook: boolean;
        facebookLink: string;
        allowTiktok: boolean;
        tiktokLink: string;
        allowPhoneNumber: boolean;
        phoneNumber: string;
        storeRights: string;
        allowThankYouPageSuggestedProducts: boolean;
        allowShoppingCart: boolean;
        secondaryLogo: {
            rectangular: boolean;
            logoLink: string;
        };
        storeReviews: { raterName: string; reviewText: string; raterImage: string; rating: number }[];
        headerHtml: string;
        footerHtml: string;
        storeTitle: string;
        storeFont: string;
        navLinks: {
            toLink: string;
            linkName: string;
            openInNewTab: boolean;
            scrollToTop: boolean;
            neastedLinks: { toLink: string; linkName: string; openInNewTab: boolean; scrollToTop: boolean }[];
        }[];
        loaderSettings: {
            loaderType: "dots" | "oval" | "bars";
            backgroundColor: string;
            loaderColor: string;
            allowGifImg: boolean;
            gifImgUrl: string;
        };
        storeFeaturesSection: { iconLink: string; title: string; description: string }[];
        themeColor: string;
        themeButtonsColors: string;
        themeButtonsTextColor: string;
        themeHeaderBgColor: string;
        themeHeaderTextColor: string;
        themeNavBarBg: string;
        themeNavBarTextColor: string;
        themeFooterBg: string;
        themeFooterTextColor: string;
    };

    storeApps: {
        allowFacebookPixel?: boolean;
        facebookPixelIds?: { pixelId: string }[];
        allowTiktokPixel?: boolean;
        tikTokPixelIds?: { pixelId: string }[];
        allowGoogleTagManager?: boolean;
        googleTagManagerIds?: { tagId: string }[];
        allowGoogleAnalytics?: boolean;
        googleAnalyticsIds?: { tagId: string }[];
        _id: string;
    };

    storeExtensions?:{
        disableRightClick?: boolean;
        disableTextCopyAndSelection?: boolean;
        disableImageDownload?: boolean;
        allowStickyFooterBtn?: boolean;

        stickyFooterBtnProps?: {
            bottonText?: string;
            buttonBackgroundColor?: string;
            buttonTextColor?: string;
            allowLeftSectionIcon?: boolean;
            leftSectionIconUrl?: string;
            allowRightSectionIcon?: boolean;
            rightSectionIconUrl?: string;
        };
        allowClickToCallBtn?: boolean;
        clicktoCallBtnProps?: {
            phoneNumber?: string;
            backGroundColor?: string;
            allowSpecialIcon?: boolean;
            iconUrl?: string;
        };

        allowWhatsAppBtn?: boolean;
        whatsAppBtnProps?: {
            phoneNumber?: string;
            buttonText?:string
        };
    }
}
