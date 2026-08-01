import { Expenses } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { formatCurrencyValue } from "@/app/utils/formatCurrency";
import {
  Calendar,
  Captions,
  ListSortAscending,
  SquarePen,
  Wallet,
} from "lucide-react";
import { UpdateExpense } from "./updateExpenseForm";

interface props {
  data: Expenses[];
}

export function TableExpense({ data }: props) {
  return (
    <Table className="border border-gray-500">
      <TableHeader>
        <TableRow className="w-full">
          <TableHead>
            <span className="flex justify-start items-center gap-1 line-clamp-1">
              Descrição
              <Captions className="w-4 h-4" />
            </span>
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <span className="flex items-center justify-start gap-1">
              Categoria
              <ListSortAscending className="w-4 h-4" />
            </span>
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <span className="flex justify-start items-center gap-1">
              Data
              <Calendar className="w-4 h-4" />
            </span>
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <span className=" flex items-center justify-start gap-1">
              Valor
              <Wallet className="w-4 h-4" />
            </span>
          </TableHead>
          <TableHead className="w-12.5">
            <span className="flex items-center justify-center gap-1">
              Opções
              <SquarePen className="w-4 h-4" />
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length != 0 &&
          data.map((expense) => {
            const amountFormatted = formatCurrencyValue(expense.amount);
            const dateFormatted = expense.date
              ? expense.date.split("T")[0].split("-").reverse().join("/")
              : "Sem data";
            return (
              <TableRow key={expense.id}>
                <TableCell>
                  <div> {expense.description}</div>
                  <div className="text-xs text-muted-foreground mt-1 md:hidden flex flex-col items-start justify-center">
                    <span>{expense.category}</span>
                    <span>{dateFormatted}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {expense.category}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {dateFormatted}
                </TableCell>
                <TableCell className=" text-start">
                  <span className="md:hidden">
                    <UpdateExpense expense={expense} />
                  </span>
                  <div className="text-red-500 font-bold">-{amountFormatted}</div>
                </TableCell>
                <TableCell className="w-12.5 hidden md:table-cell">
                  <UpdateExpense expense={expense} />
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
