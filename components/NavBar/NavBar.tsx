import { ActionIcon, Badge, Box, Group, Menu, Text } from "@mantine/core";
import IconCart from "../ui/icons/IconCart";
import { Link } from "react-router-dom";
import { useStoreSettingsSlice } from "../../redux/features/storeSettingsSlice/storeSettingsSlice";
import { useDevicesContext } from "../../contexts/DevicesContext";
import IconMenu from "../ui/icons/IconMenu";
import Logo from "../common/Logo/Logo";
import IconLeftArrow from "../ui/icons/IconLeftArrow";
import { useCartDrawerContext } from "../../contexts/CartDrawerContext";
import { useOrderFormContext } from "../../contexts/OrderFormContext";
import NavSearchInput from "./NavSearchInput/NavSearchInput";
import { useMenuDrawerContext } from "../../contexts/MenuDrawerContext";

export default function NavBar() {
    const { isSmallScreen } = useDevicesContext();
    const { closeCartDrawer, openCartDrawer } = useCartDrawerContext();
    const { openMenuDrawer, closeMenuDrawer } = useMenuDrawerContext();
    const {
        appearance: { themeColor },
    } = useStoreSettingsSlice();

    const {
        form: { watch },
    } = useOrderFormContext();

    const {
        appearance: { navLinks, themeNavBarBg, themeNavBarTextColor },
    } = useStoreSettingsSlice();

    return (
        <Box className="nav-bar" bg={themeNavBarBg}>
            <Group px={"sm"} m={"auto"} maw={1000} w={"100%"} justify="space-between" h={74}>
                <Logo />

                {isSmallScreen ? (
                    <>
                        <Group gap={5} align="center" pos={"relative"}>
                            {watch("orderedProducts")?.length > 0 && (
                                <Badge pos={"absolute"} top={-8} right={-13} color={themeColor} circle>
                                    {" "}
                                    {watch("orderedProducts")?.length}
                                </Badge>
                            )}
                            <ActionIcon
                                variant="transparent"
                                onClick={() => {
                                    openCartDrawer();
                                    closeMenuDrawer();
                                }}
                            >
                                <IconCart color={themeNavBarTextColor} />
                            </ActionIcon>

                            <ActionIcon
                                variant="transparent"
                                onClick={() => {
                                    openMenuDrawer();
                                    closeCartDrawer();
                                }}
                            >
                                <IconMenu color={themeNavBarTextColor} />
                            </ActionIcon>
                        </Group>
                    </>
                ) : (
                    <>
                        <Group>
                            {navLinks.map((link,idx) => (
                                <Group key={idx} gap={0}>
                                    {link.neastedLinks.length === 0 ? (
                                        <>
                                            <Text
                                                c={themeNavBarTextColor}
                                                component={Link}
                                                fz={18}
                                                fw={600}
                                                to={link.toLink}
                                                onClick={() => link.scrollToTop && scrollTo(0, 0)}
                                                target={link.openInNewTab ? "_blank" : "_self"}
                                            >
                                                {link.linkName}
                                            </Text>
                                        </>
                                    ) : (
                                        <Menu>
                                            <Menu.Target>
                                                <Group gap={0}>
                                                    <Text style={{ cursor: "pointer" }} c={themeNavBarTextColor} fz={18} fw={600}>
                                                        {link.linkName}
                                                    </Text>
                                                    <ActionIcon variant="transparent">
                                                        <IconLeftArrow w={15} color={themeNavBarTextColor} />
                                                    </ActionIcon>
                                                </Group>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                {link.neastedLinks.map((neastedLink,idx2) => (
                                                    <Menu.Item
                                                        fz={16}
                                                        fw={600}
                                                        key={idx2}
                                                        component={Link}
                                                        to={neastedLink.toLink}
                                                        onClick={() => neastedLink.scrollToTop && scrollTo(0, 0)}
                                                        target={neastedLink.openInNewTab ? "_blank" : "_self"}
                                                    >
                                                        {neastedLink.linkName}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Dropdown>
                                        </Menu>
                                    )}
                                </Group>
                            ))}
                        </Group>
                        <Group>
                            <NavSearchInput />

                            <Box pos={"relative"}>
                                {watch("orderedProducts")?.length > 0 && (
                                    <Badge pos={"absolute"} top={-8} right={-13} color={themeColor} circle>
                                        {" "}
                                        {watch("orderedProducts")?.length}
                                    </Badge>
                                )}
                                <ActionIcon variant="transparent" onClick={openCartDrawer}>
                                    <IconCart color={themeNavBarTextColor} />
                                </ActionIcon>
                            </Box>
                        </Group>
                    </>
                )}
            </Group>
        </Box>
    );
}
