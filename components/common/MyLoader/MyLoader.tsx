import { Center, Image, Loader } from "@mantine/core";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";

export default function MyLoader() {
    const {
        appearance: {
            loaderSettings: { allowGifImg, gifImgUrl, loaderColor, loaderType, backgroundColor },
        },
    } = useStoreSettingsSlice();
    return (
        <Center style={{ zIndex: 1000 }} bg={backgroundColor} top={0} right={0} pos={"fixed"} w={"100vw"} h={"100vh"}>
            {!allowGifImg ? <Loader color={loaderColor} type={loaderType} /> : <Image  src={gifImgUrl} />}
        </Center>
    );
}
