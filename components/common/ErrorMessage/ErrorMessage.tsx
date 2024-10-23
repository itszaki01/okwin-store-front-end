import { Group, Text } from "@mantine/core";
import IconAlertCircle from "../../ui/icons/IconAlertCircle";

export default function ErrorMessage({ error }: { error: string }) {
    return (
        <Group bg={"red"} style={{ borderRadius: 12 }} p={10} align="flex-start">
            {" "}
            <IconAlertCircle w={35} h={35} />{" "}
            <Text fw={700} fz={18} c={"white"}>
                {error}
            </Text>
        </Group>
    );
}
