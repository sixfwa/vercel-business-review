"use client";

import { createContext, useRef, useState } from "react";
import MainMenu from "./partials/_main-menu";
import {
  type HeaderContextType,
  type MenuItems,
  type UtilityItems,
} from "./types/headerTypes";
import { type Maybe, type ReferenceDataFragment } from "@/gql/graphql";
import { extractLabel } from "@/labels/client";
import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("./partials/_mobile-menu"), {
  ssr: false,
});

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
  labels?: Record<string, string>;
};

/**
 * Renders the Header component with a specific locale.
 *
 * @return the rendered Header component
 */
export default function Header({
  menuItems,
  utilityItems,
  labels = {},
}: HeaderProps) {
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
          <div className="lg:hidden">
            <button
              className="btn btn--secondary ml-[10px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="btn__content">
                {mobileMenuOpen
                  ? extractLabel(labels, "close", { fallback: "CLOSE" })
                  : extractLabel(labels, "menu", { fallback: "MENU" })}
              </div>
            </button>
            {mobileMenuOpen && <MobileMenu />}
          </div>

          <div className="hidden justify-between grow lg:flex">
            <MainMenu />
          </div>
        </div>
      </header>
    </HeaderContext.Provider>
  );
}
