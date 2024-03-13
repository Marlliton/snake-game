import { mergeClasseNames } from "@/util/merge-class-names";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export default function Page({ children, className }: PageProps) {
  return <div className={mergeClasseNames("w-full", className)}>{children}</div>;
}
