import { mergeClasseNames } from "@/util/merge-class-names";

interface WrapFullScreenProps {
  children: React.ReactNode;
  className?: string;
}

export function WrapFullScreen({ children, className }: WrapFullScreenProps) {
  return (
    <div className={mergeClasseNames("w-full h-screen relative overflow-hidden", className)}>
      {children}
    </div>
  );
}
