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
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/authRegister";

export function LoginForm() {
    const router = useRouter();
    const [state, formAction, isLoading] = useActionState(loginAction, null);

    useEffect(() => {
        if (state?.sucess && state.redirectTo) {
            router.replace(state.redirectTo);
        }
    }, [state, router]);
    return (
        <Card className="w-full max-w-md text-center mx-auto bg-card-register ">
            <CardHeader>
                <CardTitle className="text-text-register text-3xl sm:4xl">
                    Personal Management
                </CardTitle>
                <CardDescription className="text-amber-50">
                    Enter your email and password to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className="bg-input-register text-amber-50 placeholder:text-input-text-register"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="meuemail@example.com"
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
                        {isLoading ? `Entrando...` : "Entrar"}
                    </Button>

                    <p className="text-amber-50">
                        Não tem uma conta?{" "}
                        <Link
                            href="/register"
                            className="text-text-register font-bold"
                        >
                            Crie uma conta
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
