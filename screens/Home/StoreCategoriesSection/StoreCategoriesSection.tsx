import { Stack, Title, ScrollArea, Group, Skeleton } from "@mantine/core";
import { useGetAllCategoriesQuery } from "../../../redux/services/categoriesApiService/categoriesApiService";
import CategoryCard from "../../../components/common/CategoryCard/CategoryCard";

export default function StoreCategoriesSection() {
    const { data: categoriesData, isLoading: isGettingCategoriesData } = useGetAllCategoriesQuery();

    return (
        <Stack m={"auto"} maw={1000} w={"90vw"} align="center">
            {categoriesData?.data && categoriesData.data.length > 0 && <Title>تصفح عبر الفئات</Title>}
            <ScrollArea type="always" w={"100%"} pb={15}>
                {!categoriesData?.data || isGettingCategoriesData ? (
                    <Group>
                        {Array.from({ length: 8 }, (_, idx) => (
                            <Skeleton key={idx} w={102} h={125} />
                        ))}
                    </Group>
                ) : (
                    <>
                        {" "}
                        <Group w={"100%"} justify="center" align="flex-start" style={{ alignItems: "stretch" }}>
                            {categoriesData.data.map((category) => (
                                <CategoryCard key={category._id} categoryData={category} />
                            ))}
                        </Group>
                    </>
                )}
            </ScrollArea>
        </Stack>
    );
}
