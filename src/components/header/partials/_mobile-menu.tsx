import { useContext } from "react";
import { HeaderContext } from "../_header";
import { type NavigationMenuBlockDataFragment } from "@/gql/graphql";
import { CmsLink as Link, createListKey } from "@/components/shared/cms_link";

function applyFilter<T>(input?: T | null): input is T {
  return input ? true : false;
}

export default function MobileMenu() {
  const { currentMenu, setCurrentMenu, menuItems, mobileMenuOpen } =
    useContext(HeaderContext);

  if (!mobileMenuOpen) return null; // Don't render if its not open.

  function handleMenuToggle(menuName: string) {
    if (currentMenu === menuName) {
      setCurrentMenu("");
    } else {
      setCurrentMenu(menuName);
    }
  }

  return (
    <section className="absolute pt-10 pb-20 z-50 top-[88px] left-0 bg-ghost-white w-full outer-padding shadow-[0_14px_4px_6px_rgba(0,0,0,0.1)] dark:bg-vulcan-85">
      <div className="container mx-auto grid">
        <ul>
          {menuItems.map(
            ({ menuName, menuData }) =>
              menuName && (
                <li key={menuName}>
                  <button
                    className={`hover:text-azure focus:text-azure font-semibold text-[18px] py-6 text-left border-t mt-[-1px] w-full flex justify-between ${
                      currentMenu === menuName ? "" : "border-b"
                    }`}
                    onClick={() => handleMenuToggle(menuName)}
                  >
                    <span>{menuName}</span>
                    <span>{currentMenu === menuName ? "–" : "+"}</span>
                  </button>
                  {currentMenu === menuName && menuData && (
                    <ul className="mb-16">
                      {menuData.filter(applyFilter).map((menuDataItem) => {
                        const { title, items } =
                          menuDataItem as NavigationMenuBlockDataFragment;
                        return (
                          <li key={title} className="mt-10">
                            {title ? (
                              <h3 className="text-[16px] font-semibold uppercase tracking-[1px]">
                                {title}
                              </h3>
                            ) : null}
                            {items && (
                              <ul className="grid gap-5">
                                {items.map(
                                  (menuItem) =>
                                    menuItem && (
                                      <li key={createListKey(menuItem)}>
                                        <Link
                                          className="hover:text-azure focus:text-azure"
                                          href={menuItem}
                                        />
                                      </li>
                                    )
                                )}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              )
          )}
        </ul>
      </div>
    </section>
  );
}
