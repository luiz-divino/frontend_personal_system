"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { TaskStatus } from "@/lib/taskService";
import { TaskPriority } from "@/lib/types";
import { UpdateTaskAction } from "@/app/actions/task";
import { Textarea } from "../ui/textarea";
import { Field, FieldLabel } from "../ui/field";
import { DeleteTask } from "./DeleteTask";

export interface Props {
  task: {
    id: string;
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    deadLine?: string;
  };
}

const initialState = { success: false, message: "" };

export function UpdateTask({ task }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task.title ?? "");
  const [description, setDescription] = useState(task.description ?? "");
  const [status, setStatus] = useState(task.status ?? "");
  const [priority, setPriority] = useState(task.priority ?? "");
  const [deadLine, setDeadLine] = useState(task.deadLine ?? "");
  const router = useRouter();
  const updateTask = UpdateTaskAction.bind(null, task.id);
  const [state, formAction, isPending] = useActionState(
    updateTask,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      window.setTimeout(() => setOpen(false), 0);
    }
  }, [router, state.success]);

  return (
    <div className="flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <button className="p-2 hover:bg-bg-hover transition-colors duration-300 hover:animate-pulse rounded-full">
              <SquarePen className="flex w-7 h-7 " />
            </button>
          }
        />

        <DialogContent className={"w-11/12 sm:max-w-7xl "}>
          <DialogHeader>
            <DialogTitle>Edite uma Tarefa</DialogTitle>
            <DialogDescription>
              Faça alterações na sua tarefa aqui. Ao finalizar clique em salvar.
            </DialogDescription>
          </DialogHeader>

          <div className="gap-2">
            <form
              action={formAction}
              className="space-y-4 flex w-full flex-col overflow-x-hidden"
            >
              <div className="space-y-1">
                <Label htmlFor="title">Titulo</Label>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-app-card"
                />
              </div>

              <div className="space-y-1">
                <Field>
                  <FieldLabel htmlFor="description">Descrição</FieldLabel>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Type your message here."
                    className="break-all border border-app-card"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Field>
              </div>

              <div className="space-y-1">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-app-card bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="">Selecione um status</option>
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
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-app-card bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="">Selecione uma prioridade</option>
                  <option value="LOW">Baixa</option>
                  <option value="MEDIUM">Média</option>
                  <option value="HIGH">Alta</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="deadLine">Data Limite</Label>
                {/* Adicionado type="date" para melhor UX */}
                <Input
                  key={task?.id}
                  id="deadLine"
                  name="deadLine"
                  type="date"
                  value={deadLine}
                  onChange={(e) => setDeadLine(e.target.value)}
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
            <DeleteTask taskId={task.id} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
