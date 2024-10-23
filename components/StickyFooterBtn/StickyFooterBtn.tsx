import { Button, Group, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDevicesContext } from "../../contexts/DevicesContext";
import { useStoreSettingsSlice } from "../../redux/features/storeSettingsSlice/storeSettingsSlice";

export default function StickyFooterBtn() {
    const {
        appearance: { themeButtonsColors, themeButtonsTextColor, themeColor },
        storeExtensions,
    } = useStoreSettingsSlice();

    const [showButton, setShowButton] = useState(true);

    //ResponsiveSetting
    const { isXsMobile, isMobile, isTablet } = useDevicesContext();

    let inputSize: string;
    let footerH: number;
    if (isMobile) {
        inputSize = "md";
        footerH = 50;
    } else if (isTablet) {
        inputSize = "lg";
        footerH = 60;
    } else if (isXsMobile) {
        inputSize = "md";
        footerH = 50;
    } else {
        inputSize = "lg";
        footerH = 60;
    }

    //show Hide Button Logic
    useEffect(() => {
        function hideShowButton() {
            const element = document.getElementById("formButton") as HTMLInputElement;
            const fromElemetn = document.getElementById("orderForm") as HTMLFormElement;
            const fromElemetnReact = fromElemetn.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            const hideArea1 = scrollY + elementRect.top - window.innerHeight - fromElemetnReact.height + 90;
            const hideArea2 = scrollY + elementRect.top - window.innerHeight + fromElemetnReact.height - 200;

            if (hideArea1 < scrollY && hideArea2 > scrollY) {
                setShowButton(false);
            } else {
                setShowButton(true);
            }
        }

        window.addEventListener("scroll", hideShowButton);
        return () => {
            window.removeEventListener("scroll", hideShowButton);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handlBtnClick() {
        const element = document.getElementById("orderForm") as HTMLInputElement;
        // Get the element's bounding rectangle
        const rect = element.getBoundingClientRect();

        // Get the element's Y position relative to the document
        const yPosition = rect.top + window.scrollY;

        scrollTo(0, yPosition - 90);
    }

    return (
        <Group
            bg={"white"}
            style={{ zIndex: 1000, borderTop: `3px solid ${themeColor}` }}
            h={footerH}
            w={"100vw"}
            pos={"fixed"}
            bottom={0}
            justify="center"
            display={showButton ? "flex" : "none"}
        >
            <Button
                onClick={handlBtnClick}
                color={
                    storeExtensions?.stickyFooterBtnProps?.buttonBackgroundColor
                        ? storeExtensions?.stickyFooterBtnProps?.buttonBackgroundColor
                        : themeButtonsColors
                }
                c={
                    storeExtensions?.stickyFooterBtnProps?.buttonTextColor
                        ? storeExtensions?.stickyFooterBtnProps?.buttonTextColor
                        : themeButtonsTextColor
                }
                size={inputSize}
                radius={"xl"}
                className="btn-animation"
                leftSection={
                    storeExtensions?.stickyFooterBtnProps?.allowLeftSectionIcon ? (
                        <Image maw={33} src={storeExtensions?.stickyFooterBtnProps.leftSectionIconUrl} />
                    ) : (
                        ""
                    )
                }
                rightSection={
                    storeExtensions?.stickyFooterBtnProps?.allowRightSectionIcon ? (
                        <Image maw={33} src={storeExtensions?.stickyFooterBtnProps.rightSectionIconUrl} />
                    ) : (
                        ""
                    )
                }
            >
                {storeExtensions?.stickyFooterBtnProps?.bottonText ? storeExtensions?.stickyFooterBtnProps.bottonText : "قدم طلبك الآن"}
            </Button>
        </Group>
    );
}
