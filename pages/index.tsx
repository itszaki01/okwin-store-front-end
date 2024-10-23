import { DirectionProvider } from "@mantine/core";
import { useEffect } from "react";
import DevicesContextProvider from "../contexts/DevicesContext";
import { baseUrl } from "../redux/services/apiService/emptyApiSplit";
import { useGetCompanyDataQuery } from "../redux/services/companyApiService/companyApiService";
import { useGetStoreSettingsQuery } from "../redux/services/storeSettingsApiService/storeSettingsApiService";
import AppRouter from "../routes/AppRouter";
import AppThemeProvider from "./AppThemeProvider";


export default function Home() {
    const { isLoading: isGettingStoreSettings } = useGetStoreSettingsQuery();
    const { isLoading: isGettingCompanyData } = useGetCompanyDataQuery();

    useEffect(() => {
        (async () => {
            await fetch(`${baseUrl}/company-public/refresh`);
        })();

        setInterval(async () => await fetch(`${baseUrl}/company-public/refresh`), 9000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (isGettingStoreSettings || isGettingCompanyData) return <div style={{ width: "100vw", height: "100vh", background: "white" }}></div>;

    return (
        <DirectionProvider initialDirection="rtl">
            <DevicesContextProvider>
                <AppThemeProvider>
                    <AppRouter />
                </AppThemeProvider>
            </DevicesContextProvider>
        </DirectionProvider>
    );
}
