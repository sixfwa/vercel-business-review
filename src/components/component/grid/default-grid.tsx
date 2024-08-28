import { CmsLayoutComponent } from "@remkoj/optimizely-cms-react";
import { CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import type DefaultGridStyles from "./default.grid.opti-style.json";
import {
  type LayoutProps,
  extractSettings,
} from "@remkoj/optimizely-cms-react/components";

type DefaultGridLayout = LayoutProps<typeof DefaultGridStyles>;

export const DefaultGridComponent: CmsLayoutComponent<DefaultGridLayout> = ({
  contentLink,
  layoutProps,
  children,
}) => {
  let className = undefined;
  const { vSpacing = "default" } = extractSettings(layoutProps);

  switch (vSpacing) {
    case "small":
      className = className + " py-4 md:py-8 lg:py-12";
      break;
    case "large":
      className = className + " py-8 md:py-16 lg:py-24";
      break;
  }

  return (
    <CmsEditable
      as="div"
      className={`relative ${className} flex flex-col flex-nowrap justify-start`}
      cmsId={contentLink.key}
    >
      {children}
    </CmsEditable>
  );
};

export default DefaultGridComponent;
