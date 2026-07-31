"use server";
import { ApiError, apiClient } from "@/lib/api";
import { deleteToken, setToken } from "@/lib/auth";
import { LoginResponse, User } from "@/lib/types";
import { redirect } from "next/navigation";
export async function registerFormAction(
  prevState: { success: boolean; message: string; redirectTo?: string } | null,
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
      success: true,
      message: "User registered successfully!",
      redirectTo: "/login",
    };
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        redirectTo: "/register",
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        redirectTo: "/register",
      };
    }

    return {
      success: false,
      message: "An unknown error occurred.",
      redirectTo: "/register",
    };
  }
}

export async function loginAction(
  prevState: {
    success: boolean;
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
      success: true,
      message: "User logged with successfully!",
      redirectTo: "/dashboard",
    };
  } catch (error: unknown) {
    console.error("Erro no login:", error);

    // Verifica se o erro veio da API e se é de credenciais (ex: 401 Unauthorized)
    if (error instanceof ApiError && error.status === 401) {
      return {
        success: false,
        message: "Email ou Senha inválido!",
      };
    }

    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
      };
    }

    // Se não foi erro 401, caiu no erro genérico (Servidor fora, timeout, etc)
    return {
      success: false,
      message:
        "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    };
  }
}

export async function logOut() {
  await deleteToken();
  redirect("/login");
}
