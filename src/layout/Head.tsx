import {
  Avatar,
  Card,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  Spacer,
  Box,
  Icon,
  Heading,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "@chakra-ui/icons";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import useUserInfo from "@/hooks/useUserInfo";

const Head: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useUserInfo();

  return (
    <>
      <Card borderRadius="">
        <Flex
          height="60px"
          alignItems="center"
          justifyContent="space-between"
          padding="0 24px"
        >
          <Heading as="h6" size="md">
            图床
          </Heading>

          <Flex alignItems="center">
            <Icon
              as={colorMode === "light" ? MoonIcon : SunIcon}
              onClick={toggleColorMode}
              mr={30}
            />
            <Menu>
              <MenuButton>
                <Avatar
                  userSelect="none"
                  name="Oshigaki Kisame"
                  src="https://img.djwl.top/other/1681200031.jpg"
                />
              </MenuButton>
              <MenuList>
                <MenuItem icon={<SettingsIcon />}>设置</MenuItem>
                <MenuItem icon={<ExternalLinkIcon />}>退出</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Card>
      <Outlet />
    </>
  );
};
export default Head;
