"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Download, Ellipsis, EllipsisVertical, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { applyCurrencyMask } from "@/app/utils/formatCurrency";
import {
  deleteExpenseAction,
  updateExpenseAction,
} from "@/app/actions/expense";
import { toast } from "@/components/ui/toast";
import { CATEGORIES_DEFAULT } from "@/components/forms/expense-form";

interface Props {
  expense: {
    id: string;
    description?: string;
    amount?: number;
    date?: string;
    category?: string;
  };
}

const initialState = { success: false, message: "" };

export function UpdateExpense({ expense }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(expense.description ?? "");
  const [amount, setAmount] = useState(
    expense.amount ? applyCurrencyMask(expense.amount?.toString()) : "",
  );
  const [date, setDate] = useState(
    expense.date ? expense.date.split("T")[0] : "",
  );
  const [category, setCategory] = useState(expense.category ?? "");

  const updateExpense = updateExpenseAction.bind(null, expense.id);
  const [state, formAction, isPending] = useActionState(
    updateExpense,
    initialState,
  );

  function handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(applyCurrencyMask(String(e.target.value)));
  }

  async function handleDeleteExpense() {
    await deleteExpenseAction(expense.id);
    router.refresh();
    setOpen(false);
    toast.add({
      type: "success",
      description: "Despesa deletada com sucesso!",
    });
  }

  useEffect(() => {
    if (state.success) {
      router.refresh();
      window.setTimeout(() => setOpen(false), 0);
      toast.add({
        type: "success",
        description: "Despesa atualizada com sucesso!",
      });
    }
  }, [router, state.success]);

  return (
    <div className="flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <button className="duration-300 transform hover:scale-110 rounded-full">
              <p className="sr-only">Geral</p>
              <EllipsisVertical className="w-7 h-7 hidden md:flex" />
              <Ellipsis className="w-7 h-7 flex md:hidden" />
            </button>
          }
        />
        <DialogContent className={"w-11/12 sm:max-w-7xl"}>
          <DialogHeader>
            <DialogTitle>Edite uma Despesa</DialogTitle>
          </DialogHeader>

          <div className="gap-2">
            <form
              action={formAction}
              className="space-y-4 flex w-full flex-col overflow-x-hidden"
            >
              <div className="space-y-1">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-app-card"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={handleAmount}
                  className="border border-app-card"
                  type="text"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="category">Categoria</Label>
                <select
                  className="flex w-full rounded-md border border-app-card bg-background px-3 py-2 text-sm ring-offset-backgroun"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  id="category"
                >
                  <option value="" disabled>
                    Selecione uma categoria...
                  </option>
                  {CATEGORIES_DEFAULT.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-app-card"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full mt-4"
              >
                <Download className="w-5 h-5" />
                {isPending ? "Salvando..." : "Salvar alterações"}
              </Button>
            </form>
            <Button
              className={"w-full mt-3"}
              type="button"
              variant={"destructive"}
              onClick={handleDeleteExpense}
            >
              <Trash2 className="w-5 h-5" />
              Deletar despesa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
