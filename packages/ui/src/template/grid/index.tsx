import { mergeClasseNames } from "@/util/merge-class-names";
import { ComponentProps } from "react";

interface GridProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
  column?: boolean;
  numCols?: number;
  numRows?: number;
}

export function Grid({
  children,
  className,
  numCols = 1,
  numRows = 1,
  column,
  ...rest
}: GridProps) {
  return (
    <div
      className={mergeClasseNames(
        `grid grid-rows-${numRows}`,
        { [`grid-cols-${numCols}`]: column },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
