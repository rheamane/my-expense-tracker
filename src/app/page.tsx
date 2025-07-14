"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseForm from "@/components/add-expense";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

enum Category {
  Groceries = "groceries",
  Utilities = "utilities",
  Rent = "rent",
  Travel = "travel",
  Subscriptions = "subscriptions",
  Dining = "dining",
  Miscellaneous = "miscellaneous",
  Shopping = "shopping",
}

const categoryColors: Record<Category, string> = {
  [Category.Groceries]: "bg-green-100 text-green-800",
  [Category.Utilities]: "bg-blue-100 text-blue-800",
  [Category.Rent]: "bg-purple-100 text-purple-800",
  [Category.Travel]: "bg-yellow-100 text-yellow-800",
  [Category.Subscriptions]: "bg-pink-100 text-pink-800",
  [Category.Dining]: "bg-orange-100 text-orange-800",
  [Category.Miscellaneous]: "bg-gray-100 text-gray-800",
  [Category.Shopping]: "bg-indigo-100 text-indigo-800",
};

interface Expense {
  id: number;
  category: string;
  title: string;
  amount: number;
  notes: string;
}

// DB Connection

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(url, key);

function sumExpense(expenses: Expense[]) {
  let sum = 0.0;
  expenses.forEach((exp: Expense) => {
    sum += Number(exp.amount);
  });
  return Math.round(sum * 100) / 100.0;
}

// Getting 3 months data
async function get3MonthsData() {
  const today = new Date();
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const isoDate = threeMonthsAgo.toISOString();
  // console.log("3 months ago: ", isoDate);

  // Querying Supabase:
  const { data, error } = await supabase
    .from("Expenses")
    .select()
    .gte("expensed_at", isoDate);

  if (error) {
    throw new Error("Could not fetch data.");
  } else {
    const grouped = data.reduce((acc, item) => {
      const month = new Date(item.expensed_at).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      acc[month] = acc[month] || [];
      acc[month].push(item);
      return acc;
    }, {});
    return grouped;
  }
}

export default function Home() {
  // State Variable
  const [result, setResult] = useState<Record<string, Expense[]>>({});

  const refreshData = async () => {
    const data = await get3MonthsData();
    setResult(data);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const months = Object.keys(result).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  console.log(months);

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("Expenses").delete().eq("id", id);

    if (error) {
      console.error("Delete failed", error);
    } else {
      await refreshData();
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex w-full max-w-lg flex-col gap-6 mx-auto">
        <div className="self-start">
          <ExpenseForm onSubmitSuccess={refreshData} />
        </div>
        <Tabs defaultValue={months[0]}>
          <TabsList className="flex w-full justify-between gap-x-4 bg-blue-100">
            {months.map((month) => {
              return (
                <TabsTrigger
                  key={month}
                  className="text-slate-800"
                  value={month}
                >
                  {month}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <div className="min-h-[400px] transition-all">
            {months.map((month) => {
              return (
                <TabsContent key={month} value={month}>
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Category</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="text-right">Notes</TableHead>
                          <TableHead className="text-right">{/**Axtion */}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result[month].map((expense: Expense) => (
                          <TableRow key={expense.title}>
                            <TableCell className="font-medium ">
                              <Badge
                                className={
                                  categoryColors[expense.category as Category]
                                }
                              >
                                {expense.category}
                              </Badge>
                            </TableCell>
                            <TableCell>{expense.title}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell className="text-right">
                              {expense.notes}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {/* <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(expense)}
                                >
                                  Edit
                                </Button> */}
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDelete(expense.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4">
                      <h2 className="text-xl font-bold text-primary">
                        Total Expense: ${sumExpense(result[month])}
                      </h2>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
