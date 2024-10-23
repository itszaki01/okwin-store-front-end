import { Drawer, Stack, Divider, Accordion, Text } from "@mantine/core";
import { Fragment, ReactNode, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import NavSearchInput from "../components/NavBar/NavSearchInput/NavSearchInput";
import { useStoreSettingsSlice } from "../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useDisclosure } from "@mantine/hooks";

interface IMenuDrawerContext {
    openMenuDrawer: () => void;
    closeMenuDrawer: () => void;
}

const MenuDrawerContext = createContext<IMenuDrawerContext>({} as IMenuDrawerContext);

export default function MenuDrawerContextProvider({ children }: { children: ReactNode }) {
    const {
        appearance: { navLinks },
    } = useStoreSettingsSlice();
    const [opened, { open: openMenuDrawer, close: closeMenuDrawer }] = useDisclosure();
    return (
        <MenuDrawerContext.Provider value={{ openMenuDrawer, closeMenuDrawer }}>
            <Drawer dir="rtl" size={"xs"} position={"left"} opened={opened} onClose={closeMenuDrawer}>
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
                                            closeMenuDrawer();
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
                                <Accordion key={idx}>
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
                                                    <Fragment key={idx2}>
                                                        <Text
                                                            pr={20}
                                                            component={Link}
                                                            onClick={() => {
                                                                neastedLink.scrollToTop && scrollTo(0, 0);
                                                                closeMenuDrawer();
                                                            }}
                                                            to={neastedLink.toLink}
                                                            fz={20}
                                                            fw={700}
                                                            target={neastedLink.openInNewTab ? "_blank" : ""}
                                                        >
                                                            {neastedLink.linkName}
                                                        </Text>
                                                    </Fragment>
                                                ))}
                                            </Stack>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                </Accordion>
                            );
                        }
                    })}
                </Stack>
            </Drawer>
            {children}
        </MenuDrawerContext.Provider>
    );
}

export const useMenuDrawerContext = () => useContext(MenuDrawerContext);
