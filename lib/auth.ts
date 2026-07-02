import { cookies } from "next/headers";

const COOKIE_NAME = "cache_management";

export async function getToken() {
    const cookieStore = await cookies();
    cookieStore.get(COOKIE_NAME);
}

export async function setToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
    });
}

