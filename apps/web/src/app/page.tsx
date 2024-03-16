import { Canvas } from "@/components/canvas";
import { Header } from "@/components/header";
import { Page } from "@snake/ui";
export default function Home() {
  return (
    <Page>
      <Header />
      <Canvas />
    </Page>
  );
}
