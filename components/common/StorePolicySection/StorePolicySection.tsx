import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { Fieldset } from "@mantine/core";
import HtmlTextWrapper from "../../HtmlTextWrapper/HtmlTextWrapper";

export default function StorePolicySection() {
    const {
        appearance: { policyText },
    } = useStoreSettingsSlice();
    return (
        <Fieldset radius={12}>
            <HtmlTextWrapper html={policyText}/>
        </Fieldset>
    );
}
