import { Accordion, Divider, Drawer, Stack, Text } from "@mantine/core";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { Link } from "react-router-dom";
import NavSearchInput from "../NavSearchInput/NavSearchInput";
import { Fragment } from "react/jsx-runtime";

interface IProps {
    opened: boolean;
    close: () => void;
}
export default function MenuDrawer({ opened, close }: IProps) {
    const {
        appearance: { navLinks },
    } = useStoreSettingsSlice();
    return (
        <Drawer dir="rtl" size={"xs"} position={"left"} opened={opened} onClose={close}>
            <Stack>
                <NavSearchInput />
                {navLinks.map((navLink, idx) => {
                    if (navLink.neastedLinks.length === 0) {
                        return (
                            <Fragment key={idx}>
                                <Text
                                    component={Link}
                                    onClick={() => {
                                        navLink.scrollToTop && scrollTo(0, 0);
                                        close();
                                    }}
                                    to={navLink.toLink}
                                    fz={22}
                                    fw={700}
                                    pr={20}
                                    target={navLink.openInNewTab ? "_blank" : ""}
                                >
                                    {navLink.linkName}
                                </Text>
                                <Divider w={"100%"} />
                            </Fragment>
                        );
                    } else {
                        return (
                            <>
                                <Accordion>
                                    <Accordion.Item key={idx} value="links">
                                        <Accordion.Control>
                                            {" "}
                                            <Text key={idx} fz={22} fw={700}>
                                                {navLink.linkName}
                                            </Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Stack>
                                                {navLink.neastedLinks.map((neastedLink, idx2) => (
                                                    <>
                                                        <Text
                                                            pr={20}
                                                            key={idx2}
                                                            component={Link}
                                                            onClick={() => {
                                                                neastedLink.scrollToTop && scrollTo(0, 0);
                                                                close();
                                                            }}
                                                            to={neastedLink.toLink}
                                                            fz={20}
                                                            fw={700}
                                                            target={neastedLink.openInNewTab ? "_blank" : ""}
                                                        >
                                                            {neastedLink.linkName}
                                                        </Text>
                                                    </>
                                                ))}
                                            </Stack>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                </Accordion>
                            </>
                        );
                    }
                })}
            </Stack>
        </Drawer>
    );
}
