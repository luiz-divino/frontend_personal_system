import { TaskForm } from "@/components/forms/task-form";
import { TasksFilter } from "@/components/(pages)/tasks/TaskFilter";
import { getTasks, TaskStatus } from "@/lib/taskService";
import { VALID_STATUSES } from "@/app/utils/task-mappings";
import { getUser } from "@/lib/auth";
import { HeaderCard } from "@/components/headerCard/headerCard";
import { Welcome } from "@/components/welcome/welcomeUser";
import { TableTask } from "@/components/(pages)/tasks/TableTask";
import { NoData } from "@/components/noData";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function Tasks({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const rawStatus = resolvedSearchParams.status;
  const user = await getUser();

  const statusFilter = VALID_STATUSES.includes(rawStatus as TaskStatus)
    ? (rawStatus as TaskStatus)
    : undefined;
  const tasks = await getTasks({ status: statusFilter });

  return (
    <main className="flex w-full flex-col gap-3 text-blue-100">
      <HeaderCard>
        <Welcome name={user?.name} page={"Tarefas"} />
        <div className="hidden md:flex">
          <TaskForm />
        </div>
      </HeaderCard>
      <section className="flex text-base md:text-xl items-center justify-between text-white">
        <h1 className="font-bold">
          TOTAL DE TAREFAS <span>({tasks.length})</span>
        </h1>
        <div className="md:hidden">
          <TaskForm />
        </div>
      </section>
      <section className="flex items-center justify-center">
        <TasksFilter />
      </section>
      {tasks.length !== 0 ? <TableTask data={tasks} /> : <NoData page={"Tarefas"} message={"Clique em adicionar nova Tarefa"}/>}
    </main>
  );
}
