"use client";
import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Download, Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { expenseFormAction } from "@/app/actions/expense";
import { useRouter } from "next/navigation";
import { applyCurrencyMask } from "@/app/utils/formatCurrency";
import { toast } from "../ui/toast";

const initialState = { success: false, message: "" };
export const CATEGORIES_DEFAULT = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Educação",
  "Lazer",
  "Beleza",
  "Financeiro",
  "Outros",
];

export function ExpenseForm() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [state, formAction, isPending] = useActionState(
    expenseFormAction,
    initialState,
  );

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedValue = applyCurrencyMask(e.target.value);
    setAmount(formattedValue);
  }

  useEffect(() => {
    if (state.success) {
      router.refresh();
      window.setTimeout(() => setOpen(false), 0);
      toast.add({
        type: "success",
        description: "Despesa criada com sucesso!",
      });
    }
  }, [state.success, router]);

  return (
    <div className="flex items-end justify-center p-3 gap-2 ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className=" text-white bg-red-600 font-bold gap-2 flex justify-center items-center hover:bg-red-500 hover:rounded-full transition-all duration-300 hover:scale-105"
          render={
            <Button>
              <Plus className="w-7 h-7" />
              <h1 className="hidden text-md font-semibold sm:flex">Adicionar Nova Despesa</h1>
            </Button>
          }
        />

        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"font-bold"}>
              ADICIONAR NOVA DESPEZA
            </DialogTitle>
          </DialogHeader>

          <div>
            <form action={formAction} className="flex flex-col gap-3 space-y-2">
              <div className="space-y-1">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Faça anotações sobre esse gasto"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Digite o valor do gasto"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <select
                  className="flex w-full rounded-md border border-app-card bg-background px-3 py-2 text-sm ring-offset-backgroun"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  id="category"
                  required
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
                <Input type="date" id="date" name="date" />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className={"w-full mt-4"}
              >
                <Download className="w-5 h-5" />
                {isPending ? "Salvando..." : "Adicionar"}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
