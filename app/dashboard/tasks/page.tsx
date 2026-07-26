import { TaskForm } from "@/components/forms/task-form";
import { Tags, Calendar } from "lucide-react";
import TasksFilter from "@/components/tasks/TaskFilter";
import { UpdateTask } from "@/components/tasks/UpdateTask";
import { Card } from "@/components/ui/card";
import { getTasks, TaskStatus } from "@/lib/taskService";
import {
  PRIORITY_UI,
  STATUS_UI,
  VALID_STATUSES,
} from "@/app/utils/task-mappings";
import { getUser } from "@/lib/auth";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function Tasks({ searchParams }: PageProps) {
  const statusConfig = STATUS_UI;
  const priorityConfig = PRIORITY_UI;
  const resolvedSearchParams = await searchParams;
  const rawStatus = resolvedSearchParams.status;
  const user = await getUser();

  const statusFilter = VALID_STATUSES.includes(rawStatus as TaskStatus)
    ? (rawStatus as TaskStatus)
    : undefined;
  const tasks = await getTasks({ status: statusFilter });

  return (
    <main className="min-h-dvh flex flex-col gap-6 relative">
      <Card className="flex flex-col items-center mt-6 mx-8 rounded-md bg-app-card sm:justify-between sm:flex-row">
        <div className="flex items-center justify-center sm:justify-between w-full mx-7">
          <div className="flex bg-app-card text-white rounded-md ">
            <h1 className="text-2xl font-mono md:text-4xl text-white font-bold md:px-4">
              Olá, <span className="text-text-register">{user?.name}</span>
            </h1>
          </div>
          <div className="fixed right-2 bottom-2 rounded-full sm:static flex items-center justify-center border border-gray-500 sm:rounded-md">
            <TaskForm />
          </div>
        </div>
      </Card>
      <section className="flex text-sm md:text-4xl font-mono mx-8 gap-1 items-center text-white">
        <h1>TOTAL DE TAREFAS</h1>
        <span>({tasks.length})</span>
      </section>

      <section className=" mx-4 flex items-center justify-center">
        <TasksFilter />
      </section>

      <div className="grid grid-cols-1 mx-4">
        {tasks.length !== 0
          ? tasks.map((task) => {
              const dataFormatada = task.deadLine
                ? task.deadLine.split("T")[0].split("-").reverse().join("/")
                : "Sem data";
              return (
                <Card
                  key={task.id}
                  className="flex text-base font-mono sm:flex-row w-full justify-center sm:text-lg border-b border-gray-500  text-white bg-app-card md:px-7"
                >
                  <div className="flex-1 flex flex-col mx-auto justify-center relative p-3 border border-gray-400 md:border-none rounded-md">
                    <div className="text-base  flex items-center gap-1">
                      <Tags className="w-3 h-3 sm:w-5 sm:h-5" />
                      <p>{task.title}</p>
                    </div>
                    <div className="hidden sm:flex">
                      {task.description && (
                        <p className=" sm:truncade text-gray-400 min-w-0 line-clamp-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 md:flex md:gap-10 sm:px-7 items-center justify-between ">
                    <div className="flex flex-1 justify-start pl-1 gap-2 md:justify-center items-center">
                      {statusConfig.map((item) => {
                        if (item.label === task.status) {
                          return (
                            <div
                              key={item.label}
                              className={`${item.color} flex p-1 gap-1 justify-start items-center rounded-full px-1 md:px-3 md:py-1 text-sm sm:gap-2`}
                            >
                              {item.icon}
                              <p>{task.status}</p>
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className="hidden md:flex justify-center items-center">
                      {priorityConfig.map((priority) => {
                        if (priority.label === task.priority) {
                          return (
                            <div
                              key={priority.label}
                              className={`${priority.color} flex px-3 py-1 text-sm gap-2 rounded-full`}
                            >
                              {priority.icon}
                              <p>{task.priority}</p>
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className="flex items-center pl-6 sm:p-0 justify-center">
                      <span className="flex items-center justify-center gap-1">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        {dataFormatada}
                      </span>
                    </div>
                    <div className="flex flex-1 pr-1 justify-end sm:justify-center">
                      <UpdateTask task={task} />
                    </div>
                  </div>
                </Card>
              );
            })
          : "NÃO HÁ TAREFAS DISPONIVEIS"}
      </div>
    </main>
  );
}
