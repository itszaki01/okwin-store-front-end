import { Button, createTheme, Group, MantineProvider } from "@mantine/core";
import  { ReactNode, useMemo } from "react";
import { useStoreSettingsSlice } from "../redux/features/storeSettingsSlice/storeSettingsSlice";

export default function AppThemeProvider({ children }: { children: ReactNode }) {
    const {
        appearance: { themeButtonsColors,themeButtonsTextColor,storeFont },
    } = useStoreSettingsSlice();
    
    const theme = useMemo(
        () =>
            createTheme({
                fontFamily: storeFont,
                components: {
                    Group: Group.extend({
                        defaultProps: {
                            wrap: "nowrap",
                        },
                    }),
                    Button: Button.extend({
                        defaultProps: {
                            color: themeButtonsColors,
                            c:themeButtonsTextColor
                        },
                    }),
                },
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
