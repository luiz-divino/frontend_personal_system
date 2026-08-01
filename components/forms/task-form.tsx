"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Download, Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormTaskAction } from "@/app/actions/task";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";

const initialState = { success: false, message: "" };

export function TaskForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    FormTaskAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      window.setTimeout(() => setOpen(false), 0);
      toast.add({
        type: "success",
        description: "Despesa criada com sucesso!",
      });
    }
  }, [router, state.success]);
  return (
    <div className="flex items-end justify-center gap-2 pr-2 md:p-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className=" text-app-background bg-text-register font-bold gap-2 flex justify-center items-center hover:bg-emerald-500 hover:rounded-full transition-all duration-300 hover:scale-105"
          render={
            <Button>
              <Plus className="w-7 h-7" />
              <h1 className="hidden text-md sm:flex">Adicionar Tarefa</h1>
            </Button>
          }
        />

        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"font-bold"}>
              ADICIONAR NOVA TAREFA
            </DialogTitle>
          </DialogHeader>

          <div>
            <form action={formAction} className="flex flex-col gap-3 space-y-2">
              <div className="space-y-2">
                <Label htmlFor="title">titulo</Label>
                <Input
                  alt="input para add task"
                  placeholder="Digite o titulo da tarefa"
                  id="title"
                  name="title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">descrição</Label>
                <Input
                  alt="input para add task"
                  placeholder="adicione uma descrição"
                  id="description"
                  name="description"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {/* 3. Troca de Input para Select nativo para garantir segurança dos dados */}
                <select
                  id="status"
                  name="status"
                  className="flex h-10 w-full rounded-md border border-app-card bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="PENDING">Pendente</option>
                  <option value="ACTIVE">Em Andamento</option>
                  <option value="DONE">Concluída</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="priority">Prioridade</Label>
                <select
                  id="priority"
                  name="priority"
                  className="flex h-10 w-full rounded-md border border-app-card bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="LOW">Baixa</option>
                  <option value="MEDIUM">Média</option>
                  <option value="HIGH">Alta</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadLine">Data</Label>
                <Input
                  alt="input para add task"
                  id="deadLine"
                  name="deadLine"
                  type="date"
                />
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
