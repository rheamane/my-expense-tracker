import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExpenseForm from "@/components/expenseForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function Home() {
  return (
    <>
      {/* <Button asChild>
        <Link href="/form">Add Expense</Link>
      </Button> */}
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Expense</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription asChild>
                <ExpenseForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
