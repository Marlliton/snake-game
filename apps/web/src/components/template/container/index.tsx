import { mergeClasseNames } from "@/util/merge-class-names";

interface ContainerProps {
  children: React.ReactNode;
  bigPadding?: boolean;
  className?: string;
}

export default function Container({ children, className, bigPadding }: ContainerProps) {
  return (
    <div
      className={mergeClasseNames(
        "w-full h-full max-w-screen-xl mx-auto p-4",
        {
          "py-20": bigPadding,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
