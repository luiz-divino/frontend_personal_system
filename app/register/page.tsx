import { RegisterForm } from "@/components/forms/register-form";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { getUser } from "@/lib/auth";
import Image from "next/image";
import painel from "./../../public/management.png";
import { redirect } from "next/navigation";

export default async function Register() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-card-register p-4">
        <RegisterForm />
      </div>

      <Card className="hidden w-full md:flex flex-1 items-center justify-center bg-text-register select-none">
        <h1 className="text-5xl font-bold text-card-register">
          Seja Bem-vindo
        </h1>
        <CardDescription className="text-white font-Libertinus text-base font-semibold">
          Gerencie suas finanças, organize suas tarefas e acompanhe sua
          produtividade em um único lugar.
        </CardDescription>
        <CardContent>
          <Image
            className="rounded-xl"
            src={painel}
            width={500}
            height={500}
            quality={800}
            priority
            alt="Imagem referente a um painel adminstrativo animado"
          />
        </CardContent>
      </Card>
    </div>
  );
}
