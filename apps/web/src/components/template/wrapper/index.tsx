import { mergeClasseNames } from "@/util/merge-class-names";

interface WrapProps {
  children: React.ReactNode;
  className?: string;
}

export default function Wrap({ children, className }: WrapProps) {
  return (
    <div className={mergeClasseNames("w-full overflow-hidden relative", className)}>{children}</div>
  );
}
