import { ExpenseForm } from "@/components/forms/expense-form";
import { getExpenses } from "@/app/actions/expense";
import { TableExpense } from "@/components/(pages)/expense/TableExpense";
import { Welcome } from "@/components/welcome/welcomeUser";
import { getUser } from "@/lib/auth";
import { HeaderCard } from "@/components/headerCard/headerCard";
import { formatCurrencyValue } from "@/app/utils/formatCurrency";
import { NoData } from "@/components/noData";

export default async function Expenses() {
  const user = await getUser();
  const expenses = await getExpenses();

  const valorTotal = expenses.reduce((acc, init) => {
    return acc + init.amount;
  }, 0);
  const valueFormatted = formatCurrencyValue(valorTotal);

  return (
    <main className="flex w-full flex-col md:gap-6 text-blue-100">
      <HeaderCard>
        <Welcome name={user?.name} page={"Despezas"} />
        <div className="hidden md:flex">
          <ExpenseForm />
        </div>
      </HeaderCard>
      <section className="flex items-center text-base md:text-xl justify-between">
        <h1 className="font-bold">
          Gastos Totais:{" "}
          <span className="text-red-500 font-semibold">-{valueFormatted}</span>
        </h1>
        <div className="md:hidden flex">
          <ExpenseForm />
        </div>
      </section>
      {expenses.length !== 0 ? (
        <TableExpense data={expenses} />
      ) : (
        <NoData
          page={"Despesas"}
          message={"Clique em adicionar nova Despesa"}
        />
      )}
    </main>
  );
}
