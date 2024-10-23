import { useEffect } from "react";
import { useStoreSettingsSlice } from "../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useLocation } from "react-router-dom";
import { useCheckFulfilledsSlice } from "../redux/features/checkFulfilledsSlice/checkFulfilledsSlice";

export default function CustomJSRunner() {
    const { pathname } = useLocation();
    const checkFulfilledsd = useCheckFulfilledsSlice();

    const {
        appearance: { customJS },
    } = useStoreSettingsSlice();

    useEffect(() => {
        // Code to run after the component has mounted
        eval(customJS);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, checkFulfilledsd]);

    return <></>;
}
