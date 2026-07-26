import { apiClient } from "./api";
import { getToken } from "./auth";
import { Task } from "./types";

export type TaskStatus = "PENDING" | "ACTIVE" | "DONE";

export interface TaskGetParams {
    status?: TaskStatus;
}

export async function getTasks({ status }: TaskGetParams): Promise<Task[]> {
    const token = await getToken();
    const queryParamns = new URLSearchParams();
    if (status) {
        queryParamns.append("status", status);
    }

    const endpoint = `/tasks?${queryParamns.toString()}`;
    const tasks = await apiClient<Task[]>(endpoint, {
        method: "GET",
        token: token as string,
    });
    return tasks;
}
