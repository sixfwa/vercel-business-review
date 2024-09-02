"use client";

import { type FunctionComponent } from "react";
import { type Schema } from "@/gql";
import { CmsLink } from "@/components/shared/cms_link";

export type MenuItemProps = {
  menuList:
    | Schema.NavigationMenuBlockDataFragment
    | Schema.CardBlockDataFragment;
} & JSX.IntrinsicElements["div"];

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  menuList,
  ...props
}) => {
  if (menuList.__typename === "NavigationMenuBlock") {
    return (
      <div {...props}>
        {menuList.title && (
          <h3 className="text-[16px] font-semibold uppercase tracking-[1px] mb-5">
            {menuList.title}
          </h3>
        )}
        {menuList.items && (
          <ul className="grid gap-5">
            {menuList.items.map((menuItem: any) => {
              return (
                <li key={menuItem.text}>
                  <CmsLink
                    className="hover:text-azure focus:text-azure"
                    href={menuItem}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
  if (menuList.__typename === "CardBlock") {
    return <div className="col-span-2 flex justify-end"></div>;
  }
};

export default MenuItem;
