import { ActionIcon, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import IconPhone from "../../ui/icons/IconPhone";

export default function ClickToCallBtn() {
    const { storeExtensions } = useStoreSettingsSlice();
    //ResponsiveSettings
    const { isMobile, isXsMobile, isTablet } = useDevicesContext();

    let phoneCallB: number;
    let phoneCallL: number;
    let phoneCallSize: number;

    if (isXsMobile) {
        phoneCallB = 55;
        phoneCallL = 10;
        phoneCallSize = 60;
    } else if (isMobile) {
        phoneCallB = 55;
        phoneCallL = 15;
        phoneCallSize = 60;
    } else if (isTablet) {
        phoneCallB = 65;
        phoneCallL = 20;
        phoneCallSize = 60;
    } else {
        phoneCallB = 65;
        phoneCallL = 30;
        phoneCallSize = 60;
    }
    useEffect(() => {}, []);
    return (
        <ActionIcon
            color={storeExtensions?.clicktoCallBtnProps?.backGroundColor ? storeExtensions?.clicktoCallBtnProps?.backGroundColor : "green"}
            style={{ borderRadius: 50, zIndex: 1000 }}
            pos={"fixed"}
            bottom={phoneCallB}
            left={phoneCallL}
            w={phoneCallSize}
            h={phoneCallSize}
            className="phone-call-animation"
            component={Link}
            to={`tel:${storeExtensions?.clicktoCallBtnProps?.phoneNumber}`}
            target="_blank"
        >
            {storeExtensions?.clicktoCallBtnProps?.allowSpecialIcon ? <Image w={40} src={storeExtensions?.clicktoCallBtnProps?.iconUrl} /> : <IconPhone />}
        </ActionIcon>
    );
}
