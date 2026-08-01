import { apiClient } from "./api";
import { getToken } from "./auth";
import { Task, TaskPriority } from "./types";

export type TaskStatus = "PENDING" | "ACTIVE" | "DONE";

export interface TaskGetQuerys {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
  page?: number;
  limit?: number;
}
export interface TaskGetParams {
  status?: TaskStatus;
}

export async function getTasks({ status }: TaskGetParams): Promise<Task[]> {
  const token = await getToken();
  const queryParams = new URLSearchParams();
  if (status) {
    queryParams.append("status", status);
  }

  const endpoint = `/tasks?${queryParams.toString()}`;
  const tasks = await apiClient<Task[]>(endpoint, {
    method: "GET",
    token: token as string,
  });
  return tasks;
}

export async function getTasksByQuery(params: TaskGetQuerys) {
  const token = await getToken();
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.set(key, String(value));
    }
  }
  const queryString = queryParams.toString();

  const endpoint = queryString ? `/tasks?${queryString}&limit=3` : `/tasks?limit=3`;
  const tasks = await apiClient<Task[]>(endpoint, {
    method: "GET",
    token: token as string,
  });
  return tasks;
}
