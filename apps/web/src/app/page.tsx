import { Button } from "@snake/ui/button";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button children="Teste" appName="botão" />
    </div>
  );
}
