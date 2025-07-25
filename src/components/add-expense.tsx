"use client";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { createClient } from "@supabase/supabase-js";

// interface Expense {
//   title: string;
//   date: Date;
//   category: string;
//   amount: number;
//   notes: string;
// }

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(url, key);

type ExpenseFormProps = {
  initialData?: z.infer<typeof formSchema> & { id?: number };
  onSubmitSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, {
    message: "Title is required and must be at least 2 characters.",
  }),
  date: z.date().min(new Date("2025-01-01"), {
    message: "Date cannot be older than 2025-01-01",
  }),
  category: z.string().min(2, {
    message: "Please select a category",
  }),
  amount: z.number().positive({ message: "Amount must be greater than 0" }),
  notes: z.string().optional(),
});

export default function ExpenseForm({
  onSubmitSuccess,
  initialData,
  open,
  onOpenChange,
}: ExpenseFormProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // initially: const form = useForm<Expense>({
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      // defaultValues: {
      title: "",
      date: new Date(),
      category: "",
      amount: 0.0,
      notes: "",
    },
  });

  // initially: async function onSubmit(data: Expense) {
  // async function onSubmit(data: z.infer<typeof formSchema>) {
  //   console.log("Data", data.title);

  //   const { error } = await supabase.from("Expenses").insert({
  //     title: data.title,
  //     category: data.category,
  //     amount: data.amount,
  //     notes: data.notes,
  //     expensed_at: data.date.toISOString(),
  //   });

  //   if (error) {
  //     console.log("Error: ", error);
  //   } else {
  //     // Take out later
  //     console.log("Data Entered: ", data.title);
  //     form.reset();
  //     closeRef.current?.click();
  //   }

  //   // Triggering refresh for db update
  //   if (onSubmitSuccess) {
  //     onSubmitSuccess();
  //   }
  // }

  async function onSubmit(data: z.infer<typeof formSchema> & { id?: number }) {
    if (data.id) {
      // Update
      const { error } = await supabase
        .from("Expenses")
        .update({
          title: data.title,
          category: data.category,
          amount: data.amount,
          notes: data.notes,
          expensed_at: data.date.toISOString(),
        })
        .eq("id", data.id);

      if (error) {
        console.error("Update failed", error);
        return;
      }
    } else {
      // Insert
      const { error } = await supabase.from("Expenses").insert({
        title: data.title,
        category: data.category,
        amount: data.amount,
        notes: data.notes,
        expensed_at: data.date.toISOString(),
      });

      if (error) {
        console.error("Insert failed", error);
        return;
      }
    }

    form.reset();
    closeRef.current?.click();
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Add Expense</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary text-2xl font-bold mb-4">
            {initialData?.id ? "Edit Expense" : "Add New Expense"}
          </DialogTitle>
          <DialogDescription asChild>
            {initialData?.id
              ? "Edit Expense Information"
              : "Add New Expense Information"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col space-y-6">
              {/** Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title of expense" {...field} />
                    </FormControl>
                    {/* <FormDescription>Name of Expense</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Expense</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("2024-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>Month of Expense</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category of expense" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="groceries">Groceries</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="subscriptions">
                          Subscriptions
                        </SelectItem>
                        <SelectItem value="dining">Dining</SelectItem>
                        <SelectItem value="miscellaneous">
                          Miscellaneous
                        </SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <FormDescription>category of expense</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* * Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? 0 : parseFloat(value));
                        }}
                        placeholder="0.00"
                      />
                    </FormControl>
                    {/* <FormDescription>Amount</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Additional Notes" {...field} />
                    </FormControl>
                    {/* <FormDescription>Notes</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="sm:justify-start">
              {/* Cancel Button that closes dialog */}
              <DialogClose asChild>
                <Button variant="outline" onClick={() => form?.reset?.()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {" "}
                Submit
              </Button>

              {/* Invisible close button */}
              <DialogClose asChild>
                <button
                  ref={closeRef}
                  type="button"
                  className="hidden"
                  aria-hidden
                />
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
