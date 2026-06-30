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
import { useActionState, useEffect } from "react";
import { registerFormAction } from "@/app/actions/authRegister";
import { useRouter } from "next/navigation";

export function RegisterForm() {
    const router = useRouter();
    const [state, formAction, isLoading] = useActionState(
        registerFormAction,
        null,
    );

    useEffect(() => {
        if (state?.sucess && state.redirectTo) {
            router.push(state.redirectTo);
        }
    }, [state, router]);
    return (
        <Card className="w-full max-w-md text-center mx-auto bg-card-register ">
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
                            className="bg-input-register text-amber-50 placeholder:text-input-text-register"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Digite seu nome..."
                            minLength={3}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className="bg-input-register text-amber-50 placeholder:text-input-text-register"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            className="bg-input-register text-amber-50 placeholder:text-input-text-register"
                            id="password"
                            name="password"
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
                        {isLoading ? `Registrando...` : "Cadastrar"}
                    </Button>

                    <p className="text-amber-50">
                        Já tem uma conta?{" "}
                        <Link
                            href="/login"
                            className="text-text-register font-bold"
                        >
                            Faça Login
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
