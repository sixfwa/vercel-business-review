import { useContext, type FunctionComponent } from "react";
import { HeaderContext } from "../_header";
import Link from "next/link";

export const MainMenu: FunctionComponent<{}> = () => {
  const { menuItems } = useContext(HeaderContext);
  return (
    <nav className="flex flex-row w-full justify-between place-items-center">
      <Link href={"/"} className="font-bold text-3xl tracking-tight opacity-50">
        Vercel Business Review
      </Link>
      <div className="flex flex-row gap-10 text-2xl">
        {menuItems.map((navigationItem) => {
          return (
            <Link
              // @ts-ignore
              key={navigationItem.menuLink!.hierarchical}
              // @ts-ignore
              href={navigationItem.menuLink!.hierarchical}
            >
              {navigationItem.menuName}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MainMenu;
