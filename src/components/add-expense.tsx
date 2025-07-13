"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

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
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createClient } from "@supabase/supabase-js";

interface Expense {
  title: string;
  date: string;
  category: string;
  amount: number;
  notes: string;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(url, key);

export default function ExpenseForm() {
  const form = useForm<Expense>({
    defaultValues: {
      title: "",
      date: "",
      category: "",
      amount: 0.0,
      notes: "",
    },
  });

  async function onSubmit(data: Expense) {
    const { error } = await supabase.from("Expenses").insert({
      title: data.title,
      category: data.category,
      amount: data.amount,
      notes: data.notes,
    });

    if (error) {
      console.log("Error: ", error);
    }
    // console.log("Form Submitted: ", finalPayload);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Expense</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary text-2xl font-bold mb-4">
            Add New Expense
          </DialogTitle>
          <DialogDescription asChild>
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

                  {/** Month */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose Month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="may">May</SelectItem>
                            <SelectItem value="june">June</SelectItem>
                            <SelectItem value="july">July</SelectItem>
                          </SelectContent>
                        </Select>
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
                            placeholder="Amount"
                            {...field}
                            min={0}
                            step={0.5}
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

                  <Button type="submit"> Submit</Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
