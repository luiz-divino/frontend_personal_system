"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState } from "react";
import { registerFormAction } from "@/app/actions/authRegister";
import { Spinner } from "../ui/spinner";

export function RegisterForm() {
  const [state, formAction, isLoading] = useActionState(registerFormAction, null);
  return (
    <Card className="w-full max-w-md text-center mx-auto bg-card-register">
      <CardHeader>
        <CardTitle className="text-text-register text-3xl sm:4xl">
          Personal Management
        </CardTitle>
        <CardDescription className="text-amber-50">
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              className="bg-input-register placeholder:text-input-text-register"
              id="name"
              type="text"
              placeholder="Digite seu nome..."
              minLength={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="bg-input-register placeholder:text-input-text-register"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="bg-input-register placeholder:text-input-text-register"
              id="password"
              type="password"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-text-register font-bold text-card-register hover:bg-text-register/90"
          >
            {
              isLoading ? `${<Spinner/>} Registrando...` : "Cadastrar" 
            }
          </Button>

          <p className="text-amber-50">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-text-register font-bold">
              Faça Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
