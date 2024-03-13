import { mergeClasseNames } from "@/util/merge-class-names";
import { ComponentProps } from "react";

interface FlexProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  col?: boolean;
  row?: boolean;
}

export function Flex({ children, className, col, row, ...rest }: FlexProps) {
  const flexDirection = col ? "col" : row ? "row" : "row";
  return (
    <div
      className={mergeClasseNames(
        `flex flex-${flexDirection} justify-center items-center gap-2`,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
