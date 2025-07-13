import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import mayData from "@/data/may.json";
import juneData from "@/data/june.json";
import julyData from "@/data/july.json";
import { Badge } from "@/components/ui/badge";

enum Category {
  Groceries = "Groceries",
  Utilities = "Utilities",
  Rent = "Rent",
  Travel = "Travel",
  Subscriptions = "Subscriptions",
  Dining = "Dining",
  Miscellaneous = "Miscellaneous",
  Shopping = "Shopping",
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
  category: string;
  title: string;
  amount: string;
  notes: string;
}

function sumExpense(expenses: Expense[]) {
  let sum = 0;
  expenses.forEach((exp) => {
    const num = exp.amount.slice(1);
    sum += Number(num);
  });
  return Math.round(sum * 100) / 100;
}

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex w-full max-w-lg flex-col gap-6 mx-auto">
        <div className="self-start">
          <Button asChild>
            <Link href="/form">Add Expense</Link>
          </Button>
        </div>
        <Tabs defaultValue="May">
          <TabsList className="flex w-full justify-between gap-x-4 bg-blue-100">
            <TabsTrigger className="text-slate-800" value="may">
              May
            </TabsTrigger>
            <TabsTrigger className="text-slate-800" value="june">
              June
            </TabsTrigger>
            <TabsTrigger className="text-slate-800" value="july">
              July
            </TabsTrigger>
          </TabsList>
          <div className="min-h-[400px] transition-all">
            <TabsContent value="may">
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Category</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mayData.map((expense) => (
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-primary">
                    Total Expense: ${sumExpense(mayData)}
                  </h2>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="june">
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Category</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {juneData.map((expense) => (
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-primary">
                    Total Expense: ${sumExpense(juneData)}
                  </h2>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="july">
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Category</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {julyData.map((expense) => (
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-primary">
                    Total Expense: ${sumExpense(julyData)}
                  </h2>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
