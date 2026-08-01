import { TableTask } from "@/components/(pages)/tasks/TableTask";
import { getTasksByQuery } from "@/lib/taskService";
import { ResumeDashboardData } from "@/components/(pages)/dashboard/resumeDashboard";
import { getExpenses } from "../actions/expense";
import { TableExpense } from "@/components/(pages)/expense/TableExpense";
import { Welcome } from "@/components/welcome/welcomeUser";
import { getUser } from "@/lib/auth";
import { PieChartDashboard } from "@/components/(pages)/dashboard/pieChart";
import { HigherExpense } from "@/components/(pages)/dashboard/higherExpense";
import { pieChartData } from "@/app/actions/expense";
import { NoData } from "@/components/noData";

interface SearchProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function Dashboard({ searchParams }: SearchProps) {
  const user = await getUser();
  const expensesLimit = await getExpenses(5);
  const amountByCategory = await pieChartData();
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search?.trim() || undefined;
  const tasks = await getTasksByQuery({ search });

  return (
    <div className="flex w-full py-4 flex-col gap-6 text-white">
      <div>
        <section className="w-full gap-2">
          <Welcome
            name={user?.name}
            page={"Dashboard"}
            message="Tenha uma visão geral sobre seus gastos e tarefas"
          />
          <ResumeDashboardData />
        </section>
      </div>
      <section className="space-y-4">
        {amountByCategory.length !== 0 ? (
          <>
          <HigherExpense/>
        <PieChartDashboard amountByCategory={amountByCategory} />
          </>
        ): (<NoData page={"Despesas"} message={`Vá a página de Despesas para adicionar uma nova Gasto`}/>)}
      </section>
      <section className="space-y-2">
        <h1 className="font-semibold text-base md:text-xl">Despesas Recentes</h1>
        {expensesLimit.length !== 0 ? (
          <TableExpense data={expensesLimit} />
        ) : (
          <NoData
            page={"Despesas"}
            message={"Vá a página de Despesas para adicionar uma novo Gasto"}
          />
        )}
      </section>
      <section className="space-y-2">
        <h1 className="font-semibold text-base md:text-xl">Tarefas Recentes</h1>
        {tasks.length !== 0 ? (
          <TableTask data={tasks} />
        ) : (
          <NoData
            page={"Tarefas"}
            message={"Vá a página de Tarefas para adicionar uma nova Tarefa"}
          />
        )}
      </section>
    </div>
  );
}
