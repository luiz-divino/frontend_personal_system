import { TableTask } from "@/components/(pages)/tasks/TableTask";
import { getTasksByQuery } from "@/lib/taskService";
import { ResumeDashboardData } from "@/components/(pages)/dashboard/resumeDashboard";
import { getExpenses } from "../actions/expense";
import { TableExpense } from "@/components/(pages)/expense/TableExpense";
import { Welcome } from "@/components/welcome/welcomeUser";
import { getUser } from "@/lib/auth";
import { PieChartDashboard } from "@/components/(pages)/dashboard/pieChart";
import { HigherExpense } from "@/components/(pages)/dashboard/higherExpense";
import { pieChartData } from "@/app/utils/amountByCategory";

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
          <Welcome name={user?.name} page={"Dashboard"} message="Tenha uma visão geral sobre seus gastos e tarefas" />
          <ResumeDashboardData />
        </section>
      </div>
      <section className="space-y-4">
        <HigherExpense />
        <PieChartDashboard amountByCategory={amountByCategory} />
      </section>
      <section className="space-y-2">
        <h1>Despesas Recentes</h1>
        <TableExpense data={expensesLimit} />
      </section>
      <section className="space-y-2">
        <h1>Tarefas Recentes</h1>
        <TableTask data={tasks} />
      </section>
    </div>
  );
}
