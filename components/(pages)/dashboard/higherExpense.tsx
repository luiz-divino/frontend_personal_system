import { pieChartData } from "@/app/actions/expense";
import { formatCurrencyValue } from "@/app/utils/formatCurrency";

export async function HigherExpense() {
  const expenseByCategory = await pieChartData();

  if (!expenseByCategory.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-600 shadow-sm">
        <p>Nenhum gasto registrado ainda.</p>
      </div>
    );
  }

  const totalByCategory = expenseByCategory.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  const highestValue = Math.max(...expenseByCategory.map((item) => item.value));
  const highestExpenses = expenseByCategory.filter(
    (item) => item.value === highestValue,
  );

  const highestCategories = new Intl.ListFormat("pt-BR", {
    style: "long",
    type: "conjunction",
  }).format(highestExpenses.map((item) => item.name));

  const percentage =
    totalByCategory > 0 ? (highestValue / totalByCategory) * 100 : 0;
  const formattedTotal = formatCurrencyValue(totalByCategory);
  const formattedHighestValue = formatCurrencyValue(highestValue);

  return (
    <div className="rounded-xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-600 shadow-sm">
      <p>
        {highestExpenses.length === 1
          ? "O seu maior gasto foi em "
          : "Os seus maiores gastos foram em "}
        <span className="font-semibold text-slate-900">
          {highestCategories}
        </span>
        {highestExpenses.length === 1
          ? ", isso equivale a "
          : ", e cada um equivale a "}
        <span className="font-semibold text-slate-900">
          {percentage.toFixed(1)}%
        </span>{" "}
        da soma total de todas as categorias{" "}
        <span className="font-semibold text-slate-900">
          {" "}
          ({formattedTotal})
        dash</span>
        . O valor destacado é{" "}
        <span className="font-semibold text-slate-900">
          {formattedHighestValue}.
        </span>
      </p>
    </div>
  );
}
