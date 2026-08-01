"use client";
import { ExpenseCategorySummary} from "@/app/actions/expense";
import { formatCurrencyValue } from "@/app/utils/formatCurrency";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#5cf6e2",
  "#173447",
  "#e7f65c",
  "#f65cf6",
  "#158315",
];

export const PieChartDashboard = ({
  amountByCategory,
}: {
  amountByCategory: ExpenseCategorySummary[];
}) => {
  return (
    <Card className="w-full rounded-xl bg-app-card md:mx-auto p-4 shadow-sm select-none">
      <CardHeader className="p-0">
        <CardTitle className="text-gray-300 font-semibold">
          Gastos por Categoria
        </CardTitle>
        <CardDescription>Visão detalhada</CardDescription>

      </CardHeader>

      <CardContent className="h-64 md:h-96 w-full p-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={amountByCategory}
              dataKey="value"
              nameKey="name"
              innerRadius="40%"
              outerRadius="65%"
              paddingAngle={7}
              label={({ value }) => `${formatCurrencyValue(value)}`}
              labelLine={true}
            >
              {amountByCategory.map((entry, index) => (
                <Cell
                  key={`${entry.name}-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrencyValue(Number(value))}
            />{" "}
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
