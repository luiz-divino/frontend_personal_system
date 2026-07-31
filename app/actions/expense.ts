"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Expenses } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { parseToCentsForAPI } from "../utils/formatCurrency";

interface ExpensePayload {
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface ExpenseUpdatePayload {
  description?: string;
  amount?: number;
  date?: string;
  category?: string;
}

export async function expenseFormAction(
  prevState: {
    success: boolean;
    message: string;
  } | null,
  formData: FormData,
) {
  try {
    const token = await getToken();
    const description = String(formData.get("description") ?? "");
    const amount = String(formData.get("amount") ?? "");
    const date = String(formData.get("date") ?? "");
    const category = String(formData.get("category") ?? "");

    const data: ExpensePayload = {
      description,
      amount: parseToCentsForAPI(amount),
      date,
      category,
    };

    console.log(data);

    await apiClient("/expenses", {
      method: "POST",
      body: JSON.stringify(data),
      token: token as string,
    });
    revalidatePath("/dashboard/expenses");
    return {
      success: true,
      message: "Despeza Criada Com Sucesso!",
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("ERRO AO CRIAR DESPEZA");
    }
    return {
      success: false,
      message: "",
    };
  }
}

export async function getExpenses(limit?: number): Promise<Expenses[]> {
  const token = await getToken();

  const endpoint = limit ? `/expenses?limit=${limit}` : "/expenses";

  const expenses = await apiClient<Expenses[]>(endpoint, {
    method: "GET",
    token: token as string,
  });

  return expenses;
}

export async function updateExpenseAction(
  expenseId: string,
  prevState: {
    success: boolean;
    message: string;
  } | null,
  formData: FormData,
) {
  try {
    const token = await getToken();
    if (!token) throw new Error("NÃO AUTORIZADO");

    const description = String(formData.get("description") ?? "");
    const amount = String(formData.get("amount") ?? "");
    const date = String(formData.get("date") ?? "");
    const category = String(formData.get("category") ?? "");

    const data: ExpenseUpdatePayload = {};

    if (description.trim() !== "") {
      data.description = description;
    }

    if (amount.trim() !== "") {
      data.amount = parseToCentsForAPI(amount);
    }

    if (date.trim() !== "") {
      data.date = date;
    }

    if (category.trim() !== "") {
      data.category = category;
    }

    await apiClient<Expenses>(`/expenses/${expenseId}`, {
      method: "PATCH",
      token: token as string,
      body: JSON.stringify(data),
    });

    revalidatePath("/dashboard/expenses");

    return {
      success: true,
      message: "Despesa Atualizada com Sucesso!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao Atualizar Despesa",
    };
  }
}

export async function deleteExpenseAction(expenseId: string) {
  const token = await getToken();
  if (!token) throw new Error("NÃO AUTORIZADO");
  const endpoint = `/expenses/${expenseId}`;
  try {
    await apiClient(endpoint, {
      method: "DELETE",
      token: token as string,
    });

    return {
      message: "DESPEZA DELETADA COM SUCESSO",
    };
  } catch {
    throw new Error("Erro ao deletar despeza");
  }
}
