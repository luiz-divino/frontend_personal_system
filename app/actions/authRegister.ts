"use server";
import { apiClient } from "@/lib/api";
import { User } from "@/lib/types";
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

        return { sucess: true, message: "User registered successfully!", redirectTo: "/login" };
    } catch (error) {
        if (error instanceof Error) {
            return { sucess: false, message: error.message, redirectTo: "/register" };
        }

        return { sucess: false, message: "An unknown error occurred.", redirectTo: "/register" };
    }
}
