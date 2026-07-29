import { formatCurrencyValue } from "@/app/utils/formatCurrency";
import { Expenses } from "@/lib/types";

interface TotalExpenseProps {
  expense: Expenses[];
}

export function TotalExpenseCard({ expense }: TotalExpenseProps) {
  const valorTotal = expense.reduce((acc, init) => {
    return acc + init.amount;
  }, 0);

  const valueFormatted = formatCurrencyValue(valorTotal);
  return <div>{valueFormatted && <span>{valueFormatted}</span>}</div>;
}
