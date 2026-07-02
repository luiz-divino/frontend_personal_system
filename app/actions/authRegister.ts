"use server";
import { apiClient } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { LoginResponse, User } from "@/lib/types";
export async function registerFormAction(
    prevState: { sucess: boolean; message: string; redirectTo?: string } | null,
    formData: FormData,
) {
    console.log("registerFormAction", prevState, formData);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const data = {
            name: name,
            email: email,
            password: password,
        };

        await apiClient<User>("/users", {
            method: "POST",
            body: JSON.stringify(data),
        });

        return {
            sucess: true,
            message: "User registered successfully!",
            redirectTo: "/login",
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                sucess: false,
                message: error.message,
                redirectTo: "/register",
            };
        }

        return {
            sucess: false,
            message: "An unknown error occurred.",
            redirectTo: "/register",
        };
    }
}

export async function loginAction(
    prevState: {
        sucess: boolean;
        message: string;
        redirectTo?: string;
    } | null,
    formData: FormData,
) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const dataLogin = {
            email: email,
            password: password,
        };
        const userResponse = await apiClient<LoginResponse>("/session", {
            method: "POST",
            body: JSON.stringify(dataLogin),
        });
        await setToken(userResponse.userLogin.token);

        return {
            sucess: true,
            message: "User logged with successfully!",
            redirectTo: "/dashboard",
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                sucess: false,
                message: error.message,
            };
        }
        return {
            sucess: false,
            message: "Invalid email or password.",
        };
    }
}
