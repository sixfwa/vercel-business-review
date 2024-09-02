"use client";

import { createContext, useRef, useState } from "react";
import MainMenu from "./partials/_main-menu";
import {
  type HeaderContextType,
  type MenuItems,
  type UtilityItems,
} from "./types/headerTypes";
import { type Maybe, type ReferenceDataFragment } from "@/gql/graphql";

export const HeaderContext = createContext<HeaderContextType>({
  menuItems: [],
  utilityItems: [],
  currentMenu: "",
  setCurrentMenu: (name: string) => {},
  mobileMenuOpen: false,
});

type HeaderProps = {
  logoItem?: Maybe<ReferenceDataFragment>;
  darkLogoItem?: Maybe<ReferenceDataFragment>;
  menuItems: MenuItems;
  utilityItems: UtilityItems;
};

/**
 * Renders the Header component with a specific locale.
 *
 * @return the rendered Header component
 */
export default function Header({ menuItems, utilityItems }: HeaderProps) {
  const [currentMenu, setCurrentMenu] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerContext = {
    menuItems,
    utilityItems,
    currentMenu,
    setCurrentMenu,
    mobileMenuOpen,
  };

  return (
    <HeaderContext.Provider value={headerContext}>
      <header className="bg-white">
        <div className="py-8 mx-auto flex items-center w-full justify-between lg:justify-normal">
          <div className="justify-between grow lg:flex">
            <MainMenu />
          </div>
        </div>
      </header>
    </HeaderContext.Provider>
  );
}
