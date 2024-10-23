import { Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IStorePageRES } from "../../@types/StorePages/StorePageRES";
import { useGetOneStorePageBySlugMutation } from "../../redux/services/storePagesApiService/storePagesApiService";
import MyLoader from "../../components/common/MyLoader/MyLoader";
import HtmlTextWrapper from "../../components/HtmlTextWrapper/HtmlTextWrapper";
import { useDocumentTitle } from "@mantine/hooks";

export default function Page() {
    const { pageSlug } = useParams() as { pageSlug: string | undefined };
    const { state: pageStateData } = useLocation() as { state: IStorePageRES | undefined };
    const [GetOneStorePage, { isLoading: isGettingStorePage }] = useGetOneStorePageBySlugMutation();
    const [storePageData, setStorePageData] = useState<IStorePageRES | undefined>(pageStateData);

    useEffect(() => setStorePageData(pageStateData), [pageStateData]);

    useEffect(() => {
        (async () => {
            try {
                if (!pageStateData && pageSlug) {
                    const pageData = await GetOneStorePage(pageSlug).unwrap();
                    setStorePageData(pageData.data);
                }
            } catch (error) {
                console.log("error");
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSlug, pageStateData]);

    useDocumentTitle(storePageData?.title || pageSlug || 'صفحة')
    return (
        <Stack w={"100%"} m={"auto"} maw={1000}>
            {!storePageData || isGettingStorePage ? (
                <MyLoader />
            ) : (
                <>
                    <Title mt={20} ta={"center"}>
                        {storePageData.title}
                    </Title>
                    <HtmlTextWrapper html={storePageData.body} />
                </>
            )}
        </Stack>
    );
}
