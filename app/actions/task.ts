"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Task } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function UpdateTaskAction(
  taskId: string,
  prevState: { success: boolean; message: string } | null,
  formData: FormData,
) {
  try {
    const token = await getToken();
    if (!token) throw new Error("NÃO AUTORIZADO");
    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "deadLine",
    ];
    const data: Record<string, string> = {};

    for (const field of allowedFields) {
      const value = formData.get(field) as string;

      if (value && value.trim() != "") {
        data[field] = value;
      }
    }

    console.log(data);

    await apiClient<Task>(`/tasks/${taskId}`, {
      method: "PATCH",
      token: token as string,
      body: JSON.stringify(data),
    });

    revalidatePath("/dashboard/tasks");
    return {
      success: true,
      message: "Tarefa Atualizada com Sucesso!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao Atualizar Tarefa",
    };
  }
}

export async function DeleteTaskAction(taskId: string) {
  try {
    const token = await getToken();
    const endpoint = `/tasks/${taskId}`;
    await apiClient(endpoint, {
      method: "DELETE",
      token: token as string,
    });

    revalidatePath("/dashboard/tasks");
    return {
      success: true,
      message: "Tarefa Deletada com Sucesso!",
    };
  } catch (error) {
    console.error(error, "ERRO AO DELETAR TAREFA");
  }
}

export async function formTaskAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;
  const priority = formData.get("priority") as string;
  const deadline = formData.get("deadLine");

  console.log(formData);

  try {
    const data = {
      title: title,
      description: description,
      status: status,
      priority: priority,
      deadLine: deadline,
    };

    const token = await getToken();
    await apiClient("/tasks", {
      token: token as string,
      method: "POST",
      body: JSON.stringify(data),
    });
    revalidatePath("/dashboard/tasks");

    return;
  } catch (error) {
    console.log(error);
  }
}
