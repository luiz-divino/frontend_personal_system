import { cookies } from "next/headers";
import { apiClient } from "./api";
import { User } from "./types";

const COOKIE_NAME = "cache_management";

export async function getToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) {
        return null;
    }
    return token;
}

export async function setToken(token: string): Promise<string> {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
    });
    return token;
}

export async function deleteToken(): Promise<void>{
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_NAME)
}

export async function getUser(): Promise<User | null> {
    const token = await getToken();
    if (!token) {
        return null;
    }

    try {
        const user = await apiClient<User>("/users/me", {
            token: token,
        });
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}
