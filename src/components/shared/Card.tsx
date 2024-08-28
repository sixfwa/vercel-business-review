import { type PropsWithChildren } from "react";

type AllowedElements = keyof Omit<JSX.IntrinsicElements, "svg">;
export type CardProps<E extends AllowedElements> = PropsWithChildren<
  {
    as?: E;
    cardColor?: keyof typeof OuterColors;
    innerClassName?: string;
    direction?: keyof typeof ContentDirections;
    roundedCorners?: keyof typeof CornerOptions;
    withHoverEffect?: boolean;
  } & Omit<JSX.IntrinsicElements[E], "children">
>;

const OuterColors = {
  white: "bg-white dark:bg-vulcan-85 border-[2px]",
  blue: "bg-azure dark:bg-transparent dark:border-azure dark:border-4",
  dark_blue: "bg-vulcan dark:bg-vulcan-85",
  orange: "bg-tangy dark:bg-transparent dark:border-tangy dark:border-4",
  green: "bg-verdansk dark:bg-transparent dark:border-verdansk dark:border-4",
  red: "bg-paleruby dark:bg-transparent dark:border-paleruby dark:border-4",
  purple:
    "bg-people-eater dark:bg-transparent dark:border-people-eater dark:border-4",
};

const InnerColors: { [key in keyof typeof OuterColors]: string } = {
  white:
    "text-vulcan dark:text-ghost-white prose-figcaption:text-vulcan-85 prose-blockquote:text-vulcan dark:prose-figcaption:text-ghost-white dark:prose-blockquote:text-ghost-white",
  blue: "text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white",
  dark_blue:
    "text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white",
  orange:
    "text-vulcan prose-blockquote:text-vulcan prose-figcaption:text-vulcan dark:text-ghost-white dark:prose-blockquote:text-ghost-white dark:prose-figcaption:text-ghost-white",
  green:
    "text-vulcan prose-blockquote:text-vulcan prose-figcaption:text-vulcan dark:text-ghost-white dark:prose-blockquote:text-ghost-white dark:prose-figcaption:text-ghost-white",
  red: "text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white",
  purple:
    "text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white",
};

const ContentDirections = {
  none: "",
  row: "flex flex-col @[75rem]/card:flex-row flex-nowrap justify-stretch",
  row_small_reversed:
    "flex flex-col-reverse @[75rem]/card:flex-row flex-nowrap justify-stretch",
  row_reversed:
    "flex flex-col-reverse @[75rem]/card:flex-row-reverse flex-nowrap justify-stretch",
  col: "flex flex-col justify-stretch",
  col_reversed: "flex flex-col-reverse justify-stretch",
};

const CornerOptions = {
  none: "",
  small: "rounded-[20px] before:rounded-[20px]",
  large: "rounded-[40px] before:rounded-[40px]",
};

const InnerCornerOptions: { [key in keyof typeof CornerOptions]: string } = {
  none: "",
  small: "rounded-[20px]",
  large: "rounded-[40px]",
};

export type ColorOptions = keyof typeof OuterColors;
export type DirectionOptions = keyof typeof ContentDirections;
export type CornerOptions = keyof typeof CornerOptions;

export const Card = <E extends AllowedElements>({
  as: htmlElement,
  cardColor = "white",
  children,
  className = "",
  innerClassName = "",
  direction = "none",

  withHoverEffect: withHover = false,
  ...props
}: CardProps<E>) => {
  const innerClasses: string = InnerColors[cardColor];
  const directonClasses: string = ContentDirections[direction];
  const baseContainerClasses: string = "p-5";
  const baseInnerClasses: string = "max-w-none gap-4 lg:gap-8 ";

  type ActualElement = typeof htmlElement extends keyof JSX.IntrinsicElements
    ? E
    : "div";
  const ContainerElement = (htmlElement ? htmlElement : "div") as ActualElement;
  const innerContainer = (
    <div
      className={[
        directonClasses,
        baseInnerClasses,
        innerClasses,
        innerClassName,
        className,
      ]
        .filter((x) => x && x.length > 0)
        .join(" ")}
    >
      {children}
    </div>
  );

  return (
    <ContainerElement {...(props as any)}>
      {withHover ? (
        <div
          className={[
            baseContainerClasses,
            OuterColors[cardColor],
            "w-full h-full border-none",
          ].join(" ")}
        >
          {innerContainer}
        </div>
      ) : (
        innerContainer
      )}
    </ContainerElement>
  );
};
Card.displayName = "Card Component";

export default Card;
