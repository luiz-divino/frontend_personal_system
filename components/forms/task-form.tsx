"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { formTaskAction } from "@/app/actions/authRegister";

export function TaskForm() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center text-app-card bg-text-register p-3 rounded-md gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="rounded-3xl font-bold gap-2 flex justify-center items-center">
          <Plus className="w-7 h-7" />
          <h1 className="hidden sm:flex">adicionar tarefa</h1>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"font-bold"}>
              ADICIONAR NOVA TAREFA
            </DialogTitle>
          </DialogHeader>

          <div>
            <form
              action={formTaskAction}
              className="flex flex-col gap-3 space-y-2"
            >
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

              <Button type="submit">Adicionar</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
