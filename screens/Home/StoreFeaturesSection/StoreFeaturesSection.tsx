import {  Center, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useDevicesContext } from "../../../contexts/DevicesContext";

export default function StoreFeaturesSection() {
  const {isXsMobile,isMobile} = useDevicesContext()
    const {
        appearance: { storeFeaturesSection, themeColor },
    } = useStoreSettingsSlice();

    if (storeFeaturesSection.length === 0) return <></>;
    return (
        <Group  m={'auto'} wrap="wrap"  maw={1000} justify="center" align="flex-start">
            {storeFeaturesSection.map((feature,idx) => (
                <Stack key={idx} gap={7} maw={isXsMobile ? 170 :isMobile ? 180: 220} align="center" ta={"center"}>
                    <Center w={48} h={48} bg={themeColor} style={{ borderRadius: 50 }}>
                        <Image w={30} h={30} src={feature.iconLink} />
                    </Center>
                    <Title order={4}>{feature.title}</Title>
                    <Text  fw={500} fz={17}>
                        {feature.description}
                    </Text>
                </Stack>
            ))}
        </Group>
    );
}
