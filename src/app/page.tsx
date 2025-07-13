import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExpenseForm from "@/components/add-expense";


export default function Home() {
  return (
    <>
      {/* <Button asChild>
        <Link href="/form">Add Expense</Link>
      </Button> */}
      <div>
        <ExpenseForm />
      </div>
    </>
  );
}
