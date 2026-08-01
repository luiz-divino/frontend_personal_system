import { getExpenses } from "@/app/actions/expense";
import { formatCurrencyValue } from "@/app/utils/formatCurrency";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTasks } from "@/lib/taskService";
import {
  BanknoteArrowDown,
  Clock,
  PlayCircle,
  ShoppingBag,
} from "lucide-react";

export async function ResumeDashboardData() {
  const tasks = await getTasks({});
  const expensesLimit = await getExpenses();

  const statusActive = tasks.filter((value) => {
    return value.status === "ACTIVE";
  });

  const statusPending = tasks.filter((value) => {
    return value.status === "PENDING";
  });
  const valorTotal = expensesLimit.reduce((acc, init) => {
    return acc + init.amount;
  }, 0);

  const valueFormatted = formatCurrencyValue(valorTotal);
  return (
    <section className="text-white grid grid-cols-2 md:grid-cols-4 gap-2 select-none">
      <Card className="bg-gray-200 rounded-md">
        <CardHeader>
          <div className="flex gap-1 items-center justify-center">
            <CardTitle className="text-lg font-semibold sm:text-xl text-gray-800 select-none">
              Total
            </CardTitle>
            <BanknoteArrowDown className="ml-auto w-7 h-7" />
          </div>
          <CardDescription>Gastos Totais</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base sm:text-lg font-bold text-red-600">
            -{valueFormatted}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gray-200 rounded-md">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg font-semibold sm:text-xl text-gray-800 select-none">
              Compras
            </CardTitle>
            <ShoppingBag className="ml-auto w-6 h-6" />
          </div>
          <CardDescription>Compras totais</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base sm:text-lg font-bold">
            ({expensesLimit.length}) Despesas
          </p>
        </CardContent>
      </Card>
      <Card className=" bg-gray-200 rounded-md">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg font-semibold sm:text-xl text-gray-800 select-none">
              Pendentes
            </CardTitle>
            <Clock className="ml-auto w-7 h-7" />
          </div>
          <CardDescription>
            Total de tarefas pendentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base sm:text-md font-bold">
            ({statusPending.length}) Pendentes
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gray-200 rounded-md">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg font-semibold sm:text-xl text-gray-800 select-none">
              Ativas
            </CardTitle>
            <PlayCircle className="ml-auto w-7 h-7" />
          </div>
          <CardDescription className="text-left">
            Total de tarefas Ativas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base sm:text-md font-bold">
            ({statusActive.length}) Ativas
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
