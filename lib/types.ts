import { TaskStatus } from "./taskService";

export interface User {
    name: string;
    email: string;
    password: string;
    createdAt: string;
}

export interface LoginResponse {
    userLogin: {
        id: string;
        name: string;
        email: string;
        token: string;
    };
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadLine: string;
    createdAt: string;
    updatedAt: string;
}

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
