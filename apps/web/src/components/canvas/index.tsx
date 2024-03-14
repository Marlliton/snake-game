import { Container, mergeClasseNames } from "@snake/ui";

interface CanvasProps {
  className?: string;
}

export function Canvas({ className }: CanvasProps) {
  return <Container className={mergeClasseNames(className)}>Canvas</Container>;
}
