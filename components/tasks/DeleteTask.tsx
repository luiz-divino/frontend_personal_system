"use client";
import { Trash2 } from "lucide-react";
import { DeleteTaskAction } from "@/app/actions/task";
import { Button } from "../ui/button";

export interface props {
  taskId: string;
}

export function DeleteTask({ taskId }: props) {
  function handleDeleteTask() {
    DeleteTaskAction(taskId);
  }

  return (
    <>
      <div className="flex">
        <Button
          className={"flex gap-2 w-full items-center"}
          onClick={handleDeleteTask}
          type="button"
        >
          <Trash2 className="w-5 h-5" />
          <p>Deletar Tarefa</p>
        </Button>
      </div>
    </>
  );
}
