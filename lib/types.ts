export interface User {
    name: string;
    email: string;
    password: string;
    createdAt: string;
}

export interface LoginResponse {
    id: string;
    name: string;
    email: string;
    token: string;
}
