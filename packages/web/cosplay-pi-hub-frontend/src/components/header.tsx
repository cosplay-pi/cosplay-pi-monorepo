import {
  Button,
  Link,
  Navbar,
} from "@nextui-org/react";
import { useRef } from "react";
import { AiFillBulb } from "react-icons/ai";
import { HiCloud } from "react-icons/hi2";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ThemeType,
  useThemeContext,
} from "../contexts/theme-context";
import { useActiveUserInfo } from "../hooks/use-active-user-info";

import { HeaderActiveUserMenu } from "./header-active-user-menu";
import { HeaderNoActiveUserMenu } from "./header-no-active-user-menu";

interface HeaderMainMenuItem {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function Header() {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    currentThemeType,
    useLightTheme,
    useDarkTheme,
  } = useThemeContext();

  const navbarToggleRef = useRef<HTMLButtonElement>(null);

  const { activeUserInfo } = useActiveUserInfo();

  const mainMenuItems: Array<HeaderMainMenuItem> = [];

  mainMenuItems.push({
    label: `Home`,
    isActive:
      location.pathname === `/`
      ||
      location.pathname === `/sign-in`,
    onClick: () => navigate(`/`),
  });

  if (activeUserInfo !== undefined) {

    mainMenuItems.push({
      label: `My Devices`,
      isActive: location.pathname.startsWith(`/my-devices`),
      onClick: () => navigate(`/my-devices`),
    });
  }

  mainMenuItems.push({
    label: `About`,
    isActive: location.pathname.startsWith(`/about`),
    onClick: () => navigate(`/about`),
  });

  return (
    <Navbar
      variant={`floating`}
    >
      <Navbar.Toggle
        ref={navbarToggleRef}
        css={{
          width: `$64`,
        }}
        showIn={`xs`}
      />
      <Navbar.Brand
        css={{
          '@xsMin': {
            width: `$64`,
          },
        }}
      >
        <HiCloud
          size={24}
        />
      </Navbar.Brand>
      <Navbar.Content
        variant={`underline-rounded`}
        hideIn={`xs`}
      >
        {
          mainMenuItems.map((menuItem) => (
            <Navbar.Link
              key={menuItem.label}
              isActive={menuItem.isActive}
              onClick={menuItem.onClick}
            >
              {menuItem.label}
            </Navbar.Link>
          ))
        }
      </Navbar.Content>
      <Navbar.Content
        css={{
          width: `$64`,
          jc: `flex-end`,
        }}
      >
        <Button
          auto
          flat
          icon={<AiFillBulb />}
          onClick={() => {

            if (currentThemeType === ThemeType.Dark) {

              useLightTheme();

            } else {

              useDarkTheme();
            }
          }}
        >

        </Button>
        {
          activeUserInfo === undefined
            ? <HeaderNoActiveUserMenu />
            : <HeaderActiveUserMenu />
        }
      </Navbar.Content>
      <Navbar.Collapse showIn={`xs`}>
        {
          mainMenuItems.map((menuItem) => (
            <Navbar.CollapseItem
              key={menuItem.label}
            >
              <Link
                onClick={() => {

                  menuItem.onClick();

                  navbarToggleRef.current?.click();
                }}
              >
                {menuItem.label}
              </Link>
            </Navbar.CollapseItem>
          ))
        }
      </Navbar.Collapse>
    </Navbar>
  );
}
