import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { Link } from "react-router-dom";
import { Image } from "@mantine/core";

export default function Logo() {
    const {
        appearance: { secondaryLogo },
    } = useStoreSettingsSlice();
    return (
        <Link onClick={()=> scrollTo(0,0)}  to={"/"}>
            <Image  loading='lazy' mah={70} w={secondaryLogo.rectangular ? 140 : 50} src={secondaryLogo.logoLink} />
        </Link>
    );
}
